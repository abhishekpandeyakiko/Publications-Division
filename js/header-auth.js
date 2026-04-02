// Header Authentication Handler
// Manages login state display and redirect logic for header icons

/**
 * Initialize header authentication UI
 */
function initHeaderAuth() {
  updateAuthUI();

  // Listen for auth status changes
  window.addEventListener('authStatusChanged', updateAuthUI);

  // Setup click handlers for wishlist, cart, and profile icons
  setupIconClickHandlers();
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
 * Setup click handlers for wishlist, cart, and profile icons
 */
function setupIconClickHandlers() {
  const wishlistLink = document.getElementById('wishlistHeaderLink');
  const cartLink = document.getElementById('cartHeaderLink');
  const profileLink = document.getElementById('headerProfileLink');

  if (wishlistLink) {
    wishlistLink.addEventListener('click', function (e) {
      e.preventDefault();
      handleHeaderIconClick('wishlist');
    });
  }

  if (cartLink) {
    cartLink.addEventListener('click', function (e) {
      e.preventDefault();
      handleHeaderIconClick('cart');
    });
  }

  if (profileLink) {
    profileLink.addEventListener('click', function (e) {
      e.preventDefault();
      handleHeaderIconClick('profile');
    });
  }

  // Also setup logout button handler
  const logoutBtn = document.getElementById('headerLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handleLogout();
    });
  }
}

/**
 * Common handler for header icon clicks (Wishlist, Cart, Profile)
 * @param {string} section - The target section to open
 */
function handleHeaderIconClick(section) {
  // Check login status
  let loggedIn = false;
  if (typeof window.isLoggedIn === 'function') {
    loggedIn = window.isLoggedIn();
  } else {
    loggedIn = localStorage.getItem('userLoggedIn') === 'true';
  }

  // If not logged in, show auth modal (for wishlist and cart)
  if (!loggedIn && (section === 'wishlist' || section === 'cart')) {
    if (window.AuthGuard) {
      window.AuthGuard.showModal();
    }
    return;
  }

  // If already on profile page, just switch tab
  const isProfilePage = window.location.hash.startsWith('#/user-profile') || 
                        document.querySelector('.profile-dashboard');
  
  if (isProfilePage) {
    console.log('Already on profile page, switching tab to:', section);
    const navButton = document.querySelector(`.nav-item-btn[data-section="${section}"]`);
    if (navButton) {
      navButton.click();
      return;
    }
  }

  // Set global target for the profile dashboard to pick up after load
  window.forceProfileSection = section;
  console.log('Final handoff - forcing profile section:', section);

  // Otherwise navigate to profile page with section parameter
  const path = `/user-profile?section=${section}`;
  console.log('Navigating to profile section:', path);
  if (window.Router) {
    window.Router.navigate(path);
  } else {
    window.location.hash = path;
  }
}

/**
 * Handle logout process
 */
function handleLogout() {
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
}

// Removed setupProfileIconHandler as logic is now in setupIconClickHandlers

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderAuth);
} else {
  initHeaderAuth();
}

// Also initialize after header is loaded dynamically
document.addEventListener('headerLoaded', initHeaderAuth);
