<p align=center><img src="https://raw.githubusercontent.com/crossjbly/HarTools-rigtools128plus/refs/heads/main/hartools.gif" height="170vh"/>
# <p align=center><code>Extension/Devtools code execution post-rigtools patch</code></p> 
## How to use

**1. Download [HARTOOLS.har](https://raw.githubusercontent.com/crossjbly/HarTools-rigtools128plus/refs/heads/main/HARTOOLS.har)**
**2. Get the file HARTOOLS.har onto the device you want to run devtools xss on**
**3. on the device you want to run devtools xss on go to `devtools://devtools/bundled/inspector.html?experiments=true`**
**4. On the sidebar on the inspector page at the top click the 2 arrows (looks like: `>>`) and select network from the dropdown**
  -# ^ if you are already on the network tab you can skip this step ^

## Terminology
- Entry
  - Entrypoint (or main script) when running devtools xss.
  - Payload
  - Script passed to extension to run code, such as disabling extensions.
- Chrome URLs
  - Elevated URLs that have extra access to features such as WebUI.
  - Only modify the entrypoint when necessary. If not modified properly, thigns such as the updater will break, do not remove any buttons and reuse ids.

## Release information
- Release 0.0.1
  - This release contains the following things:
    - Updater
    - Extension debugging
    - Devtools debugging
    - Chrome url debugging.
