/**
 * about.js
 * Instagram Feed Integration — Taylor Elizabeth White
 * Powered by Behold.so
 *
 * SETUP:
 *   1. Go to https://behold.so and create a free account
 *   2. Connect your Instagram account
 *   3. Create a widget and copy your Widget ID from the dashboard
 *   4. Replace BEHOLD_WIDGET_ID below with your Widget ID
 */

const BEHOLD_WIDGET_ID = "YOUR_WIDGET_ID_HERE";

// ─── Entry point ───────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initBeholdFeed();
});

// ─── Init ──────────────────────────────────────────────────────────────────────

function initBeholdFeed() {
  const container = document.getElementById("instagram-feed");
  if (!container) {
    console.warn("about.js: No element with id='instagram-feed' found.");
    return;
  }

  if (BEHOLD_WIDGET_ID === "YOUR_WIDGET_ID_HERE") {
    container.innerHTML = `<p class="ig-notice">Add your Behold Widget ID to about.js to display the Instagram feed.</p>`;
    injectStyles();
    return;
  }

  renderWidget(container);
  injectStyles();
}

// ─── Render ────────────────────────────────────────────────────────────────────

function renderWidget(container) {
  // Behold web component — renders the full feed
  container.innerHTML = `
    <behold-widget widget-id="${escapeAttr(BEHOLD_WIDGET_ID)}"></behold-widget>
  `;

  // Load the Behold script if not already present
  if (!document.querySelector('script[src*="behold.so"]')) {
    const script = document.createElement("script");
    script.src = "https://w.behold.so/widget.js";
    script.type = "module";
    document.head.appendChild(script);
  }
}

// ─── Utility ───────────────────────────────────────────────────────────────────

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

// ─── Styles ────────────────────────────────────────────────────────────────────

function injectStyles() {
  if (document.getElementById("ig-feed-styles")) return;

  const style = document.createElement("style");
  style.id = "ig-feed-styles";
  style.textContent = `
    #instagram-feed {
      width: 100%;
      margin: 2rem 0;
    }

    /* Behold widget fills the container width */
    #instagram-feed behold-widget {
      display: block;
      width: 100%;
    }

    .ig-notice {
      font-size: 0.9rem;
      opacity: 0.6;
      padding: 1rem 0;
    }
  `;

  document.head.appendChild(style);
}
