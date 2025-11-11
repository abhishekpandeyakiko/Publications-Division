// Main Application Entry Point
// Initializes router and layout system following best practices

/**
 * Initialize the application
 * Loads layout components first, then initializes routing
 */
async function initApp() {
  try {
    // Initialize layout (header, footer) first
    await window.LayoutManager.init();

    // Initialize router after layout is ready
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
  // Handle all internal navigation links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="/"]');
    if (link && link.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      const path = link.getAttribute('href');
      if (window.Router) {
        window.Router.navigate(path);
      }
    }
  });

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

