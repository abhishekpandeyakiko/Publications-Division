// Router Module
// Client-side routing system with layout support
class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.currentLayout = null;
    this.appContainer = document.body;
    this.init();
  }

  /**
   * Initialize router
   */
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', (e) => {
      this.handleRoute(this.getHashPath());
    });

    // Handle initial route
    this.handleRoute(this.getHashPath());
  }

  /**
   * Get clean path from hash
   * Converts '#/' or '' to '/' and '#/about' to '/about'
   */
  getHashPath() {
    const hash = window.location.hash.slice(1); // Remove '#'
    // If empty or just '/', return '/'
    if (!hash || hash === '/') return '/';
    // Ensure it starts with /
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  /**
   * Handle route navigation
   * @param {string} path - Route path to navigate to
   */
  async handleRoute(path) {
    try {
      // Strip query parameters for route matching
      const cleanPath = path.split('?')[0];
      
      // Check if getRouteByPath is available
      if (typeof getRouteByPath === 'undefined') {
        console.error('getRouteByPath function not found. Make sure routes.js is loaded before router.js');
        return;
      }
      
      const route = getRouteByPath(cleanPath);
      
      // Debug logging
      console.log(`Router: Handling path "${cleanPath}", found route:`, route);
      
      // Check if route was found
      if (!route) {
        console.warn(`Route not found for path: ${cleanPath}`);
        this.navigate('/404');
        return;
      }
      
      // Check if it's the notFound route
      if (typeof Routes !== 'undefined' && Routes.notFound && route.path === Routes.notFound.path) {
        // Only redirect if we are not already on the 404 path to avoid loops
        if (cleanPath !== '/404') {
             console.warn(`Route not found for path: ${cleanPath}, redirecting to 404`);
             this.navigate('/404');
        }
        return;
      }

      // Update document title
      document.title = route.title || 'Publications Division';

      // Determine layout (default to 'default' if not specified)
      const layout = route.layout || 'default';

      // Load layout and page
      await this.loadLayoutAndPage(layout, route.page);

      // Update current route and layout
      this.currentRoute = route;
      this.currentLayout = layout;

      // Update active nav link (only if layout manager exists)
      if (window.LayoutManager && layout !== 'none') {
        window.LayoutManager.updateActiveNavLink();
      }

      // Execute page-specific scripts
      this.executePageScripts();
      
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Route handling error:', error);
      // Only navigate to 404 if not already there
      if (path !== '/404') {
          this.navigate('/404');
      }
    }
  }

  /**
   * Load layout template and page content
   * @param {string} layoutName - Name of the layout (or 'none' for no layout)
   * @param {string} pagePath - Path to page HTML file
   */
  async loadLayoutAndPage(layoutName, pagePath) {
    try {
      // If layout is 'none', load page directly into body
      if (layoutName === 'none') {
        const pageHtml = await this.fetchPage(pagePath);
        // Extract body content if it's a full HTML document
        const bodyContent = this.extractBodyContent(pageHtml);
        this.appContainer.innerHTML = bodyContent;
        return;
      }

      // Load layout template
      const layoutPath = `layouts/${layoutName}.html`;
      const layoutHtml = await this.fetchPage(layoutPath);
      
      // Replace body content with layout
      this.appContainer.innerHTML = layoutHtml;

      // Find content container in layout
      const contentContainer = document.getElementById('app-content');
      if (!contentContainer) {
        throw new Error(`Layout '${layoutName}' must contain an element with id="app-content"`);
      }

      // Initialize layout components (header, footer, etc.) FIRST
      // This ensures header is loaded before page content
      if (window.LayoutManager) {
        await window.LayoutManager.initLayout(layoutName);
        
        // Verify header was loaded (for default and auth layouts)
        if (layoutName === 'default' || layoutName === 'auth') {
          const headerPlaceholder = document.getElementById('header-placeholder');
          if (headerPlaceholder) {
            const hasHeaderContent = headerPlaceholder.querySelector('header, .header-section, .main-header01');
            if (!hasHeaderContent) {
              console.warn('Header placeholder exists but header content not found. Retrying...');
              // Retry loading header
              await window.LayoutManager.loadHeader();
            }
          }
        }
      }

      // Load page content into layout AFTER header is loaded
      const pageHtml = await this.fetchPage(pagePath);
      const pageContent = this.extractBodyContent(pageHtml);
      contentContainer.innerHTML = pageContent;

    } catch (error) {
      console.error('Layout/Page load error:', error);
      this.appContainer.innerHTML = `
        <div class="container py-5 text-center">
          <h2>Page Load Error</h2>
          <p>Unable to load the requested page.</p>
          <a href="#/" class="btn btn-primary">Return Home</a>
        </div>
      `;
      throw error;
    }
  }

  /**
   * Fetch page content
   * @param {string} path - Path to HTML file
   * @returns {Promise<string>} HTML content
   */
  async fetchPage(path) {
    // Ensure path is absolute (starts with /) to work from any route
    let absolutePath = path.startsWith('/') ? path : `/${path}`;
    let response = await fetch(absolutePath);
    
    // If root-relative path fails, try relative path
    if (!response.ok && path.startsWith('/')) {
      absolutePath = path.substring(1); // Remove leading slash
      response = await fetch(absolutePath);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  }

  /**
   * Extract body content from HTML
   * Handles both full HTML documents and content fragments
   * Also extracts style and script tags from head if present
   * @param {string} html - HTML string
   * @returns {string} Body content with styles/scripts
   */
  extractBodyContent(html) {
    // Check if it's a full HTML document
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      let bodyContent = bodyMatch[1];
      
      // Extract style tags from head (page-specific styles)
      const headMatch = html.match(/<head[^>]*>([\s\S]*)<\/head>/i);
      if (headMatch) {
        const headContent = headMatch[1];
        const styleMatch = headContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
        if (styleMatch) {
          bodyContent = styleMatch.join('') + bodyContent;
        }
      }
      
      return bodyContent;
    }
    // Otherwise, return as-is (content fragment)
    return html;
  }

  /**
   * Navigate to a new route
   * @param {string} path - Route path (can include query parameters)
   */
  navigate(path) {
    // Just setting the hash triggers the hashchange event which calls handleRoute
    window.location.hash = path;
  }

  /**
   * Execute page-specific JavaScript
   * Looks for scripts in the loaded page content
   */
  executePageScripts() {
    // Find content container (could be in layout or body)
    const contentContainer = document.getElementById('app-content') || document.body;
    
    // Find and execute any script tags in the loaded content
    const scripts = contentContainer.querySelectorAll('script');
    
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
      detail: { route: this.currentRoute, layout: this.currentLayout }
    }));

    // Call route-specific initialization if it exists
    if (this.currentRoute && this.currentRoute.init && typeof this.currentRoute.init === 'function') {
      this.currentRoute.init();
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

