onerror = alert;

const managementTemplate = `
  <div id="chrome_management_disable_ext">
    <h1>Toggle Extensions</h1>
    <ol class="extlist">
      <!-- Extension items will be injected here dynamically -->
    </ol><br/>
    <input type="text" class="extnum" /><button disabled id="toggler">Toggle extension</button>
  </div>
`; 

let savedExtList = [];
const slides = [];
let activeSlideIdx = 0;
const handleCallbacks_ = [];
const WAIT_FOR_FINISH = 1;

requestAnimationFrame(function a(t) {
  for (const cb of handleCallbacks_) {
    let m;
    if (m = (cb.f.apply(null, [t - cb.t]))) {
      if (m === 1) {
        return;
      } else {
        handleCallbacks_.splice(handleCallbacks_.indexOf(cb), 1);
      }
    };
  };
  requestAnimationFrame(a);
});

const handleInAnimationFrame = (cb, thiz = null, args = []) => {
  handleCallbacks_.push({
    f: cb,
    t: performance.now()
  });
};

class ExtensionCapabilities {
  static setupSlides(activeidx = 0) {
    if (chrome.management) {
      slides.push(document.querySelector('#chrome_management_disable_ext'));
    }
    slides.push(document.querySelector('#ext_default'));
    for (let i = 0; i < slides.length; i++) {
      if (i === activeidx) {
        slides[i].style.display = "block";
      } else {
        slides[i].style.display = "none";
      }
    }
    activeSlideIdx = activeidx;

    onkeydown = function (ev) {
      if (ev.repeat) return;

      if (this.getSelection() && this.getSelection().anchorNode.tagName) {
        return;
      }
      if (ev.key.toLowerCase().includes("left")) {
        activeSlideIdx--;
        if (activeSlideIdx < 0) {
          activeSlideIdx += (slides.length);
        }
        activeSlideIdx %= (slides.length);
        ev.preventDefault();
      }
      if (ev.key.toLowerCase().includes("right")) {
        activeSlideIdx++;
        if (activeSlideIdx < 0) {
          activeSlideIdx += (slides.length);
        }
        activeSlideIdx %= (slides.length);
        ev.preventDefault();
      }
      ExtensionCapabilities.setActiveSlideIndex(activeSlideIdx);
    }
  }

  static setActiveSlideIndex(idx) {
    function a(t) {
      const seconds = t / 1000;
      if (seconds >= 0.2) {
        return true;
      }
      slides[idx].style.opacity = String((seconds) / (0.2));
    }
    for (let i = 0; i < slides.length; i++) {
      if (i === idx) {
        slides[i].style.display = "block";
      } else {
        if (slides[i].style.display === "block") {
          slides[i].style.position = "absolute";
          const m = i;
          handleInAnimationFrame(function (t) {
            const seconds = t / 1000;
            if (0.8 - seconds <= 0) {
              slides[i].style.display = "none";
              handleInAnimationFrame(a);
              return true;
            }
            slides[i].style.opacity = String(((0.2 - seconds) / 0.2));
          })
        }
      }
    }
  }

  activate() {}
}

class DefaultExtensionCapabilities extends ExtensionCapabilities {
  static template = `
    <div id="ext_default">
      <div id="default_extension_capabilities">
        <h1>Default Extension Capabilities</h1>
        <h2>Evaluate code</h2>
        <input type="text" id="code_input"/><button id="code_evaluate">Evaluate</button>
      </div>
    </div>
  `;

  async updateTabList(tablist, isTabTitleQueryable, tabStatus) {
    if (this.disarmed) return;

    if (this.tabListInProgress) {
      console.log("In progress tablist building!");
      return;
    }
    this.tabListInProgress = true;
    tablist.innerHTML = "";
    const thiz = this;
    chrome.windows.getAll(function (win) {
      win.forEach(function (v) {
        chrome.tabs.query({ windowId: v.id }, function (tabInfos) {
          tabInfos.forEach(function (info) {
            const listItem = document.createElement("li");
            listItem.textContent = isTabTitleQueryable
              ? `${info.title} (${info.url})`
              : "(not available)";
            tablist.appendChild(listItem);
          });
          thiz.tabListInProgress = false;
        });
      });
    });
  }

  async onBtnClick_(b) {
    switch (b.id) {
      case "code_evaluate": {
        const x = document.querySelector("#code_input").value;
        const fs = await DefaultExtensionCapabilities.getFS();
        function writeFile(file, data) {
          return new Promise((resolve, reject) => {
            fs.root.getFile(file, { create: true }, function (entry) {
              entry.remove(function () {
                fs.root.getFile(file, { create: true }, function (entry) {
                  entry.createWriter(function (writer) {
                    writer.write(new Blob([data]));
                    writer.onwriteend = resolve.bind(null, entry.toURL());
                  });
                });
              });
            });
          });
        }

        const url = await writeFile("src.js", x);
        let script = document.createElement("script");
        script.id = "evaluate_elem";
        script.src = url;
        document.body.appendChild(script);
      }
    }
  }

  static getFS() {
    return new Promise(function (resolve) {
      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve);
    });
  }

  async activate() {
    document.write(DefaultExtensionCapabilities.template);
    const extlistElement = document.querySelector('.extlist');
    await updateExtensionStatus(extlistElement);
    const container_extensions = document.body.querySelector("#chrome_management_disable_ext");
    container_extensions.querySelector("#toggler").onclick = async function dx(e) {
      container_extensions.querySelector("#toggler").disabled = true;
      
      let id = container_extensions.querySelector(".extnum").value;
      container_extensions.querySelector(".extnum").value = "";
      try {
        id = parseInt(id);
      } catch {
        return;
      }
      if (!savedExtList[id - 1]) {
        alert("Select extension from list!");
        container_extensions.querySelector("#toggler").disabled = false;
        return;
      }
      await new Promise(function (resolve) {
        chrome.management.setEnabled(
          savedExtList[id - 1].id,
          !savedExtList[id - 1].enabled,
          resolve,
        );
      });

      container_extensions.querySelector("#toggler").disabled = false;
      await updateExtensionStatus(extlistElement);
    };
    container_extensions.querySelector("#toggler").disabled = false;
  }
}

async function updateExtensionStatus(extlistElement) {
  extlistElement.innerHTML = "";
  chrome.management.getAll(function (extlist) {
    const ordlist = [];
    extlist.forEach(function (e) {
      if (e.id === new URL(location.href).origin) return;
      ordlist.push(e);

      const listItem = document.createElement("li");
      listItem.classList.add('extension-item');
      
      const extInfo = document.createElement("div");
      extInfo.classList.add('ext-info');
      const icon = document.createElement("img");
      icon.src = e.icons ? e.icons[0].url : '';
      const name = document.createElement("div");
      name.textContent = e.name;
      const id = document.createElement("div");
      id.textContent = e.id;
      extInfo.appendChild(icon);
      extInfo.appendChild(name);
      extInfo.appendChild(id);
      listItem.appendChild(extInfo);

      const toggleSwitch = document.createElement('input');
      toggleSwitch.type = 'checkbox';
      toggleSwitch.checked = e.enabled;
      toggleSwitch.addEventListener('change', function () {
        chrome.management.setEnabled(e.id, toggleSwitch.checked);
      });

      listItem.appendChild(toggleSwitch);
      extlistElement.appendChild(listItem);
    });
    savedExtList = ordlist;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (chrome.management) {
    new DefaultExtensionCapabilities().activate();
    ExtensionCapabilities.setupSlides();
  }
});
