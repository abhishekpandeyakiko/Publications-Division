// Authentication Utility
// Manages user login state and provides helper functions

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
  // Check localStorage for login status
  // In production, this would check with backend/session
  const userData = localStorage.getItem('userLoggedIn');
  return userData === 'true';
}

/**
 * Set user login status
 * @param {boolean} status 
 */
function setLoginStatus(status) {
  localStorage.setItem('userLoggedIn', status ? 'true' : 'false');
  // Dispatch event to update UI
  window.dispatchEvent(new CustomEvent('authStatusChanged', { detail: { isLoggedIn: status } }));
}

/**
 * Get user data (if logged in)
 * @returns {object|null}
 */
function getUserData() {
  if (!isLoggedIn()) return null;
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

/**
 * Set user data
 * @param {object} data 
 */
function setUserData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}

/**
 * Logout user
 */
function logout() {
  localStorage.removeItem('userLoggedIn');
  localStorage.removeItem('userData');
  setLoginStatus(false);
}

/**
 * Check login and redirect if not logged in
 * @param {string} redirectPath - Path to redirect to if not logged in
 * @returns {boolean} - Returns true if logged in, false otherwise
 */
function requireLogin(redirectPath = '/login') {
  if (!isLoggedIn()) {
    window.location.href = redirectPath;
    return false;
  }
  return true;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isLoggedIn, setLoginStatus, getUserData, setUserData, logout, requireLogin };
}

// Make functions globally available
window.isLoggedIn = isLoggedIn;
window.setLoginStatus = setLoginStatus;
window.getUserData = getUserData;
window.setUserData = setUserData;
window.logout = logout;
window.requireLogin = requireLogin;
