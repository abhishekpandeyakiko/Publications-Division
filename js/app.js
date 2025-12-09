// Main Application Entry Point
// Initializes router which handles layout and page loading

/**
 * Initialize the application
 * Router will handle layout and page loading
 */
function initApp() {
  try {
    // Initialize router (it will handle layout and page loading)
    initializeRouter();

    // Initialize global event handlers
    setupGlobalEventHandlers();

    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Application initialization failed:', error);
  }
}

/**
 * Setup global event handlers
 */
function setupGlobalEventHandlers() {
  // Navigation is handled by LayoutManager's event delegation
  // This ensures it works with dynamically loaded content

  // Handle page-specific initialization events
  window.addEventListener('pageLoaded', handlePageLoad);
}

/**
 * Handle page load event
 * Executes page-specific initialization code
 */
function handlePageLoad(e) {
  const route = e.detail.route;
  
  // Execute route-specific initialization
  if (route && route.init) {
    route.init();
  }

  // Reinitialize common scripts that may need to run on each page
  initializeCommonScripts();
}

/**
 * Initialize common scripts that run on every page
 */
function initializeCommonScripts() {
  // Re-initialize Bootstrap components if needed
  if (typeof bootstrap !== 'undefined') {
    // Bootstrap components are auto-initialized, but can add manual init here if needed
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM is already ready
  initApp();
}

