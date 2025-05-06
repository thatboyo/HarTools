import base64

def read_and_encode(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    return base64.b64encode(content.encode("utf-8")).decode("utf-8")

# Encode the HTML and JS files
entry_b64 = read_and_encode("entry.html")
index_html_b64 = read_and_encode("index.html")
index_js_b64 = read_and_encode("index.js")

# Load the xss.js file
with open("xss.js", "r", encoding="utf-8") as f:
    js_contents = f.read()

# Replace placeholders with base64-encoded strings
js_contents = js_contents.replace("putentrycontentshere", entry_b64)
js_contents = js_contents.replace("putindex.htmlcontentshere", index_html_b64)
js_contents = js_contents.replace("putindex.jscontentshere", index_js_b64)

# Save the modified xss.js
with open("xss.js", "w", encoding="utf-8") as f:
    f.write(js_contents)
