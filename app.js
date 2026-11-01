// Puzzle and Rhythm - Core Application Logic
// Lightweight vanilla JS implementation of app.R

(function () {
  'use strict';

  // Application state (mirroring Shiny reactiveValues)
  let r = 1;
  let col = 'red';
  let active = true;
  let doneTime = null;
  let w = [1, 1, 1, 1];
  let lastClk = performance.now();
  let msg = 'Random';

  // Timers and intervals
  let pulseIntervalId = null;
  let pulseTimeoutId = null;
  let resetDisplayIntervalId = null;
  let resetCooldownTimeoutId = null;

  // DOM elements
  const pulseEl = document.getElementById('pulse');
  const timerEl = document.getElementById('timer');
  const infoEl = document.getElementById('info');
  const circleEl = document.getElementById('target-circle');
  const plotWrapper = document.getElementById('plot-wrapper');
  const aidToggle = document.getElementById('aid_toggle');

  // Format weights to match R's round(v$w, 2)
  function formatWeights(weights) {
    return weights.map(val => (Math.round(val * 100) / 100).toString()).join(', ');
  }

  // Update the UI representation
  function updateUI() {
    circleEl.setAttribute('r', r);
    circleEl.setAttribute('fill', col);
    infoEl.textContent = `Mode: ${msg} | Current Weights: ${formatWeights(w)}`;

    if (doneTime === null) {
      timerEl.textContent = '';
    }
  }

  // Weighted random sample: sample(c(1.5, 4, -2, 0), 1, prob = w)
  function sampleWeighted(outcomes, weights) {
    const total = weights.reduce((acc, val) => acc + val, 0);
    if (total <= 0) {
      return outcomes[Math.floor(Math.random() * outcomes.length)];
    }
    let rnd = Math.random() * total;
    for (let i = 0; i < outcomes.length; i++) {
      if (rnd < weights[i]) {
        return outcomes[i];
      }
      rnd -= weights[i];
    }
    return outcomes[outcomes.length - 1];
  }

  // Handle pulse guide toggling (1000ms loop, 200ms active)
  function setAidToggle(enabled) {
    if (pulseIntervalId) {
      clearInterval(pulseIntervalId);
      pulseIntervalId = null;
    }
    if (pulseTimeoutId) {
      clearTimeout(pulseTimeoutId);
      pulseTimeoutId = null;
    }

    if (enabled) {
      const flashPulse = () => {
        pulseEl.style.opacity = '1';
        pulseTimeoutId = setTimeout(() => {
          pulseEl.style.opacity = '0.2';
        }, 200);
      };

      flashPulse();
      pulseIntervalId = setInterval(flashPulse, 1000);
    } else {
      pulseEl.style.opacity = '0.2';
    }
  }

  // Handle click on plot area
  function handlePlotClick() {
    if (!active) return;

    const now = performance.now();
    const diff = (now - lastClk) / 1000;
    lastClk = now;

    // Rhythm logic (0.85s - 1.15s window)
    if (diff >= 0.85 && diff <= 1.15) {
      r += 2;
      msg = 'Rhythm Bonus!';
    } else {
      // Random weights: [Small Grow (1.5), Big Grow (4), Shrink (-2), Nothing (0)]
      const change = sampleWeighted([1.5, 4, -2, 0], w);
      r = Math.max(1, r + change);
      msg = 'Random';
    }

    // Completion logic (radius >= 50)
    if (r >= 50) {
      col = 'blue';
      active = false;
      doneTime = performance.now();
      updateUI();

      // Start elapsed timer loop (updating every 50ms to match Shiny's invalidateLater(100))
      if (resetDisplayIntervalId) clearInterval(resetDisplayIntervalId);
      resetDisplayIntervalId = setInterval(() => {
        if (doneTime !== null) {
          const elapsed = (performance.now() - doneTime) / 1000;
          timerEl.textContent = `Resetting... ${elapsed.toFixed(1)}`;
        }
      }, 50);

      // Random reset delay between 1000ms and 3000ms
      const delayMs = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
      if (resetCooldownTimeoutId) clearTimeout(resetCooldownTimeoutId);
      resetCooldownTimeoutId = setTimeout(() => {
        if (resetDisplayIntervalId) {
          clearInterval(resetDisplayIntervalId);
          resetDisplayIntervalId = null;
        }

        r = 1;
        col = 'red';
        active = true;
        doneTime = null;
        // New random personality: runif(4)
        w = [Math.random(), Math.random(), Math.random(), Math.random()];
        updateUI();
      }, delayMs);

      return;
    }

    updateUI();
  }

  // Attach event listeners
  plotWrapper.addEventListener('click', handlePlotClick);

  aidToggle.addEventListener('change', () => {
    setAidToggle(aidToggle.checked);
  });

  // Keyboard accessibility
  plotWrapper.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handlePlotClick();
    }
  });

  window.addEventListener('keydown', (e) => {
    // Spacebar to click when not focusing the checkbox
    if (e.key === ' ' && document.activeElement !== aidToggle) {
      e.preventDefault();
      handlePlotClick();
    }
    // Secret hotkey 'h' or 'H' to toggle rhythm aid
    if (e.key === 'h' || e.key === 'H') {
      aidToggle.checked = !aidToggle.checked;
      setAidToggle(aidToggle.checked);
    }
  });

  // Initial render
  updateUI();
})();
