// Layout Management System
// Handles loading and managing layout components (header, footer, sidebar)
class LayoutManager {
  constructor() {
    this.headerLoaded = false;
    this.footerLoaded = false;
    this.initialized = false;
  }

  /**
   * Initialize layout components
   * Loads header and footer asynchronously
   */
  async init() {
    if (this.initialized) return;
    
    try {
      await Promise.all([
        this.loadHeader(),
        this.loadFooter()
      ]);
      this.initialized = true;
      this.attachEventListeners();
    } catch (error) {
      console.error('Layout initialization failed:', error);
    }
  }

  /**
   * Load header component
   */
  async loadHeader() {
    if (this.headerLoaded) return;
    
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
    }
  }

  /**
   * Load footer component
   */
  async loadFooter() {
    if (this.footerLoaded) return;
    
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
   */
  attachEventListeners() {
    // Delay to ensure router is initialized
    setTimeout(() => {
      // Update all navigation links to use router
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        // Prevent duplicate listeners
        if (link.dataset.routerBound) return;
        link.dataset.routerBound = 'true';
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const path = link.getAttribute('href');
          if (window.Router) {
            window.Router.navigate(path);
          }
        });
      });

      // Update active nav link based on current route
      this.updateActiveNavLink();
    }, 100);
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

// Initialize layout manager
const layoutManager = new LayoutManager();

// Export for global access
window.LayoutManager = layoutManager;

