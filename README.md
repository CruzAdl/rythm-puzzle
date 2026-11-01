# Puzzle and Rhythm

An interactive rhythm and puzzle web game.

## Overview

The app presents a circle inside a coordinate grid. Clicking the plot area causes the circle to grow or shrink based on probability weights. However, there is a hidden rhythm mechanic: clicking at consistent ~1-second intervals (within the `0.85s - 1.15s` window) grants a guaranteed **Rhythm Bonus** (+2 radius)!

Once the circle expands to fill the arena (radius >= 50), it turns blue and completes the round, followed by a brief cooldown before resetting with a new randomized personality (weight distribution).

There is also a hidden visual rhythm guide toggle located in the bottom-right corner (or press the `H` key) to help visualize the 1-second tempo.

## Live Deployment on Netlify

This project is implemented as an ultra-lightweight, zero-dependency static web application (< 10 KB total), ready to deploy to Netlify immediately.

### Option 1: Netlify Git Integration (Recommended)
1. Push this repository to GitHub/GitLab.
2. In the [Netlify Dashboard](https://app.netlify.com/), click **"Add new site"** &rarr; **"Import an existing project"**.
3. Select your repository.
4. Netlify will auto-detect `netlify.toml` (publish directory: `.`, zero build commands needed). Click **"Deploy site"**.

### Option 2: Netlify Drop (Instant Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this repository folder onto the page.
3. Your site is live in seconds with an instant URL!

### Option 3: Netlify CLI
Run the following in the project root:
```bash
npx netlify-cli deploy --prod --dir=.
```

---

## Local Development & Testing

Since the web app is built with pure vanilla HTML5, CSS3, and modern JavaScript, no build step or package installations are required:

- **Direct in browser:** Double-click `index.html` to open it in any web browser.
- **Local HTTP server:**
  ```bash
  python3 -m http.server 8000
  ```
  Then navigate to `http://localhost:8000`.

---

## Repository Files

- `index.html`: Web application structure and SVG coordinate plot.
- `style.css`: Clean, responsive styling matching the Shiny UI.
- `app.js`: Game logic, rhythm detection, weighted random engine, and event handlers.
- `netlify.toml`: Netlify publishing configuration and security headers.
- `app.R`: Original R Shiny implementation.
- `deploy.R`: Legacy rsconnect deployment script for Shiny.
