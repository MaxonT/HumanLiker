
# Humanzier (v0.1) — Mini Site (PWA-Ready)
UI Language: Chinese Simplified

Local, rule-based text humanizer. No backend, no tracking. Works offline after first load.

## Quick Start
- Open `index.html` in a modern browser, or deploy using any static host.

## Deploy Options
### 1) GitHub Pages
1. Create a new repo and push these files.
2. Settings → Pages → Deploy from `main` / `/ (root)`.
3. Visit `https://<user>.github.io/<repo>/`.

### 2) Netlify
- Drag-and-drop the folder at https://app.netlify.com/drop
- Or `netlify deploy --dir=.` (production: `netlify deploy --prod`)

### 3) Vercel
- `vercel --prod` with defaults (framework: “Other”).

## PWA Notes
- Manifest + Service Worker included.
- Icons in `/assets` (192, 512). Add more sizes if needed.
- To update SW, bump cache name in `sw.js`.

## Structure
.
├── index.html
├── styles.css
├── script.js
├── sw.js
├── manifest.webmanifest
├── privacy.html
├── terms.html
├── robots.txt
└── assets/
    ├── favicon.svg
    ├── icon-192.png
    └── icon-512.png

## License
© Tiger, 2025. MIT for the code in this template. Content you process remains yours.
