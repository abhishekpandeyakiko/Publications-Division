// Profile Dashboard Script
// Handles tab switching and mobile sidebar toggle

/**
 * Initialize profile dashboard
 */
function initProfileDashboard() {
  setupTabSwitching();
  setupMobileSidebar();
  setupQuantityControls();
  setupWishlistActions();
  handleURLSection();
}

/**
 * Setup tab switching functionality
 */
function setupTabSwitching() {
  const navButtons = document.querySelectorAll('.nav-item-btn');
  const sections = document.querySelectorAll('.profile-section');

  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
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
      }
      
      // Close mobile sidebar if open
      const sidebar = document.querySelector('.profile-sidebar');
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });
}

/**
 * Setup mobile sidebar toggle
 */
function setupMobileSidebar() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.profile-sidebar');
  const overlay = document.querySelector('.profile-overlay');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
      if (window.innerWidth < 992) {
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
          }
        }
      }
    });
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
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.qty-input');
      if (input) {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
        }
      }
    });
  });

  plusButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.qty-input');
      if (input) {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
      }
    });
  });

  qtyInputs.forEach(input => {
    input.addEventListener('change', function() {
      const value = parseInt(this.value) || 1;
      if (value < 1) {
        this.value = 1;
      }
    });
  });
}

/**
 * Setup wishlist actions
 */
function setupWishlistActions() {
  const removeButtons = document.querySelectorAll('.wishlist-remove-btn');
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

  removeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const wishlistItem = this.closest('.wishlist-item');
      if (wishlistItem) {
        // Add fade out animation
        wishlistItem.style.transition = 'opacity 0.3s';
        wishlistItem.style.opacity = '0';
        setTimeout(() => {
          wishlistItem.remove();
        }, 300);
      }
    });
  });

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const wishlistItem = this.closest('.wishlist-item');
      const productName = wishlistItem?.querySelector('.product-name')?.textContent;
      const quantity = wishlistItem?.querySelector('.qty-input')?.value || 1;
      const buttonText = this.textContent.trim();
      
      // Check if it's a checkout button (cart) or add to cart button (wishlist)
      if (buttonText.includes('Checkout')) {
        // Checkout functionality for cart
        alert(`Proceeding to checkout with ${quantity} item(s): ${productName}`);
      } else {
        // Add to cart functionality for wishlist
        alert(`Added ${quantity} item(s) to cart: ${productName}`);
      }
    });
  });
}

/**
 * Handle URL section parameter
 */
function handleURLSection() {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  
  if (section) {
    // Map 'cart' to 'cart' section (which we'll add)
    const sectionMap = {
      'cart': 'cart',
      'wishlist': 'wishlist'
    };
    
    const targetSection = sectionMap[section] || section;
    const navButton = document.querySelector(`[data-section="${targetSection}"]`);
    if (navButton) {
      navButton.click();
    } else {
      // If section doesn't exist, show profile
      const profileBtn = document.querySelector('[data-section="profile"]');
      if (profileBtn) {
        profileBtn.click();
      }
    }
  }
}

/**
 * Address management functions
 */
function editAddress(id) {
  // In production, load address data and populate form
  const modal = new bootstrap.Modal(document.getElementById('addAddressModal'));
  document.getElementById('addAddressModalLabel').textContent = 'Edit Address';
  modal.show();
}

function setDefaultAddress(id) {
  // In production, make API call to set default address
  alert(`Address ${id} set as default`);
  location.reload();
}

function deleteAddress(id) {
  if (confirm('Are you sure you want to delete this address?')) {
    // In production, make API call to delete address
    alert(`Address ${id} deleted`);
    location.reload();
  }
}

function saveAddress() {
  const form = document.getElementById('addressForm');
  if (form.checkValidity()) {
    // In production, make API call to save address
    alert('Address saved successfully!');
    const modal = bootstrap.Modal.getInstance(document.getElementById('addAddressModal'));
    modal.hide();
    form.reset();
    location.reload();
  } else {
    form.reportValidity();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProfileDashboard);
} else {
  initProfileDashboard();
}
