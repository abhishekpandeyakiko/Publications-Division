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

// Make initHomePage globally available
window.initHomePage = initHomePage;

