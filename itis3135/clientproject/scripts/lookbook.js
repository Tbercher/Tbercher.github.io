/**
 * Lookbook Gallery Filter
 * Filters gallery items by category with animated transitions.
 * Includes lightbox for fullscreen photo viewing.
 */

(function () {
  const ACTIVE_CLASS = "filter-btn-active";
  const HIDDEN_CLASS = "gallery-item-hidden";
  const VISIBLE_CLASS = "gallery-item-visible";

  // ─── Lightbox state ──────────────────────────────────────────────────────────

  let lightboxEl = null;
  let lightboxImg = null;
  let lightboxCaption = null;
  let visibleItems = [];
  let currentIndex = -1;

  // ─── Pure helpers (no dependencies) ─────────────────────────────────────────

  function getBgImageUrl(itemEl) {
    const bg = itemEl.style.backgroundImage || "";
    const match = bg.match(/url\(\s*["']?([^"')]+)["']?\s*\)/);
    return match ? match[1] : "";
  }

  function getCaption(itemEl) {
    const titleEl = itemEl.querySelector(".gallery-caption-title");
    return titleEl ? titleEl.textContent.trim() : "";
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ─── Lightbox actions (defined before anything calls them) ───────────────────

  function closeLightbox() {
    lightboxEl.classList.remove("lightbox--open");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  function showAtIndex(index) {
    currentIndex = index;
    const itemEl = visibleItems[index];

    lightboxImg.src = getBgImageUrl(itemEl);
    lightboxImg.alt = getCaption(itemEl);
    lightboxCaption.textContent = getCaption(itemEl);

    document
      .getElementById("lightbox-prev")
      .toggleAttribute("hidden", index === 0);
    document
      .getElementById("lightbox-next")
      .toggleAttribute("hidden", index === visibleItems.length - 1);

    lightboxImg.style.animation = "none";
    void lightboxImg.offsetWidth;
    lightboxImg.style.animation = "";
  }

  function showPrev() {
    if (currentIndex > 0) showAtIndex(currentIndex - 1);
  }

  function showNext() {
    if (currentIndex < visibleItems.length - 1) showAtIndex(currentIndex + 1);
  }

  function onKeyDown(e) {
    if (!lightboxEl.classList.contains("lightbox--open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  }

  // ─── Lightbox setup (uses all of the above) ──────────────────────────────────

  function buildLightbox() {
    lightboxEl = document.createElement("div");
    lightboxEl.id = "lightbox";
    lightboxEl.setAttribute("role", "dialog");
    lightboxEl.setAttribute("aria-modal", "true");
    lightboxEl.setAttribute("aria-label", "Fullscreen image viewer");
    lightboxEl.innerHTML = `
      <div id="lightbox-backdrop"></div>
      <button id="lightbox-close" aria-label="Close">&times;</button>
      <button id="lightbox-prev" aria-label="Previous image">&#8249;</button>
      <button id="lightbox-next" aria-label="Next image">&#8250;</button>
      <figure id="lightbox-figure">
        <img id="lightbox-img" src="" alt="" />
        <figcaption id="lightbox-caption"></figcaption>
      </figure>
    `;

    const style = document.createElement("style");
    style.textContent = `
      #lightbox {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        align-items: center;
        justify-content: center;
      }
      #lightbox.lightbox--open {
        display: flex;
      }
      #lightbox-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.92);
        cursor: zoom-out;
      }
      #lightbox-figure {
        position: relative;
        z-index: 1;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 92vw;
        max-height: 92vh;
        animation: lightbox-fade-in 0.22s ease;
      }
      @keyframes lightbox-fade-in {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
      }
      #lightbox-img {
        display: block;
        max-width: 92vw;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.6);
        user-select: none;
      }
      #lightbox-caption {
        margin-top: 12px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        text-align: center;
      }
      #lightbox-close {
        position: fixed;
        top: 18px;
        right: 22px;
        z-index: 2;
        background: none;
        border: none;
        color: #fff;
        font-size: 2.4rem;
        line-height: 1;
        cursor: pointer;
        opacity: 0.75;
        transition: opacity 0.15s;
      }
      #lightbox-close:hover { opacity: 1; }
      #lightbox-prev,
      #lightbox-next {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        background: rgba(255,255,255,0.12);
        border: none;
        color: #fff;
        font-size: 2.8rem;
        line-height: 1;
        padding: 10px 16px;
        cursor: pointer;
        border-radius: 4px;
        opacity: 0.7;
        transition: opacity 0.15s, background 0.15s;
      }
      #lightbox-prev:hover,
      #lightbox-next:hover {
        opacity: 1;
        background: rgba(255,255,255,0.22);
      }
      #lightbox-prev { left: 14px; }
      #lightbox-next { right: 14px; }
      #lightbox-prev[hidden],
      #lightbox-next[hidden] { display: none; }
      .gallery-item { cursor: zoom-in; }
    `;

    document.head.appendChild(style);
    document.body.appendChild(lightboxEl);

    lightboxImg = document.getElementById("lightbox-img");
    lightboxCaption = document.getElementById("lightbox-caption");

    document
      .getElementById("lightbox-backdrop")
      .addEventListener("click", closeLightbox);
    document
      .getElementById("lightbox-close")
      .addEventListener("click", closeLightbox);
    document
      .getElementById("lightbox-prev")
      .addEventListener("click", showPrev);
    document
      .getElementById("lightbox-next")
      .addEventListener("click", showNext);
    document.addEventListener("keydown", onKeyDown);
  }

  function openLightbox(itemEl) {
    const src = getBgImageUrl(itemEl);
    if (!src) return;

    visibleItems = Array.from(
      document.querySelectorAll(`.gallery-item:not(.${HIDDEN_CLASS})`)
    );
    currentIndex = visibleItems.indexOf(itemEl);

    showAtIndex(currentIndex);
    lightboxEl.classList.add("lightbox--open");
    document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close").focus();
  }

  // ─── Gallery filter helpers (defined before filterGallery uses them) ─────────

  function moveIndicator(activeBtn) {
    const indicator = document.getElementById("filter-indicator");
    if (!indicator) return;
    const btnRect = activeBtn.getBoundingClientRect();
    const barRect = activeBtn.closest("#filters").getBoundingClientRect();
    indicator.style.width = btnRect.width + "px";
    indicator.style.left = btnRect.left - barRect.left + "px";
  }

  function updateCount(category, items) {
    const countEl = document.getElementById("gallery-count");
    if (!countEl) return;
    let count = 0;
    items.forEach((item) => {
      if (category === "all" || item.dataset.category === category) count++;
    });
    const label = category === "all" ? "All" : capitalize(category);
    countEl.textContent = `${count} ${label} ${count === 1 ? "Image" : "Images"}`;
  }

  // ─── Gallery Filter ──────────────────────────────────────────────────────────

  function filterGallery(category) {
    const items = document.querySelectorAll(".gallery-item");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach((btn) => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle(ACTIVE_CLASS, isActive);
      btn.setAttribute("aria-selected", isActive);
      if (isActive) moveIndicator(btn);
    });

    let visibleIndex = 0;

    items.forEach((item) => {
      const matches = category === "all" || item.dataset.category === category;

      if (!matches) {
        item.classList.remove(VISIBLE_CLASS);
        item.classList.add(HIDDEN_CLASS);
      } else {
        item.classList.remove(HIDDEN_CLASS);
        item.classList.remove(VISIBLE_CLASS);
        void item.offsetWidth;
        const delay = visibleIndex * 55;
        setTimeout(() => item.classList.add(VISIBLE_CLASS), delay);
        visibleIndex++;
      }
    });

    updateCount(category, items);
  }

  window.filterGallery = filterGallery;

  // ─── Init ────────────────────────────────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", function () {
    buildLightbox();

    const allBtn = document.querySelector('[data-category="all"]');
    if (allBtn) {
      setTimeout(() => moveIndicator(allBtn), 50);
    }

    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item, index) => {
      setTimeout(
        () => {
          item.classList.add(VISIBLE_CLASS);
        },
        100 + index * 60
      );

      item.addEventListener("click", () => openLightbox(item));
    });

    updateCount("all", items);
  });
})();
