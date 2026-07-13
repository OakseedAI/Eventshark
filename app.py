import streamlit as st
import streamlit.components.v1 as components
import os
import base64
import re

# Set Streamlit Page Configuration
st.set_page_config(
    page_title="Event Shark Dashboard",
    page_icon="🦈",
    layout="wide",
    initial_sidebar_state="collapsed"
)

def replace_tag(html, pattern, replacement):
    match = re.search(pattern, html)
    if match:
        start, end = match.span()
        return html[:start] + replacement + html[end:]
    return html

def find_file(filename):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # 1. Check in the same directory as app.py
    path = os.path.join(base_dir, filename)
    if os.path.exists(path):
        return path
    # 2. Check in 'event-shark' subfolder (in case of nested repository)
    path = os.path.join(base_dir, "event-shark", filename)
    if os.path.exists(path):
        return path
    # 3. Check in 'public' subfolder
    path = os.path.join(base_dir, "public", filename)
    if os.path.exists(path):
        return path
    return None

def get_inlined_html():
    html_path = find_file("index.html")
    if not html_path:
        return "<h3>Error: index.html not found. Make sure your HTML file is pushed to GitHub.</h3>"
        
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Read styles.css
    css = ""
    css_path = find_file("styles.css")
    if css_path:
        with open(css_path, "r", encoding="utf-8") as f:
            css = f.read()
            
    # Read data.js
    data_js = ""
    data_path = find_file("data.js")
    if data_path:
        with open(data_path, "r", encoding="utf-8") as f:
            data_js = f.read()
            
    # Read scraper.js
    scraper_js = ""
    scraper_path = find_file("scraper.js")
    if scraper_path:
        with open(scraper_path, "r", encoding="utf-8") as f:
            scraper_js = f.read()
            
    # Read app.js
    app_js = ""
    app_path = find_file("app.js")
    if app_path:
        with open(app_path, "r", encoding="utf-8") as f:
            app_js = f.read()
            
    # ---------------- DYNAMIC ESM TO NON-ESM CONVERSION ----------------
    # 1. Clean data.js (strip exports and expose globally)
    if "window.EventSharkData" not in data_js:
        data_js = data_js.replace("export const", "const")
        data_js += "\nwindow.EventSharkData = { businessVerticals, seedEvents, mockAIBenefits };\n"
        
    # 2. Clean scraper.js (strip exports and expose globally)
    if "window.EventSharkScraper" not in scraper_js:
        scraper_js = scraper_js.replace("export async function", "async function")
        scraper_js += "\nwindow.EventSharkScraper = { scrapeEvent };\n"
        
    # 3. Clean app.js (strip imports and bind to window destructured variables)
    if "window.EventSharkData" not in app_js:
        # Strip ESM imports
        app_js = re.sub(r'import\s+{[^}]+}\s+from\s+[\'"].+[\'"];?', '', app_js)
        # Prepend window global declarations
        app_js = "const { seedEvents, businessVerticals, mockAIBenefits } = window.EventSharkData;\nconst { scrapeEvent } = window.EventSharkScraper;\n" + app_js

    # ---------------- HTML COMPILATION & INJECTION ----------------
    # 1. Strip out any existing stylesheet links
    html = re.sub(r'<\s*link[^>]*href=["\']styles\.css["\'][^>]*>', '', html)
    
    # 2. Strip out any existing script tags to prevent duplicates or CORS fetches
    html = re.sub(r'<\s*script[^>]*src=["\'](data|scraper|app)\.js["\'][^>]*><\s*/\s*script\s*>', '', html)
    html = re.sub(r'<\s*script[^>]*type=["\']module["\'][^>]*src=["\']app\.js["\'][^>]*><\s*/\s*script\s*>', '', html)
    
    # 3. Inject styles into <head>
    if css:
        html = html.replace('</head>', f'<style>{css}</style>\n</head>')
        
    # 4. Inject JavaScript payload (ordered: data -> scraper -> app) at the end of <body>
    js_payload = f"<script>{data_js}</script>\n<script>{scraper_js}</script>\n<script>{app_js}</script>"
    html = html.replace('</body>', f'{js_payload}\n</body>')
    
    # 5. Inline the Shark Logo as Base64 image
    logo_path = find_file("shark_logo.jpg")
    if logo_path:
        with open(logo_path, "rb") as f:
            encoded_logo = base64.b64encode(f.read()).decode('utf-8')
        html = html.replace('src="shark_logo.jpg"', f'src="data:image/jpeg;base64,{encoded_logo}"')
        
    return html

# File checks for debug expander
html_found = find_file("index.html") is not None
css_found = find_file("styles.css") is not None
data_found = find_file("data.js") is not None
scraper_found = find_file("scraper.js") is not None
app_found = find_file("app.js") is not None

# Render Debug Console if any crucial file is missing
if not (html_found and css_found and data_found and scraper_found and app_found):
    st.error("⚠️ Some event-shark assets are missing in your GitHub repository!")
    with st.expander("🔍 View File Status Logs"):
        st.write(f"- **index.html**: {'✅ Found' if html_found else '❌ Missing'}")
        st.write(f"- **styles.css**: {'✅ Found' if css_found else '❌ Missing'}")
        st.write(f"- **data.js**: {'✅ Found' if data_found else '❌ Missing'}")
        st.write(f"- **scraper.js**: {'✅ Found' if scraper_found else '❌ Missing'}")
        st.write(f"- **app.js**: {'✅ Found' if app_found else '❌ Missing'}")
        st.info("Make sure all these files are committed and pushed to your GitHub repository.")

# Render the compiled single-page app inside Streamlit components frame
try:
    inlined_html_content = get_inlined_html()
    
    # Render component with full screen spacing layout
    components.html(
        inlined_html_content,
        height=1000,
        scrolling=True
    )
except Exception as e:
    st.error(f"Failed to load Event Shark dashboard: {str(e)}")
