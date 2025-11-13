// Layout Management System
// Handles loading and managing layout components (header, footer, sidebar)
class LayoutManager {
  constructor() {
    this.currentLayout = null;
    this.headerLoaded = false;
    this.footerLoaded = false;
    this.eventListenersAttached = false;
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
        await Promise.all([
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
    }
  }

  /**
   * Load header component
   */
  async loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) {
      console.warn('Header placeholder not found');
      return;
    }

    try {
      const response = await fetch('components/header.html');
      if (!response.ok) throw new Error('Failed to load header');
      
      const html = await response.text();
      headerPlaceholder.innerHTML = html;
      this.headerLoaded = true;
      
      // Initialize header-specific scripts after load
      this.initializeHeaderScripts();
    } catch (error) {
      headerPlaceholder.innerHTML = '<p class="text-danger">Header component failed to load.</p>';
      console.error('Header load error:', error);
      throw error;
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
      const response = await fetch('components/footer.html');
      if (!response.ok) throw new Error('Failed to load footer');
      
      const html = await response.text();
      footerPlaceholder.innerHTML = html;
      this.footerLoaded = true;
    } catch (error) {
      footerPlaceholder.innerHTML = '<p class="text-danger">Footer component failed to load.</p>';
      console.error('Footer load error:', error);
      throw error;
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

    // Language dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
          dropdown.textContent = item.textContent.trim();
        }
      });
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

