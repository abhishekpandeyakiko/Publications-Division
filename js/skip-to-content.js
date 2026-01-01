/**
 * Skip to Main Content - Accessibility Enhancement
 * Handles skip to content functionality for both home and inner pages
 * - Home page: Skips slider, scrolls to announcement-bar section
 * - Inner pages: Skips intro-section, scrolls to content-section
 */

(function () {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkipToContent);
    } else {
        initSkipToContent();
    }

    // Re-initialize after page navigation (for SPA)
    window.addEventListener('pageLoaded', function() {
        setTimeout(initSkipToContent, 100);
    });

    function initSkipToContent() {
        setupSkipLinkHandler();
    }

    function setupSkipLinkHandler() {
        // Use event delegation to handle dynamically loaded skip links
        document.addEventListener('click', function(e) {
            const skipLink = e.target.closest('a.header-skipcontent[href="#main-content"]');
            
            if (skipLink) {
                e.preventDefault();
                
                // Check if we're on home page (has slider section)
                const sliderSection = document.querySelector('section.slider');
                const announcementBar = document.querySelector('section.announcement-bar');
                const introSection = document.querySelector('section.intro-section');
                const contentSection = document.querySelector('section.content-section');
                
                let targetElement = null;
                
                if (sliderSection) {
                    // Home page: Skip slider, scroll to announcement-bar
                    if (announcementBar) {
                        targetElement = announcementBar;
                    } else {
                        // Fallback to main-content if announcement-bar not found
                        targetElement = document.getElementById('main-content');
                    }
                } else if (introSection) {
                    // Inner page: Skip intro-section, scroll to content-section
                    if (contentSection) {
                        // Ensure content-section has id for accessibility
                        if (!contentSection.id) {
                            contentSection.id = 'main-content';
                        }
                        targetElement = contentSection;
                    } else {
                        // Fallback: find first section after intro-section
                        let nextSection = introSection.nextElementSibling;
                        while (nextSection && (
                            nextSection.nodeType !== 1 ||
                            nextSection.tagName === 'SCRIPT' ||
                            nextSection.tagName === 'STYLE'
                        )) {
                            nextSection = nextSection.nextElementSibling;
                        }
                        if (nextSection && nextSection.tagName === 'SECTION') {
                            if (!nextSection.id) {
                                nextSection.id = 'main-content';
                            }
                            targetElement = nextSection;
                        } else {
                            targetElement = document.getElementById('main-content');
                        }
                    }
                } else {
                    // Fallback: try to find main-content
                    targetElement = document.getElementById('main-content');
                }
                
                if (targetElement) {
                    // Make the element focusable if it's not already
                    if (!targetElement.hasAttribute('tabindex')) {
                        targetElement.setAttribute('tabindex', '-1');
                    }

                    // Smooth scroll to target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Set focus for screen readers and keyboard navigation
                    setTimeout(function() {
                        targetElement.focus();
                        // Remove focus outline after a moment for better UX
                        setTimeout(function() {
                            targetElement.blur();
                            targetElement.style.outline = 'none';
                        }, 2000);
                    }, 100);
                } else {
                    console.warn('Skip to content: Target element not found');
                }
            }
        });
    }
})();

