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
    wishlistLink.addEventListener('click', function (e) {
      e.preventDefault();
      handleWishlistClick();
    });
  }

  if (cartLink) {
    cartLink.addEventListener('click', function (e) {
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
    // Redirect to profile page with wishlist section ID
    if (window.Router) {
      window.Router.navigate('/user-profile?target=wishlistSection');
    } else {
      window.location.href = '/user-profile?target=wishlistSection';
    }
  } else {
    // Logic for non-logged in users
    if (window.AuthGuard) {
      window.AuthGuard.showModal();
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
    // Redirect to profile page with cart section ID
    if (window.Router) {
      window.Router.navigate('/user-profile?target=cartSection');
    } else {
      window.location.href = '/user-profile?target=cartSection';
    }
  } else {
    // Logic for non-logged in users
    if (window.AuthGuard) {
      window.AuthGuard.showModal();
    }
  }
}

/**
 * Setup profile icon click handler
 */
/**
 * Setup profile dropdown handlers
 */
function setupProfileIconHandler() {
  // Dropdown toggling is handled by Bootstrap attributes in HTML

  // Setup logout button handler
  const logoutBtn = document.getElementById('headerLogoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // Perform logout
      if (typeof window.logout === 'function') {
        window.logout();
      } else {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userData');
        window.dispatchEvent(new CustomEvent('authStatusChanged', { detail: { isLoggedIn: false } }));
      }

      // Redirect to home page
      if (window.Router) {
        window.Router.navigate('/');
      } else {
        window.location.href = '/';
      }
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
