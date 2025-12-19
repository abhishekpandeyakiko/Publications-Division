// Layout Management System
// Handles loading and managing layout components (header, footer, sidebar)
class LayoutManager {
  constructor() {
    this.currentLayout = null;
    this.headerLoaded = false;
    this.footerLoaded = false;
    this.eventListenersAttached = false;
    this.basePath = this.getBasePath();
  }

  /**
   * Get base path for the application
   * Works whether app is at root or in a subdirectory
   */
  getBasePath() {
    // If we're in a subdirectory, get the path
    const path = window.location.pathname;
    // Remove the filename if present
    const pathParts = path.split('/').filter(p => p && !p.includes('.html'));
    // Base path is root if no path parts, otherwise use the first part
    return pathParts.length > 0 && !path.startsWith('/pages/') ? '' : '';
  }

  /**
   * Initialize layout based on layout name
   * @param {string} layoutName - Name of the layout ('default', 'minimal', 'auth', 'content-only', etc.)
   */
  async initLayout(layoutName) {
    this.currentLayout = layoutName;
    
    try {
      // Load components based on layout type
      if (layoutName === 'default') {
        // Default layout: header + footer
        // Load header and footer in parallel, but don't fail if one fails
        await Promise.allSettled([
          this.loadHeader(),
          this.loadFooter()
        ]);
        this.attachEventListeners();
      } else if (layoutName === 'auth') {
        // Auth layout: header only
        await this.loadHeader();
        this.attachEventListeners();
      } else if (layoutName === 'content-only') {
        // Content-only layout: default structure but no header/footer components
        // Has placeholder divs but doesn't load components
        // Hide the placeholder divs so they don't affect layout
        this.hidePlaceholders();
        this.attachEventListeners();
      } else if (layoutName === 'minimal') {
        // Minimal layout: no header/footer
        // Just attach event listeners for any dynamic content
        this.attachEventListeners();
      }
      // For 'none' layout, do nothing
    } catch (error) {
      console.error('Layout initialization failed:', error);
      // Continue even if layout initialization has issues
    }
  }

  /**
   * Load header component
   * Always reloads header to ensure it's fresh on each page
   */
  async loadHeader() {
    let headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) {
      console.warn('Header placeholder not found in DOM');
      // Try to find it again after a short delay
      await new Promise(resolve => setTimeout(resolve, 100));
      headerPlaceholder = document.getElementById('header-placeholder');
      if (!headerPlaceholder) {
        console.error('Header placeholder still not found after retry');
        return;
      }
    }

    // Always clear existing content to ensure fresh load
    headerPlaceholder.innerHTML = '';
    this.headerLoaded = false; // Reset flag to force reload

    try {
      // Try multiple path strategies to ensure header loads
      let response;
      const pathsToTry = [
        '/components/header.html',
        'components/header.html',
        './components/header.html',
        '../components/header.html'
      ];
      
      let lastError;
      let successfulPath = null;
      for (const path of pathsToTry) {
        try {
          response = await fetch(path);
          if (response.ok) {
            successfulPath = path;
            break;
          }
        } catch (err) {
          lastError = err;
          continue;
        }
      }
      
      if (!response || !response.ok) {
        throw new Error(`Failed to load header: ${lastError?.message || 'All paths failed'}`);
      }
      
      const html = await response.text();
      if (!html || html.trim().length === 0) {
        throw new Error('Header HTML is empty');
      }
      
      headerPlaceholder.innerHTML = html;
      
      // Ensure header placeholder is visible
      headerPlaceholder.style.display = 'block';
      headerPlaceholder.style.visibility = 'visible';
      
      this.headerLoaded = true;
      
      // Small delay to ensure DOM is updated
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Initialize header-specific scripts after load
      this.initializeHeaderScripts();
      
      // Verify header was actually inserted
      const headerContent = headerPlaceholder.querySelector('header, .header-section, .main-header01');
      if (!headerContent) {
        console.warn('Header HTML loaded but header element not found in content');
      } else {
        console.log(`Header loaded successfully from: ${successfulPath}`);
      }
    } catch (error) {
      headerPlaceholder.innerHTML = '<div class="alert alert-warning">Header component failed to load. Please refresh the page.</div>';
      console.error('Header load error:', error);
      // Don't throw - allow page to continue loading even if header fails
    }
  }

  /**
   * Load footer component
   */
  async loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
      console.warn('Footer placeholder not found');
      return;
    }

    try {
      // Try multiple path strategies to ensure footer loads
      let response;
      const pathsToTry = [
        '/components/footer.html',
        'components/footer.html',
        './components/footer.html',
        '../components/footer.html'
      ];
      
      let lastError;
      for (const path of pathsToTry) {
        try {
          response = await fetch(path);
          if (response.ok) {
            break;
          }
        } catch (err) {
          lastError = err;
          continue;
        }
      }
      
      if (!response || !response.ok) {
        throw new Error(`Failed to load footer: ${lastError?.message || 'All paths failed'}`);
      }
      
      const html = await response.text();
      footerPlaceholder.innerHTML = html;
      this.footerLoaded = true;
    } catch (error) {
      footerPlaceholder.innerHTML = '<p class="text-danger">Footer component failed to load.</p>';
      console.error('Footer load error:', error);
      // Don't throw - allow page to continue loading even if footer fails
    }
  }

  /**
   * Hide header and footer placeholders
   * Used for content-only layout
   */
  hidePlaceholders() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
      headerPlaceholder.style.display = 'none';
    }
    if (footerPlaceholder) {
      footerPlaceholder.style.display = 'none';
    }
  }

  /**
   * Initialize header-specific functionality
   * Runs after header is loaded
   */
  initializeHeaderScripts() {
    // Sidebar functionality
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    if (menuBtn && sidebar && overlay && closeBtn) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
      });

      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      });
    }

    // Initialize Bootstrap dropdowns
    if (typeof bootstrap !== 'undefined') {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggleEl => {
        new bootstrap.Dropdown(dropdownToggleEl);
      });
    }

    // Language dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
      const href = item.getAttribute('href');
      // Only handle language dropdown items (those without href or with #)
      if (!href || href === '#') {
        item.addEventListener('click', () => {
          const dropdown = document.getElementById('languageDropdown');
          if (dropdown) {
            dropdown.textContent = item.textContent.trim();
          }
        });
      }
    });

    // Ensure navigation event listeners are attached after header loads
    this.attachEventListeners();
    
    // Initialize header authentication UI
    if (typeof initHeaderAuth === 'function') {
      initHeaderAuth();
    }
    
    // Dispatch event for header loaded
    document.dispatchEvent(new CustomEvent('headerLoaded'));
  }

  /**
   * Attach navigation event listeners
   * Updates links to use router navigation
   * Only attaches once to prevent duplicate listeners
   */
  attachEventListeners() {
    // Only attach once
    if (this.eventListenersAttached) {
      this.updateActiveNavLink();
      return;
    }

    // Use event delegation for dynamic content
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        const path = link.getAttribute('href');
        if (window.Router) {
          window.Router.navigate(path);
        }
      }
    });

    this.eventListenersAttached = true;
    this.updateActiveNavLink();
  }

  /**
   * Update active navigation link
   */
  updateActiveNavLink() {
    const currentPath = window.location.pathname || '/';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Create layout manager instance
const layoutManager = new LayoutManager();

// Export for global access
window.LayoutManager = layoutManager;

