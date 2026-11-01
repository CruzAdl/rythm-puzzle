# Puzzle and Rhythm

An interactive rhythm and puzzle web game.

## Overview

The app presents a circle inside a coordinate grid. Clicking the plot area causes the circle to grow or shrink based on probability weights. However, there is a hidden rhythm mechanic: clicking at consistent ~1-second intervals (within the `0.85s - 1.15s` window) grants a guaranteed **Rhythm Bonus** (+2 radius)!

Once the circle expands to fill the arena (radius >= 50), it turns blue and completes the round, followed by a brief cooldown before resetting with a new randomized personality (weight distribution).

There is also a hidden visual rhythm guide toggle located in the bottom-right corner (or press the `H` key) to help visualize the 1-second tempo.

This project is implemented as an ultra-lightweight, zero-dependency static web application (< 10 KB total), ready to deploy to Netlify immediately.

## Repository Files

- `index.html`: Web application structure and SVG coordinate plot.
- `style.css`: Clean, responsive styling matching the Shiny UI.
- `app.js`: Game logic, rhythm detection, weighted random engine, and event handlers.
- `netlify.toml`: Netlify publishing configuration and security headers.
- `app.R`: Original R Shiny implementation.
- `deploy.R`: Legacy rsconnect deployment script for Shiny.
