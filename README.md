<p align="center">
  <img src="assets/logo.png" alt="Lofi Bonsai" width="180">
</p>

# 🌿 Lofi Bonsai

A cozy, offline lofi companion: a looping room video, your own music, a soft day/night tint and a few kind words now and then. Runs as a **Progressive Web App** — install it on your phone, tablet or desktop and it works with no internet.

> ✨ **Made with vibe coding.** I built this project by describing what I wanted in plain language and iterating with an AI assistant ([Claude](https://claude.ai)) — no formal coding workflow, just ideas, taste and a lot of "a bit more cozy, please".

## Features

- 🎬 Looping, silent background video of a cozy room
- 🎵 Your own music (`mp3`, `wav`, `ogg`, `m4a`) — nothing is uploaded anywhere
- 🕐 Time-of-day tint: Auto (follows your clock), Night, Morning, Day, Evening
- 🌙 / ☀ Dark and light page skin, remembered between visits
- 💬 Small positive messages that pop up in the track display
- ⛶ Fullscreen video (with a fallback for iPhone)
- 📱 Mobile-friendly layout (portrait and landscape), lock-screen media controls
- 📴 Works offline once installed

## Install it as an app

A PWA must be served over **HTTPS** (or `localhost`) — opening `index.html` by double-click still works as a normal page, but it can't be installed.

1. Put this folder on any static host: GitHub Pages, Netlify, Cloudflare Pages, Vercel…
2. Open the URL on your device.
   - **Android / Chrome / Edge:** tap **⬇ INSTALL** (or browser menu → *Install app*).
   - **iPhone / iPad (Safari):** Share → **Add to Home Screen**.
   - **Desktop Chrome / Edge:** install icon in the address bar.

To test locally: `python3 -m http.server 8000` in this folder, then open `http://localhost:8000`.

## Adding music

- **Phone / tablet / Firefox / Safari:** tap **📁 ADD MUSIC** and pick your songs. They are saved inside the app on that device, so they're still there next time. Use **🗑** to remove them.
- **Desktop Chrome / Edge:** **📁 ADD MUSIC FOLDER** (up to 3 folders, combined into one playlist, duplicate filenames skipped). The folders are remembered; you may need one click to re-allow access after restarting the browser.
- On iPhone the volume slider is hidden because iOS only allows the hardware volume buttons.

## Project structure

```
index.html            the whole app (HTML + CSS + JS, no libraries)
manifest.webmanifest  PWA manifest (name, colors, icons)
sw.js                 service worker (offline cache)
assets/               logo + background video
icons/                app icons, maskable icon, favicons
music/                optional: drop songs here if you like
```

## Updating

When you change any file, bump `CACHE = 'lofi-bonsai-v1'` in `sw.js` (e.g. to `v2`) so installed copies refresh.

## Notes

Plain HTML/CSS/JS — no build step, no tracking, no server.
