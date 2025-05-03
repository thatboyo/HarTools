const managementTemplate = `
<div id="chrome_management_disable_ext">
  <h1> Toggle Extensions </h1>
  <div class="extlist"></div>
</div>
`;

let savedExtList = [];

function createSwitchButton(isOn) {
  const label = document.createElement("label");
  label.className = "switch";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = isOn;

  const span = document.createElement("span");
  span.className = "slider";

  label.appendChild(input);
  label.appendChild(span);
  return { label, input };
}

function updateExtensionStatus(extlist_element) {
  return new Promise(function (resolve) {
    extlist_element.innerHTML = "";
    chrome.management.getAll(function (extlist) {
      const ordlist = [];
      extlist.forEach(function (e) {
        if (e.id === new URL(new URL(location.href).origin).host) {
          return;
        }
        ordlist.push(e);

        const container = document.createElement("div");
        container.className = "extension-item";

        const title = document.createElement("span");
        title.textContent = e.name;

        const { label: switchLabel, input: switchInput } = createSwitchButton(e.enabled);

        switchInput.onclick = function () {
          const newStatus = switchInput.checked;
          chrome.management.setEnabled(e.id, newStatus, function () {
            e.enabled = newStatus;
          });
        };

        container.appendChild(title);
        container.appendChild(switchLabel);
        extlist_element.appendChild(container);
      });
      savedExtList = ordlist;
      resolve();
    });
  });
}

const style = document.createElement('style');
style.innerHTML = `
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    margin-left: 10px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: #4CAF50;
  }
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  .extension-item {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
document.head.appendChild(style);

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
    }
  }
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
          activeSlideIdx += slides.length;
        }
        activeSlideIdx %= slides.length;
        ev.preventDefault();
      }
      if (ev.key.toLowerCase().includes("right")) {
        activeSlideIdx++;
        if (activeSlideIdx < 0) {
          activeSlideIdx += slides.length;
        }
        activeSlideIdx %= slides.length;
        ev.preventDefault();
      }
      ExtensionCapabilities.setActiveSlideIndex(activeSlideIdx);
    };
  }
  static setActiveSlideIndex(idx) {
    function a(t) {
      const seconds = t / 1000;
      if (seconds >= 0.2) {
        return true;
      }
      slides[idx].style.opacity = String(seconds / 0.2);
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
            slides[i].style.opacity = String((0.2 - seconds) / 0.2);
          });
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
      <h1> Default Extension Capabilities </h1>
      <h2>Evaluate code</h2>
      <input type="text" id="code_input"/><button id="code_evaluate">Evaluate</button>
    </div>
    <div id="extension_tabs_default">
      <button id="tabreload"> Refresh Tabs</button>
      <h1> Update tabs </h1>
      <ol></ol>
      <input id="TabURLInput" /> <button id="TabURLSubmit">Create</button>
    </div>
  </div>
  `;
  updateTabList(tablist, isTabTitleQueryable, tabStatus) {
    if (this.disarmed) {
      return;
    }
    if (this.tabListInProgress) {
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
            listItem.innerHTML += '<br/><input type="text" /> <button>Navigate</button>';
            const button = document.createElement("button");
            button.innerHTML = "Preview";
            listItem.querySelector('button').onclick = function () {
              const inp = listItem.querySelector('input');
              chrome.tabs.update(info.id, { url: inp.value });
            }
            button.onclick = () => {
              thiz.disarm = true;
              thiz.previewing = true;
              chrome.windows.update(info.windowId, { focused: true }, function () {
                chrome.tabs.update(info.id, { active: true });
              });
              window.currentTimeout = setTimeout(function m() {
                clearTimeout(window.currentTimeout);
                chrome.tabs.getCurrent(function (tab) {
                  chrome.windows.update(tab.windowId, { focused: true }, function () {
                    chrome.tabs.update(tab.id, { active: true });
                    thiz.disarm = false;
                    thiz.previewing = false;
                  });
                });
              }, 100);
            };
            tablist.appendChild(listItem);
            tablist.appendChild(button);
          });
          thiz.tabListInProgress = false;
        });
      });
    });
  }
  activate() {
    document.write(DefaultExtensionCapabilities.template);
    document.body.querySelector("#ext_default").querySelectorAll('button').forEach((btn) => {
      btn.addEventListener("click", this.onBtnClick_.bind(this, btn));
    });
    this.updateTabList(document.body.querySelector('#extension_tabs_default').querySelector('ol'), (!!chrome.runtime.getManifest().permissions.includes('tabs')));
  }
  static getFS() {
    return new Promise((resolve) => {
      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve);
    });
  }
  async onBtnClick_(b) {
    switch (b.id) {
      case "code_evaluate": {
        const x = document.querySelector("#code_input").value;
        const fs = await DefaultExtensionCapabilities.getFS();
        function writeFile(file, data) {
          return new Promise((resolve) => {
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
        let script = document.body.querySelector("#evaluate_elem") ?? document.createElement("script");
        script.remove();
        script = document.createElement("script");
        script.id = "evaluate_elem";
        script.src = url;
        document.body.appendChild(script);
      } break;
      case "tabreload": {
        this.updateTabList(document.body.querySelector('#extension_tabs_default').querySelector('ol'), (!!chrome.runtime.getManifest().permissions.includes('tabs')));
      } break;
    }
  }
}

class HostPermissions {
  activate() {}
}

window.onload = async function () {
  let foundNothing = true;
  document.open();
  if (chrome.management.setEnabled) {
    document.write(managementTemplate);
    const extlist_element = document.querySelector(".extlist");
    await updateExtensionStatus(extlist_element);
  }
  new DefaultExtensionCapabilities().activate();
  document.close();
  ExtensionCapabilities.setupSlides();
};
