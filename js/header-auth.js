// Header Authentication Handler
// Manages login state display and redirect logic for header icons

/**
 * Initialize header authentication UI
 */
function initHeaderAuth() {
  updateAuthUI();
  
  // Listen for auth status changes
  window.addEventListener('authStatusChanged', updateAuthUI);
  
  // Setup click handlers for wishlist and cart icons
  setupIconClickHandlers();
  
  // Setup profile icon click handler
  setupProfileIconHandler();
}

/**
 * Update header UI based on login status
 */
function updateAuthUI() {
  // Check login status from localStorage or auth utility
  let loggedIn = false;
  if (typeof window.isLoggedIn === 'function') {
    loggedIn = window.isLoggedIn();
  } else {
    loggedIn = localStorage.getItem('userLoggedIn') === 'true';
  }
  
  const loginBtn = document.querySelector('.auth-login-btn');
  const profileBtn = document.querySelector('.auth-profile-btn');
  
  if (loginBtn && profileBtn) {
    if (loggedIn) {
      loginBtn.style.display = 'none';
      profileBtn.style.display = 'inline-block';
    } else {
      loginBtn.style.display = 'inline-block';
      profileBtn.style.display = 'none';
    }
  }
}

/**
 * Setup click handlers for wishlist and cart icons
 */
function setupIconClickHandlers() {
  const wishlistLink = document.getElementById('wishlistHeaderLink');
  const cartLink = document.getElementById('cartHeaderLink');
  
  if (wishlistLink) {
    wishlistLink.addEventListener('click', function(e) {
      e.preventDefault();
      handleWishlistClick();
    });
  }
  
  if (cartLink) {
    cartLink.addEventListener('click', function(e) {
      e.preventDefault();
      handleCartClick();
    });
  }
}

/**
 * Handle wishlist icon click
 */
function handleWishlistClick() {
  let loggedIn = false;
  if (typeof window.isLoggedIn === 'function') {
    loggedIn = window.isLoggedIn();
  } else {
    loggedIn = localStorage.getItem('userLoggedIn') === 'true';
  }
  
  if (loggedIn) {
    // Redirect to profile page with wishlist section
    if (window.Router) {
      window.Router.navigate('/user-profile?section=wishlist');
    } else {
      window.location.href = '/user-profile?section=wishlist';
    }
  } else {
    // Redirect to login page
    if (window.Router) {
      window.Router.navigate('/login');
    } else {
      window.location.href = '/login';
    }
  }
}

/**
 * Handle cart icon click
 */
function handleCartClick() {
  let loggedIn = false;
  if (typeof window.isLoggedIn === 'function') {
    loggedIn = window.isLoggedIn();
  } else {
    loggedIn = localStorage.getItem('userLoggedIn') === 'true';
  }
  
  if (loggedIn) {
    // Redirect to profile page (or cart page if you want separate cart)
    // Based on user request: "wishlist and card redirect to that common sidebar one page"
    if (window.Router) {
      window.Router.navigate('/user-profile?section=cart');
    } else {
      window.location.href = '/user-profile?section=cart';
    }
  } else {
    // Redirect to login page
    if (window.Router) {
      window.Router.navigate('/login');
    } else {
      window.location.href = '/login';
    }
  }
}

/**
 * Setup profile icon click handler
 */
function setupProfileIconHandler() {
  const profileBtn = document.getElementById('profileIconBtn');
  
  if (profileBtn) {
    profileBtn.addEventListener('click', function() {
      window.location.href = '/user-profile';
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderAuth);
} else {
  initHeaderAuth();
}

// Also initialize after header is loaded dynamically
document.addEventListener('headerLoaded', initHeaderAuth);
