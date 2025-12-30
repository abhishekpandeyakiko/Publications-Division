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

    // Initialize Accessibility Sidebar
    this.initAccessibility();

    // Dispatch event for header loaded
    document.dispatchEvent(new CustomEvent('headerLoaded'));
  }

  /**
   * Initialize Accessibility Sidebar functionality
   */
  initAccessibility() {
    const accessBtn = document.getElementById('accessibilityIconBtn');
    const accessSidebar = document.getElementById('accessibility-sidebar');
    const closeAccessBtn = document.getElementById('closeAccessBtn');
    // We can reuse the existing overlay or create a specific one. 
    // Using the same overlay might conflict if we want different behaviors, 
    // but for simplicity, let's reuse #overlay if it works for both.
    // However, the existing overlay closes #sidebar. Let's make it close both.
    const overlay = document.getElementById('overlay');

    if (accessBtn && accessSidebar) {
      accessBtn.addEventListener('click', (e) => {
        e.preventDefault();
        accessSidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
      });
    }

    if (closeAccessBtn && accessSidebar) {
      closeAccessBtn.addEventListener('click', () => {
        accessSidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
      });
    }

    // Update overlay click to close access sidebar too
    if (overlay) {
      // Remove old listener if possible or just add new one that handles both
      // Since we can't easily remove anonymous listeners, we'll just add one that ensures clean up
      overlay.addEventListener('click', () => {
        if (accessSidebar) accessSidebar.classList.remove('active');
      });
    }

    // Font Resize Logic
    let currentFontSize = 100; // Percentage
    const setFontSize = (size) => {
      currentFontSize = size;
      document.body.style.fontSize = size + '%';
      // Also scale specific elements if needed
    };

    document.getElementById('decreaseFont')?.addEventListener('click', () => {
      if (currentFontSize > 80) setFontSize(currentFontSize - 10);
    });

    document.getElementById('resetFont')?.addEventListener('click', () => {
      setFontSize(100);
    });

    document.getElementById('increaseFont')?.addEventListener('click', () => {
      if (currentFontSize < 130) setFontSize(currentFontSize + 10);
    });

    // Theme Selection Logic
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        themeBtns.forEach(b => b.classList.remove('active-theme'));
        // Add to clicked
        btn.classList.add('active-theme');

        // Apply theme
        const theme = btn.getAttribute('data-theme');
        document.body.classList.remove('theme-dark', 'theme-yellow', 'theme-light');

        if (theme !== 'default') {
          document.body.classList.add(`theme-${theme}`);
        }
      });
    });


    // Line Height Logic
    const spacingBtns = document.querySelectorAll('.spacing-btn');
    const setSpacing = (type) => {
      document.body.classList.remove('spacing-tight', 'spacing-loose');
      spacingBtns.forEach(b => b.classList.remove('active-spacing'));

      if (type === 'tight') {
        document.body.classList.add('spacing-tight');
        document.getElementById('tightHeight')?.classList.add('active-spacing');
      } else if (type === 'loose') {
        document.body.classList.add('spacing-loose');
        document.getElementById('looseHeight')?.classList.add('active-spacing');
      } else {
        document.getElementById('normalHeight')?.classList.add('active-spacing');
      }
    };

    document.getElementById('tightHeight')?.addEventListener('click', () => setSpacing('tight'));
    document.getElementById('normalHeight')?.addEventListener('click', () => setSpacing('normal'));
    document.getElementById('looseHeight')?.addEventListener('click', () => setSpacing('loose'));

    // Text Alignment Logic
    const alignBtns = document.querySelectorAll('.align-btn');
    const setAlignment = (type) => {
      document.body.classList.remove('text-align-left', 'text-align-center', 'text-align-end');
      alignBtns.forEach(b => b.classList.remove('active-align'));

      if (type === 'center') {
        document.body.classList.add('text-align-center');
        document.getElementById('alignCenter')?.classList.add('active-align');
      } else if (type === 'right') {
        document.body.classList.add('text-align-end');
        document.getElementById('alignRight')?.classList.add('active-align');
      } else {
        // Default is left
        document.body.classList.add('text-align-left');
        document.getElementById('alignLeft')?.classList.add('active-align');
      }
    };

    document.getElementById('alignLeft')?.addEventListener('click', () => setAlignment('left'));
    document.getElementById('alignCenter')?.addEventListener('click', () => setAlignment('center'));
    document.getElementById('alignRight')?.addEventListener('click', () => setAlignment('right'));


    // Visual Options Logic
    const toggleVisualOption = (btnId, bodyClass) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isActive = document.body.classList.toggle(bodyClass);
        btn.classList.toggle('active-visual', isActive);
      });
    };

    toggleVisualOption('hideImagesBtn', 'hide-images');
    toggleVisualOption('highlightLinksBtn', 'highlight-links');


    // Global Reset Button Logic
    document.getElementById('resetAccessibility')?.addEventListener('click', () => {
      // Reset Font
      setFontSize(100);

      // Reset Spacing
      setSpacing('normal');

      // Reset Alignment
      setAlignment('left');

      // Reset Visual Options
      document.body.classList.remove('hide-images', 'highlight-links');
      ['hideImagesBtn', 'highlightLinksBtn'].forEach(id => {
        document.getElementById(id)?.classList.remove('active-visual');
      });

      // Reset Theme
      document.body.classList.remove('theme-dark', 'theme-yellow', 'theme-light');

      // Reset Theme Buttons UI
      const themeBtns = document.querySelectorAll('.theme-btn');
      themeBtns.forEach(b => b.classList.remove('active-theme'));

      // Set default theme as active
      const defaultThemeBtn = document.querySelector('.theme-btn.default-theme');
      if (defaultThemeBtn) defaultThemeBtn.classList.add('active-theme');
    });
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
    // Get current path from Router if available, otherwise from hash
    let currentPath = '/';

    if (window.Router && window.Router.getCurrentRoute()) {
      currentPath = window.Router.getCurrentRoute().path;
    } else {
      // Fallback: parse hash manually
      const hash = window.location.hash.slice(1); // Remove '#'
      if (hash) {
        currentPath = hash.startsWith('/') ? hash : '/' + hash;
      }
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
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

