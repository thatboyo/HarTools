onerror = alert;

const uiTemplate = `
`;

const managementTemplate = `
  <div id="chrome_management_disable_ext">
    <h1>Toggle Extensions</h1>
    <div class="ext-container">
    </div>
    <br/>
    <input type="text" class="extnum" /><button disabled id="toggler">Toggle extension</button>
  </div>
`;

let savedExtList = [];

async function updateExtensionStatus(extContainerElement) {
  return new Promise(function (resolve, reject) {
    extContainerElement.innerHTML = ""; // Clear previous extensions
    
    chrome.management.getAll(function (extlist) {
      savedExtList = []; // Reset saved extensions list
      
      extlist.forEach(function (e) {
        if (e.id === new URL(new URL(location.href).origin).host) {
          return; // Skip the current extension
        }

        savedExtList.push(e);

        const extDiv = document.createElement("div");
        extDiv.classList.add("ext-item");

        const extName = document.createElement("h2");
        extName.textContent = `${e.name} (${e.id})`;
        extDiv.appendChild(extName);

        const extStatus = document.createElement("p");
        extStatus.textContent = `Status: ${e.enabled ? "Enabled" : "Disabled"}`;
        extDiv.appendChild(extStatus);

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = e.enabled ? "Disable" : "Enable";
        toggleBtn.onclick = function () {
          chrome.management.setEnabled(e.id, !e.enabled, function () {
            // Refresh the extension status after toggling
            extStatus.textContent = `Status: ${!e.enabled ? "Enabled" : "Disabled"}`;
            toggleBtn.textContent = !e.enabled ? "Disable" : "Enable";
          });
        };
        extDiv.appendChild(toggleBtn);

        extContainerElement.appendChild(extDiv);
      });

      resolve();
    });
  });
}

