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
    button.addEventListener('click', function () {
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
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
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
    btn.addEventListener('click', function () {
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
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('.qty-input');
      if (input) {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
      }
    });
  });

  qtyInputs.forEach(input => {
    input.addEventListener('change', function () {
      const value = parseInt(this.value) || 1;
      if (value < 1) {
        this.value = 1;
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


// ---------------------------   add to Cart Section   ----------------------------------------------

// Quantity Controls
document.querySelectorAll('.quantity-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const input = this.parentElement.querySelector('input');
    const action = this.getAttribute('data-action');
    let value = parseInt(input.value);

    if (action === 'increase') {
      value++;
    } else if (action === 'decrease' && value > 1) {
      value--;
    }

    input.value = value;
    updateCartTotal();
  });
});

// Open Address Drawer
const addAddressBtn = document.getElementById('addAddressBtn');
const shippingAddress = document.getElementById('shippingAddress');
const addressDrawer = new bootstrap.Modal(document.getElementById('addressDrawer'));

if (addAddressBtn) {
  addAddressBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addressDrawer.show();
  });
}

if (shippingAddress) {
  shippingAddress.addEventListener('click', function () {
    addressDrawer.show();
  });
}

// Handle Form Submission
const addressForm = document.getElementById('addressForm');
if (addressForm) {
  addressForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
      fullName: document.getElementById('fullName').value,
      userName: document.getElementById('userName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      emailAddress: document.getElementById('emailAddress').value,
      addressLine: document.getElementById('addressLine').value,
      city: document.getElementById('city').value,
      postCode: document.getElementById('postCode').value,
      state: document.getElementById('state').value,
      country: document.getElementById('country').value
    };

    // Update shipping address display
    updateShippingAddress(formData);

    // Close modal
    addressDrawer.hide();

    // Reset form
    addressForm.reset();
  });
}

function updateShippingAddress(data) {
  const addressElement = document.getElementById('shippingAddress');
  if (addressElement) {
    addressElement.innerHTML = `
        <h6 class="mb-3 fw-bold">${data.fullName}</h6>
        <div class="mb-3">
          <p class="mb-2 small">
            <i class="fa-solid fa-phone me-2 text-muted"></i><span class="text-dark">${data.phoneNumber}</span>
          </p>
          <p class="mb-0 small">
            <i class="fa-solid fa-envelope me-2 text-muted"></i><span class="text-dark">${data.emailAddress}</span>
          </p>
        </div>
        <div class="pt-3 border-top">
          <p class="mb-2 small">
            <span class="text-muted">Address:</span> <span class="text-dark">${data.addressLine}</span>
          </p>
          <p class="mb-2 small">
            <span class="text-muted">City:</span> <span class="text-dark">${data.city}</span>
          </p>
          <p class="mb-2 small">
            <span class="text-muted">State:</span> <span class="text-dark">${data.state}</span>
          </p>
          <p class="mb-2 small">
            <span class="text-muted">Country:</span> <span class="text-dark">${data.country}</span>
          </p>
          <p class="mb-0 small">
            <span class="text-muted">Zip Code:</span> <span class="text-dark">${data.postCode}</span>
          </p>
        </div>
      `;
  }
}

function updateCartTotal() {
  // Calculate total based on quantities
  // This is a placeholder - implement actual calculation logic
  console.log('Cart total updated');
}

//--------------------------------------------- Frequntly ASK Question ------------------------------------------//

