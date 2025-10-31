// Router Module
// Client-side routing system with layout support
class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.contentContainer = null;
    this.init();
  }

  /**
   * Initialize router
   */
  init() {
    this.contentContainer = document.getElementById('app-content');
    if (!this.contentContainer) {
      console.error('Content container (#app-content) not found');
      return;
    }

    // Listen for browser navigation (back/forward buttons)
    window.addEventListener('popstate', (e) => {
      this.handleRoute(window.location.pathname);
    });

    // Handle initial route
    this.handleRoute(window.location.pathname || '/');
  }

  /**
   * Handle route navigation
   * @param {string} path - Route path to navigate to
   */
  async handleRoute(path) {
    try {
      const route = getRouteByPath(path);
      
      if (!route) {
        this.navigate('/404');
        return;
      }

      // Update document title
      document.title = route.title || 'Publications Division';

      // Load page content
      await this.loadPage(route.page);

      // Update current route
      this.currentRoute = route;

      // Update URL without page reload (if different)
      if (window.location.pathname !== route.path) {
        window.history.pushState({ route: route.path }, '', route.path);
      }

      // Update active nav link
      if (window.LayoutManager) {
        window.LayoutManager.updateActiveNavLink();
      }

      // Execute page-specific scripts
      this.executePageScripts();
      
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Route handling error:', error);
      this.navigate('/404');
    }
  }

  /**
   * Load page content
   * @param {string} pagePath - Path to page HTML file
   */
  async loadPage(pagePath) {
    try {
      const response = await fetch(pagePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load page: ${response.statusText}`);
      }

      const html = await response.text();
      this.contentContainer.innerHTML = html;

    } catch (error) {
      console.error('Page load error:', error);
      this.contentContainer.innerHTML = `
        <div class="container py-5 text-center">
          <h2>Page Load Error</h2>
          <p>Unable to load the requested page.</p>
          <a href="/" class="btn btn-primary">Return Home</a>
        </div>
      `;
      throw error;
    }
  }

  /**
   * Navigate to a new route
   * @param {string} path - Route path
   */
  navigate(path) {
    this.handleRoute(path);
  }

  /**
   * Execute page-specific JavaScript
   * Looks for scripts in the loaded page content
   */
  executePageScripts() {
    // Find and execute any script tags in the loaded content
    const scripts = this.contentContainer.querySelectorAll('script');
    
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    // Trigger custom event for page-specific initialization
    window.dispatchEvent(new CustomEvent('pageLoaded', {
      detail: { route: this.currentRoute }
    }));

    // Call page-specific initialization if it exists
    if (this.currentRoute && this.currentRoute.path === '/' && typeof window.initHomePage === 'function') {
      window.initHomePage();
    }
  }

  /**
   * Get current route
   * @returns {Object} Current route object
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Initialize router function
function initializeRouter() {
  if (typeof Routes === 'undefined') {
    console.error('Routes configuration not found');
    return;
  }

  // Prevent double initialization
  if (window.Router) {
    console.warn('Router already initialized');
    return;
  }

  window.Router = new Router(Routes);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}

// Make initializeRouter available globally
window.initializeRouter = initializeRouter;