onload = async function x() {
  let foundNothing = true;
  document.open();
  
  if (chrome.fileManagerPrivate) {
    chrome.fileManagerPrivate.openURL("data:text/html,<h1>Hello</h1>");
    document.write(fileManagerPrivateTemplate);
    document.body.querySelector('#btn_FMP_openURL').onclick = function (ev) {};
  }

  if (chrome.management.setEnabled) {
    document.write(managementTemplate);
    const extContainerElement = document.querySelector(".ext-container");
    await updateExtensionStatus(extContainerElement);

    const containerExtensions = document.body.querySelector("#chrome_management_disable_ext");
    
    containerExtensions.querySelector("#toggler").onclick = async function dx(e) {
      containerExtensions.querySelector("#toggler").disabled = true;
      
      let id = containerExtensions.querySelector(".extnum").value;
      containerExtensions.querySelector(".extnum").value = "";

      try {
        id = parseInt(id);
      } catch {
        return;
      }

      if (!savedExtList[id - 1]) {
        alert("Select extension from list!");
        containerExtensions.querySelector("#toggler").disabled = false;
        return;
      }

      await new Promise(function (resolve) {
        chrome.management.setEnabled(savedExtList[id - 1].id, !savedExtList[id - 1].enabled, resolve);
      });

      containerExtensions.querySelector("#toggler").disabled = false;
      await updateExtensionStatus(extContainerElement);
    };
    
    containerExtensions.querySelector("#toggler").disabled = false;
  }

  const otherFeatures = window.chrome.runtime.getManifest();
  const permissions = otherFeatures.permissions;

  new DefaultExtensionCapabilities().activate();
  document.close();
  ExtensionCapabilities.setupSlides();
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
      }
      else {
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
      const seconds = t/1000;
      if (seconds >= 0.2) {
        return true;
      }
      slides[idx].style.opacity = String((seconds)/(0.2));
    }
    for (let i = 0; i < slides.length; i++) {
      if (i === idx) {
        slides[i].style.display = "block";
      }
      else {
        if (slides[i].style.display === "block") {
          slides[i].style.position = "absolute";
          const m = i;
          handleInAnimationFrame(function (t) {
            const seconds = t/1000;
            if (0.8 - seconds <= 0) {
              slides[i].style.display = "none";
              handleInAnimationFrame(a);
              return true;
            }
            slides[i].style.opacity = String(( (0.2 - seconds) / 0.2));
          })
        }
      }
    }
  }
  
  activate () {}
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
        <ol>
        </ol>
        <input id="TabURLInput" /> <button id="TabURLSubmit">Create</button>
      </div>
    </div>
  `;
  
  updateTabList(tablist, isTabTitleQueryable, tabStatus) {
    if (this.disarmed) {
      return;
    }

    if (this.tabListInProgress) {
      console.log("In progress tablist building!");
      return;
    }
    this.tabListInProgress = true;
    tablist.innerHTML = "";
    const thiz = this;
    chrome.windows.getAll(function (win) {
      win.forEach(function (v) {
        chrome.tabs.query({windowId: v.id}, function (tabInfos) {
          tabInfos.forEach(function (info) {
            const listItem = document.createElement("li");
            listItem.textContent = isTabTitleQueryable
              ? `${info.title} (${info.url})`
              : "(not available)";
            listItem.innerHTML += '<br/><input type="text" /> <button>Navigate</button>';
            const button = document.createElement("button");
            button.innerHTML = "Preview";
            listItem.querySelector('button').onclick = function (ev) {
              const inp = listItem.querySelector('input');
              chrome.tabs.update(info.id, { "url": inp.value });
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
          if (isTabTitleQueryable) {
            tabStatus.style.display = "none";
          } else {
            tabStatus.textContent =
              "(Some data might not be available, because the extension doesn't have the 'tabs' permission)";
          }
        });
      })
    });
  }

  activate() {
    document.write(DefaultExtensionCapabilities.template);
    document.body.querySelector("#ext_default").querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener("click", this.onBtnClick_.bind(this, btn));
    }, this);
    
    this.updateTabList(document.body.querySelector('#extension_tabs_default').querySelector('ol'), (!!chrome.runtime.getManifest().permissions.includes('tabs')));
    
    for (var i in chrome.tabs) {
      if (i.startsWith('on')) {
        chrome.tabs[i].addListener(function (ev) {
          this.updateTabList(document.body.querySelector('#extension_tabs_default').querySelector('ol'), (!!chrome.runtime.getManifest().permissions.includes('tabs')));
        })
      }
    }
  }

  static getFS() {
    return new Promise(function (resolve) {
      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve);
    });
  }

  async onBtnClick_(b) {
    switch (b.id) {
      case "code_evaluate": {
        console.log("Evaluating code!");
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
        let script =
          document.body.querySelector("#evaluate_elem") ??
          document.createElement("script");
        script.remove();
        script = document.createElement("script");
        script.id = "evaluate_elem";
        script.src = url;
        document.body.appendChild(script);
      }
      case "tabreload": {
        this.updateTabList(document.body.querySelector('#extension_tabs_default').querySelector('ol'), (!!chrome.runtime.getManifest().permissions.includes('tabs')));
      }
    }
  }
}

const fileManagerPrivateTemplate = `
  <div id="fileManagerPrivate_cap">
    <div id="FMP_openURL">
      <button id="btn_FMP_openURL">Open URL in Skiovox window</button>
    </div>
  </div>
`;

onload = async function x() {
  let foundNothing = true;
  document.open();
  
  if (chrome.fileManagerPrivate) {
    chrome.fileManagerPrivate.openURL("data:text/html,<h1>Hello</h1>");
    document.write(fileManagerPrivateTemplate);
    document.body.querySelector('#btn_FMP_openURL').onclick = function (ev) {};
  }
  
  if (chrome.management.setEnabled) {
    document.write(managementTemplate);
    const extContainerElement = document.querySelector(".ext-container");
    await updateExtensionStatus(extContainerElement);
    
    const containerExtensions = document.body.querySelector("#chrome_management_disable_ext");
    
    containerExtensions.querySelector("#toggler").onclick = async function dx(e) {
      containerExtensions.querySelector("#toggler").disabled = true;
      
      let id = containerExtensions.querySelector(".extnum").value;
      containerExtensions.querySelector(".extnum").value = "";

      try {
        id = parseInt(id);
      } catch {
        return;
      }

      if (!savedExtList[id - 1]) {
        alert("Select extension from list!");
        containerExtensions.querySelector("#toggler").disabled = false;
        return;
      }

      await new Promise(function (resolve) {
        chrome.management.setEnabled(savedExtList[id - 1].id, !savedExtList[id - 1].enabled, resolve);
      });

      containerExtensions.querySelector("#toggler").disabled = false;
      await updateExtensionStatus(extContainerElement);
    };

    containerExtensions.querySelector("#toggler").disabled = false;
  }

  new DefaultExtensionCapabilities().activate();
  document.close();
  ExtensionCapabilities.setupSlides();
};
