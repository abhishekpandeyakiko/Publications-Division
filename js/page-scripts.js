// Page-Specific Scripts
// Contains initialization functions for page-specific functionality

/**
 * Initialize home page functionality
 * Called when home page is loaded
 */
function initHomePage() {
  // Category slider functionality
  initCategorySlider();

  // Social media scroll functionality
  initSocialMediaScroll();
}

/**
 * Initialize category slider
 */
function initCategorySlider() {
  const track = document.getElementById("sliderTrack");
  if (!track) return;

  const prev = document.querySelector(".slider-btn.prev");
  const next = document.querySelector(".slider-btn.next");
  if (!prev || !next) return;

  // Get original cards
  let cards = Array.from(track.querySelectorAll(".category-card"));
  const originalCount = cards.length;
  if (originalCount === 0) return;

  // Determine visible cards to know how many to clone
  const getVisibleCards = () => {
    const width = window.innerWidth;
    if (width <= 768) return 2;
    if (width <= 1024) return 4;
    return 5; // Match CSS (flex: 0 0 calc(20% - 16px))
  };

  let visibleCards = getVisibleCards();

  // Clone cards for infinite effect
  // Append first few to end
  for (let i = 0; i < visibleCards; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add('clone-end');
    track.appendChild(clone);
  }
  // Prepend last few to start
  for (let i = originalCount - 1; i >= originalCount - visibleCards; i--) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add('clone-start');
    track.insertBefore(clone, track.firstChild);
  }

  // Update cards list to include clones
  let allCards = track.querySelectorAll(".category-card");
  let index = visibleCards; // Start at the first original card
  let isTransitioning = false;

  const updatePosition = (animation = true) => {
    const moveBy = 100 / visibleCards;
    track.style.transition = animation ? "transform 0.5s ease-in-out" : "none";
    track.style.transform = `translateX(-${index * moveBy}%)`;
  };

  // Initial position
  updatePosition(false);

  const slide = (direction) => {
    if (isTransitioning) return;
    isTransitioning = true;
    index += direction;
    updatePosition();
  };

  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    // Silent jump if we reached clones
    if (index >= originalCount + visibleCards) {
      index = visibleCards;
      updatePosition(false);
    } else if (index < visibleCards) {
      index = originalCount + index;
      updatePosition(false);
    }
  });

  prev.addEventListener("click", () => slide(-1));
  next.addEventListener("click", () => slide(1));

  let autoSlideInterval;
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => slide(1), 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  // Re-calculate on resize
  window.addEventListener("resize", () => {
    const newVisible = getVisibleCards();
    if (newVisible !== visibleCards) {
      // For simplicity, reload or re-init if layout changes significantly
      // But here we'll just update moveBy calculation in updatePosition
      visibleCards = newVisible;
      updatePosition(false);
    }
  });

  startAutoSlide();
}

/**
 * Initialize social media scroll functionality
 */
function initSocialMediaScroll() {
  const container = document.getElementById("cardContainer");
  if (!container) return;

  const leftBtn = document.getElementById("scrollLeft");
  const rightBtn = document.getElementById("scrollRight");

  if (!leftBtn || !rightBtn) return;

  const CARD_WIDTH = 336;

  const updateButtons = () => {
    leftBtn.disabled = container.scrollLeft <= 0;
    rightBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
  };

  leftBtn.addEventListener("click", () => {
    container.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
    setTimeout(updateButtons, 500);
  });

  rightBtn.addEventListener("click", () => {
    container.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
    setTimeout(updateButtons, 500);
  });

  container.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
}

/**
 * Initialize product description page functionality
 */
function initProductDescriptionPage() {
  const tabs = document.querySelectorAll('#productTabs .nav-link');
  const panes = document.querySelectorAll('.tab-content .tab-pane');

  if (tabs.length === 0 || panes.length === 0) {
    console.warn('Tabs or panes not found for initialization');
    return;
  }

  // 1. Set default state: Specifications active, Description hidden
  function setDefaultTab() {
    tabs.forEach(tab => {
      // Use data-bs-target check or just index if preferred, but target is safer
      const target = tab.getAttribute('data-bs-target');
      if (target === '#specification') {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    panes.forEach(pane => {
      if (pane.id === 'specification') {
        pane.classList.add('show', 'active');
      } else {
        pane.classList.remove('show', 'active');
      }
    });
  }

  // Initialize default state immediately
  setDefaultTab();

  // 2. Handle click with explicit condition and first-hide logic
  tabs.forEach(tabEl => {
    tabEl.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('data-bs-target');

      // FIRST: Hide all panes (Condition: clean slate)
      panes.forEach(pane => {
        pane.classList.remove('show', 'active');
      });

      // Remove active class from all tab buttons
      tabs.forEach(t => t.classList.remove('active'));

      // THEN: Show the clicked target
      const targetPane = document.querySelector(targetId);
      if (targetPane) {
        this.classList.add('active');
        targetPane.classList.add('show', 'active');
      }
    });
  });

  // Wishlist toggle
  const wishlistBtn = document.querySelector('.wishlist-btn-dec');
  if (wishlistBtn) {
    wishlistBtn.onclick = function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        this.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        this.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    };
  }
}

/**
 * Initialize all reviews page functionality
 */
function initAllReviewsPage() {
  console.log('All Reviews page initialized');
  // Add interactivity for filters or pagination here if needed
}

// Make functions globally available
window.initHomePage = initHomePage;
window.initProductDescriptionPage = initProductDescriptionPage;
window.initAllReviewsPage = initAllReviewsPage;

