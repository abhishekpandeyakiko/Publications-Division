// Auth Guard System
// Intercepts actions that require login and shows a popup

const AuthGuard = {
  modalId: 'auth-required-modal',

  init() {
    this.injectModal();
    this.attachEventListeners();
    console.log('AuthGuard initialized');
  },

  /**
   * Inject the modal HTML into the DOM
   */
  injectModal() {
    if (document.getElementById(this.modalId)) return;

    const modalHtml = `
      <div class="modal fade" id="${this.modalId}" tabindex="-1" aria-hidden="true" style="z-index: 10000;">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content text-center p-3 rounded-4 shadow">
            <div class="modal-body">
              <div class="mb-3 pt-2">
                <i class="fa-solid fa-lock fa-3x text-secondary"></i>
              </div>
              <h5 class="mb-2">Login Required</h5>
              <p class="text-muted small mb-4">You need to login to perform this action.</p>
              <div class="d-flex flex-column gap-2">
                <button class="btn btn-teal rounded-pill w-100" id="auth-guard-login-btn">
                  Login
                </button>
                <button class="btn btn-light rounded-pill w-100 text-muted" data-bs-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Attach handler for login button
    document.getElementById('auth-guard-login-btn').addEventListener('click', () => {
      // Hide modal
      const modalEl = document.getElementById(this.modalId);
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();

      // Navigate to login
      if (window.Router) {
        window.Router.navigate('/login');
      } else {
        window.location.href = '/login';
      }
    });
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    if (typeof window.isLoggedIn === 'function') {
      return window.isLoggedIn();
    }
    return localStorage.getItem('userLoggedIn') === 'true';
  },

  /**
   * Show the auth modal
   */
  showModal() {
    // Lazily inject if missing
    if (!document.getElementById(this.modalId)) {
      this.injectModal();
    }

    const modalEl = document.getElementById(this.modalId);
    if (modalEl) {
      try {
        // Try global bootstrap first, then window.bootstrap
        const bs = window.bootstrap || bootstrap;
        if (bs && bs.Modal) {
          const modal = new bs.Modal(modalEl);
          modal.show();
        } else {
          console.error('Bootstrap Modal API not found');
          // Fallback if bootstrap is completely missing? 
          // Unlikely given index.html, but good to know in console.
        }
      } catch (e) {
        console.error('Error showing AuthGuard modal:', e);
      }
    }
  },

  /**
   * Attach global event listeners with delegation
   */
  attachEventListeners() {
    document.body.addEventListener('click', (e) => {
      // Find closest button/link
      const target = e.target.closest('button, a');
      if (!target) return;

      // Check for Add to Cart buttons
      const isAddToCart = target.textContent.toLowerCase().includes('add to cart') ||
        target.querySelector('.fa-bag-shopping') ||
        target.classList.contains('cart-icon-link') ||
        target.querySelector('img[alt="Shopping Bag"]');

      // Check for Wishlist buttons
      const isWishlist = target.classList.contains('wishlist-btn') ||
        target.classList.contains('wishlist-btn-dec') ||
        target.classList.contains('wishlist-icon-link') ||
        target.querySelector('.fa-heart');

      // If either, and not logged in, intercept
      if ((isAddToCart || isWishlist) && !this.isLoggedIn()) {
        e.preventDefault();
        e.stopPropagation();
        this.showModal();
      }
    }, true); // Use capture phase to ensure we catch it before other listeners
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AuthGuard.init());
} else {
  AuthGuard.init();
}

// Export
window.AuthGuard = AuthGuard;
