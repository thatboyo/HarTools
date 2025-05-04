<p align=center><img src="https://raw.githubusercontent.com/crossjbly/HarTools-rigtools128plus/refs/heads/main/hartools.gif"/>
<p align=center><code>Extension/Devtools code execution post-rigtools patch (<133)</code></p> 

## How to use
**1. Download [HARTOOLS.har](https://raw.githubusercontent.com/crossjbly/HarTools-rigtools128plus/refs/heads/main/HARTOOLS.har)**\
**2. Get the file `HARTOOLS.har` onto the device you want to run devtools xss on**\
**3. On the device you want to run devtools xss on go to `devtools://devtools/bundled/inspector.html` and keep the tab open**\
**4. Open a new tab and go to `devtools://devtools/bundled/inspector.html?experiments=true`**\
**5. On the sidebar on the inspector page at the top click the 2 arrows (looks like: `>>`) and select network from the dropdown**\
&nbsp;&nbsp;&nbsp;&nbsp;**^^^ if you are already on the network page you can skip this ^^^**\
**6. Click the little upload button and select the downloaded `HARTOOLS.HAR`**\
&nbsp;&nbsp;&nbsp;&nbsp;**^^^ you may need to expand the sidebar to see it ^^^**\
**7. Double click on the text that appears in the box**

## Credits
 - Crossjbly: Finding the vulnerability in .har files
 - Blobby Boi: Helping with development of the payloads and UI
 - axqmx: Testing and help with development
 - unretained: Original rigtools developer tools code execution exploit (this literally wouldn't have been possible without rigtools lol)

## NOTES:
 - This has been patched by google as of Chrome V133
 - This will work without internet because everything is included in the main payload ran
 - If `devtools://devtools/bundled/inspector.html` is blocked for you you **can** use `devtools://devtools/bundled/devtools_app.html` (although that's even more commonly blocked)
