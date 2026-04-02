// Profile Dashboard Script
// Handles tab switching and mobile sidebar toggle

/**
 * Initialize profile dashboard
 * This is called every time the profile page is loaded or re-rendered by the router
 */
function initProfileDashboard() {
  // Prevent double initialization
  if (window.profileDashboardInitialized) {
    console.log('Profile Dashboard already initializing or initialized, skipping...');
    // Still try to activate the section just in case
    handleURLSection();
    return;
  }
  
  window.profileDashboardInitialized = true;
  console.log('Initializing Profile Dashboard...');
  
  setupTabSwitching();
  setupMobileSidebar();
  setupQuantityControls();
  setupCartActions();
  handleURLSection();
  setupModalRelocation();
  setupReviewModal();

  // Reset initialization flag after a short delay to allow future router navigations
  setTimeout(() => {
    window.profileDashboardInitialized = false;
  }, 1000);
}

/**
 * Setup tab switching functionality
 */
function setupTabSwitching() {
  const navButtons = document.querySelectorAll('.nav-item-btn');
  const sections = document.querySelectorAll('.profile-section');

  if (!navButtons.length) return;

  navButtons.forEach(button => {
    // Remove existing listener to avoid duplicates if re-injected
    button.onclick = function () {
      const targetSection = this.getAttribute('data-section');
      if (!targetSection) return;

      console.log('Switching to section:', targetSection);

      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      // Hide all sections
      sections.forEach(section => section.classList.remove('active'));

      // Show target section
      const targetElement = document.getElementById(targetSection + 'Section');
      if (targetElement) {
        targetElement.classList.add('active');
        // Scroll to top of content area on mobile
        if (window.innerWidth < 992) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      // Close mobile sidebar if open
      const sidebar = document.querySelector('.profile-sidebar');
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    };
  });
}

/**
 * Setup mobile sidebar toggle
 */
function setupMobileSidebar() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.profile-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.onclick = function () {
      sidebar.classList.toggle('mobile-open');
    };

    document.onclick = function (e) {
      if (window.innerWidth < 992) {
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
          }
        }
      }
    };
  }
}

/**
 * Setup quantity controls
 */
function setupQuantityControls() {
  const minusButtons = document.querySelectorAll('.qty-btn.minus');
  const plusButtons = document.querySelectorAll('.qty-btn.plus');
  const qtyInputs = document.querySelectorAll('.qty-input');

  minusButtons.forEach(btn => {
    btn.onclick = function () {
      const input = this.parentElement.querySelector('.qty-input');
      if (input) {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
        }
      }
    };
  });

  plusButtons.forEach(btn => {
    btn.onclick = function () {
      const input = this.parentElement.querySelector('.qty-input');
      if (input) {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
      }
    };
  });

  qtyInputs.forEach(input => {
    input.onchange = function () {
      const value = parseInt(this.value) || 1;
      if (value < 1) {
        this.value = 1;
      }
    };
  });
}

/**
 * Handle URL section parameter with retry mechanism to ensure DOM readiness
 */
function handleURLSection() {
  let retryCount = 0;
  const maxRetries = 12; // ~2 seconds total

  const parseAndActivate = () => {
    // 1. Check global "forced" state FIRST (the most reliable handoff)
    let section = window.forceProfileSection;
    
    // 2. Fallback to URL parsing
    if (!section) {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl.replace('#/', '/'));
      if (url.searchParams.has('section')) {
        section = url.searchParams.get('section');
      } else {
        const hashPart = window.location.hash;
        if (hashPart.includes('section=')) {
          section = hashPart.split('section=')[1].split('&')[0];
        }
      }
    }

    if (section) {
      console.log('Target Section detected:', section);
      const navButton = document.querySelector(`.nav-item-btn[data-section="${section}"]`);
      if (navButton) {
        // Clear global state to consume it
        window.forceProfileSection = null;
        
        // Force activation
        navButton.click();
        return true; // Activated successfully
      }
    }
    return false; // Not ready or no section found
  };

  const attemptActivation = () => {
    const success = parseAndActivate();
    if (!success && retryCount < maxRetries) {
      retryCount++;
      setTimeout(attemptActivation, 150);
    }
  };

  attemptActivation();
}

