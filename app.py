import streamlit as st
import streamlit.components.v1 as components
import os
import base64

# Set Streamlit Page Configuration
st.set_page_config(
    page_title="Event Shark Dashboard",
    page_icon="🦈",
    layout="wide",
    initial_sidebar_state="collapsed"
)

def get_inlined_html():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Read index.html
    html_path = os.path.join(base_dir, "index.html")
    if not os.path.exists(html_path):
        return "<h3>Error: index.html not found. Make sure app.py is in the event-shark root directory.</h3>"
        
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Read styles.css
    css_path = os.path.join(base_dir, "styles.css")
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css = f.read()
        # Replace stylesheet link with inline CSS
        html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>{css}</style>')
        
    # Read data.js
    data_path = os.path.join(base_dir, "data.js")
    if os.path.exists(data_path):
        with open(data_path, "r", encoding="utf-8") as f:
            data_js = f.read()
        # Replace script tag with inline JS
        html = html.replace('<script src="data.js"></script>', f'<script>{data_js}</script>')
        
    # Read scraper.js
    scraper_path = os.path.join(base_dir, "scraper.js")
    if os.path.exists(scraper_path):
        with open(scraper_path, "r", encoding="utf-8") as f:
            scraper_js = f.read()
        html = html.replace('<script src="scraper.js"></script>', f'<script>{scraper_js}</script>')
        
    # Read app.js
    app_path = os.path.join(base_dir, "app.js")
    if os.path.exists(app_path):
        with open(app_path, "r", encoding="utf-8") as f:
            app_js = f.read()
        html = html.replace('<script src="app.js"></script>', f'<script>{app_js}</script>')
        
    # Inline the Shark Logo as Base64 image
    logo_path = os.path.join(base_dir, "shark_logo.jpg")
    if os.path.exists(logo_path):
        with open(logo_path, "rb") as f:
            encoded_logo = base64.b64encode(f.read()).decode('utf-8')
        html = html.replace('src="shark_logo.jpg"', f'src="data:image/jpeg;base64,{encoded_logo}"')
        
    return html

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
