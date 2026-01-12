/**
 * Modern Loader Controller
 * Handles the display and hiding of the premium loader
 */

(function () {
    'use strict';

    // Create and inject loader HTML
    function createLoader() {
        if (document.getElementById('pageLoader')) return;

        const loaderHTML = `
            <div class="loader-overlay" id="pageLoader">
                <!-- Particles Background -->
                <div class="loader-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>

                <!-- Logo -->
                <div class="loader-logo">
                    <img src="images/Logo.svg" alt="Publications Division Logo">
                </div>

                <!-- Title -->
                <h2 class="loader-title">Publications Division</h2>
                <p class="loader-subtitle">Ministry of Information & Broadcasting</p>

                <!-- Book Loader Animation -->
                <div class="book-loader">
                    <div class="book"></div>
                    <div class="book"></div>
                    <div class="book"></div>
                </div>

                <!-- Progress Bar -->
                <div class="loader-progress">
                    <div class="loader-progress-bar"></div>
                </div>

                <!-- Loading Text -->
                <div class="loader-text">Loading...</div>
            </div>
        `;

        // Insert loader at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    }

    // Hide loader with smooth transition
    function hideLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');

            // Remove from DOM after transition
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }

    // Show loader
    function showLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.remove('hidden');
        }
    }

    // Initialize loader
    function initLoader() {
        // Create loader on page load
        createLoader();

        // Hide loader when page is fully loaded
        window.addEventListener('load', function () {
            // Add a minimum display time for better UX (optional)
            setTimeout(hideLoader, 800);
        });

        // Fallback: Hide loader after maximum time
        setTimeout(function () {
            hideLoader();
        }, 5000);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

    // Expose functions globally for manual control if needed

    window.loaderControl = {
        create: createLoader,
        show: showLoader,
        hide: hideLoader
    };

})();