/**
 * Setup Add to Cart and Address management logic
 */
function setupCartActions() {
  // Quantity Controls in Cart section
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.onclick = function () {
      const input = this.parentElement.querySelector('input');
      const action = this.getAttribute('data-action');
      if (!input) return;

      let value = parseInt(input.value);
      if (action === 'increase') {
        value++;
      } else if (action === 'decrease' && value > 1) {
        value--;
      }
      input.value = value;
    };
  });
}

/**
 * Relocate modals to body to fix backdrop/stacking context issues
 */
function setupModalRelocation() {
  const modalIds = ['rtlModal', 'addAddressModal', 'shippingaddAddressModal', 'reviewModal'];
  
  modalIds.forEach(id => {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      // Listen for the native Bootstrap show event
      modalEl.addEventListener('show.bs.modal', function () {
        if (this.parentElement !== document.body) {
          document.body.appendChild(this);
        }
      });
    }
  });
}

/**
 * Setup Review Modal star rating logic
 */
function setupReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (!modal) return;

  const stars = modal.querySelectorAll('.stars-input input');
  const caption = modal.querySelector('#ratingCaption');
  const captions = {
    '5': 'Excellent! Love it.',
    '4': 'Very Good!',
    '3': 'Good Experience.',
    '2': 'Could be better.',
    '1': 'Not satisfied.'
  };

  stars.forEach(star => {
    // Use onclick or addEventListener
    star.addEventListener('change', function () {
      if (caption) {
        caption.textContent = captions[this.value] || 'Select star rating';
      }
    });
  });

  // Image upload preview logic
  const fileInput = modal.querySelector('#reviewImages');
  const previewContainer = modal.querySelector('#imagePreview');
  
  if (fileInput && previewContainer) {
    fileInput.onchange = function() {
      previewContainer.innerHTML = ''; // Clear previous
      const files = Array.from(this.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const div = document.createElement('div');
          div.className = 'gallery-item-orb rounded-3 border overflow-hidden';
          div.style.width = '60px';
          div.style.height = '60px';
          div.innerHTML = `<img src="${e.target.result}" class="img-fluid" style="width:100%; height:100%; object-fit:cover;">`;
          previewContainer.appendChild(div);
        };
        reader.readAsDataURL(file);
      });
    };
  }
}

/**
 * Global Address management functions
 */
window.editAddress = function(id) {
  console.log('editAddress triggered for ID:', id);
  const modalEl = document.getElementById('addAddressModal') || document.getElementById('shippingaddAddressModal');
  
  if (modalEl) {
    // Relocate to body immediately for manual triggers
    if (modalEl.parentElement !== document.body) {
      document.body.appendChild(modalEl);
    }
    
    // Update title
    const title = modalEl.querySelector('.modal-title') || modalEl.querySelector('h4') || modalEl.querySelector('h5');
    if (title) title.textContent = 'Edit Address';
    
    // Ensure native backdrop doesn't cover UI
    modalEl.style.zIndex = '10001';
    
    // Show using bootstrap
    const bs = window.bootstrap || bootstrap;
    if (bs) {
      let modalInst = bs.Modal.getInstance(modalEl);
      if (!modalInst) modalInst = new bs.Modal(modalEl);
      modalInst.show();
    }
  }
};

window.setDefaultAddress = function(id) {
  alert(`Address ${id} has been set as default.`);
};

window.deleteAddress = function(id) {
  if (confirm('Delete this address?')) {
    alert(`Address ${id} deleted.`);
  }
};

// Start logic
if (document.readyState !== 'loading') {
  initProfileDashboard();
} else {
  document.addEventListener('DOMContentLoaded', initProfileDashboard);
}

// Global pageLoaded check
window.addEventListener('pageLoaded', (e) => {
  if (e.detail && e.detail.route && e.detail.route.path === '/user-profile') {
    initProfileDashboard();
  }
});
