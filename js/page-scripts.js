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

  let index = 0;

  const slide = () => {
    const cards = document.querySelectorAll(".category-card");
    const totalCards = cards.length;
    if (totalCards === 0) return;

    let visibleCards = 6;
    const width = window.innerWidth;
    if (width <= 768) visibleCards = 2;
    else if (width <= 1024) visibleCards = 4;

    const moveBy = 100 / visibleCards;
    index = (index + 1) % totalCards;
    track.style.transform = `translateX(-${index * moveBy}%)`;
  };

  const manualSlide = (direction) => {
    const cards = document.querySelectorAll(".category-card");
    const totalCards = cards.length;
    if (totalCards === 0) return;

    let visibleCards = 5;
    const width = window.innerWidth;
    if (width <= 768) visibleCards = 2;
    else if (width <= 1024) visibleCards = 4;

    const moveBy = 100 / visibleCards;
    index = (index + direction + totalCards) % totalCards;
    track.style.transform = `translateX(-${index * moveBy}%)`;
  };

  prev.addEventListener("click", () => manualSlide(-1));
  next.addEventListener("click", () => manualSlide(1));

  let autoSlideInterval;
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => slide(), 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

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

