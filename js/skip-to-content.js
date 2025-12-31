/**
 * Skip to Main Content - Accessibility Enhancement
 * Automatically adds id="main-content" to the first content section after intro-section
 * This allows the "Skip to main content" link to work properly across all pages
 */

(function () {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkipToContent);
    } else {
        initSkipToContent();
    }

    function initSkipToContent() {
        // Check if main-content ID already exists
        if (document.getElementById('main-content')) {
            return; // Already set (like on home page)
        }

        // Find any intro-section (with any classes)
        const introSection = document.querySelector('section.intro-section');

        if (introSection) {
            // Get the next sibling element after intro-section
            let nextSection = introSection.nextElementSibling;

            // Skip any script, style, or comment nodes
            while (nextSection && (
                nextSection.nodeType !== 1 || // Not an element node
                nextSection.tagName === 'SCRIPT' ||
                nextSection.tagName === 'STYLE'
            )) {
                nextSection = nextSection.nextElementSibling;
            }

            // Add id="main-content" to the first content section after intro-section
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.id = 'main-content';
                console.log('Skip to content: main-content ID added to', nextSection);
            } else if (nextSection && nextSection.tagName === 'DIV') {
                // If it's a div container, add ID to it
                nextSection.id = 'main-content';
                console.log('Skip to content: main-content ID added to div', nextSection);
            }
        }
    }
})();
