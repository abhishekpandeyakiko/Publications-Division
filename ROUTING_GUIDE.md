# Routing Structure & Best Practices Guide

## Overview

This project implements a clean, modular routing structure with a layout system using vanilla JavaScript. The architecture follows best coding practices including separation of concerns, DRY principles, and modular design.

## Architecture

### File Structure

```
Publications-Division/
├── index.html              # Main entry point with layout structure
├── pages/                  # Page content files
│   ├── home.html
│   ├── buy.html
│   ├── about.html
│   ├── publications.html
│   ├── feedback.html
│   ├── documents.html
│   ├── business.html
│   ├── submit.html
│   ├── view-more.html
│   ├── whos-who.html
│   └── 404.html
├── components/             # Reusable components
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
└── js/
    ├── routes.js          # Route configuration
    ├── router.js          # Router implementation
    ├── layout.js          # Layout manager
    ├── app.js             # Application entry point
    └── page-scripts.js    # Page-specific scripts
```

## Components

### 1. Route Configuration (`js/routes.js`)

**Purpose**: Centralized route definitions following the Single Source of Truth principle.

**Best Practices**:
- ✅ All routes defined in one place for easy maintenance
- ✅ Route metadata (title, path, page file) together
- ✅ Helper functions for route lookup
- ✅ Clean, readable structure

**Usage**:
```javascript
const Routes = {
  home: {
    path: '/',
    page: 'pages/home.html',
    title: 'Home - Publications Division'
  },
  // ... more routes
};
```

### 2. Router Module (`js/router.js`)

**Purpose**: Handles client-side routing and page navigation.

**Best Practices**:
- ✅ Class-based architecture for encapsulation
- ✅ Async/await for clean asynchronous code
- ✅ Error handling with try-catch
- ✅ Browser history API integration
- ✅ Automatic script execution for loaded pages
- ✅ Scroll to top on navigation

**Key Features**:
- Browser back/forward button support
- URL updates without page reload
- Dynamic page loading
- Page-specific script execution

### 3. Layout Manager (`js/layout.js`)

**Purpose**: Manages layout components (header, footer) and common functionality.

**Best Practices**:
- ✅ Separation of layout from page content
- ✅ Async component loading
- ✅ Event delegation for dynamic content
- ✅ Prevents duplicate event listeners
- ✅ Reusable across all pages

**Key Features**:
- Loads header and footer asynchronously
- Initializes sidebar functionality
- Updates active navigation links
- Binds navigation links to router

### 4. Application Entry Point (`js/app.js`)

**Purpose**: Initializes the entire application in the correct order.

**Best Practices**:
- ✅ Proper initialization sequence
- ✅ Error handling for initialization
- ✅ Global event handler setup
- ✅ Clean separation of concerns

**Initialization Flow**:
1. Load layout components (header, footer)
2. Initialize router
3. Setup global event handlers
4. Handle page-specific initialization

### 5. Page Scripts (`js/page-scripts.js`)

**Purpose**: Page-specific functionality that needs to run on certain pages.

**Best Practices**:
- ✅ Modular functions for each feature
- ✅ Null checks before DOM manipulation
- ✅ Clean, reusable code
- ✅ Separation by page/feature

## Best Coding Practices Implemented

### 1. **Separation of Concerns**
- Layout logic separated from routing logic
- Page content separated from layout
- Scripts organized by responsibility

### 2. **DRY (Don't Repeat Yourself)**
- Layout components loaded once and reused
- Common functionality in shared modules
- Route configuration in single location

### 3. **Single Responsibility Principle**
- Each module has one clear purpose
- Functions do one thing well
- Easy to test and maintain

### 4. **Modular Architecture**
- Small, focused files (under 200-300 lines)
- Easy to locate and modify code
- Clear dependencies

### 5. **Error Handling**
- Try-catch blocks for async operations
- Graceful fallbacks for failed loads
- User-friendly error messages

### 6. **Performance Optimization**
- Async loading of components
- Event delegation for dynamic content
- Prevents duplicate listeners

### 7. **Code Organization**
- Logical file structure
- Consistent naming conventions
- Clear comments and documentation

### 8. **Maintainability**
- Easy to add new routes
- Easy to modify existing routes
- Clear code structure

## Adding New Routes

### Step 1: Add Route to Configuration

Edit `js/routes.js`:
```javascript
const Routes = {
  // ... existing routes
  newPage: {
    path: '/new-page',
    page: 'pages/new-page.html',
    title: 'New Page - Publications Division'
  }
};
```

### Step 2: Create Page File

Create `pages/new-page.html`:
```html
<!-- New Page Content -->
<section class="container py-5">
    <div class="row">
        <div class="col-12">
            <h1 class="mb-4">New Page</h1>
            <p class="lead">Page content here.</p>
        </div>
    </div>
</section>
```

### Step 3: Update Navigation

Edit `components/header.html`:
```html
<li class="nav-item">
    <a class="nav-link" href="/new-page">New Page</a>
</li>
```

## Usage Examples

### Programmatic Navigation

```javascript
// Navigate to a route
window.Router.navigate('/about');

// Get current route
const currentRoute = window.Router.getCurrentRoute();
```

### Page-Specific Initialization

```javascript
// In page-scripts.js
function initAboutPage() {
    // Page-specific code
}

// In routes.js, add init function:
about: {
    path: '/about',
    page: 'pages/about.html',
    title: 'About Us - Publications Division',
    init: initAboutPage
}
```

### Listening to Route Changes

```javascript
window.addEventListener('pageLoaded', function(e) {
    const route = e.detail.route;
    console.log('Page loaded:', route.path);
    // Execute page-specific code
});
```

## Browser Support

- Modern browsers with ES6+ support
- History API support required
- Fetch API for loading pages

## Development vs Production

### Development
- Direct file access works fine
- No build process required
- Easy debugging

### Production Considerations
- May need server configuration for clean URLs
- Consider adding build process for optimization
- Consider adding service worker for offline support

## Troubleshooting

### Pages Not Loading
1. Check browser console for errors
2. Verify file paths in route configuration
3. Ensure pages exist in `pages/` directory
4. Check CORS settings if running from file://

### Navigation Not Working
1. Ensure router is initialized (`window.Router` exists)
2. Check navigation links have correct paths
3. Verify event listeners are attached
4. Check browser console for errors

### Layout Not Loading
1. Verify `components/` directory exists
2. Check header.html and footer.html exist
3. Ensure LayoutManager is initialized
4. Check browser console for fetch errors

## Summary

This routing structure provides:
- ✅ Clean, maintainable code
- ✅ Easy route management
- ✅ Reusable layout system
- ✅ Best coding practices
- ✅ Scalable architecture
- ✅ Error handling
- ✅ Performance optimization

The architecture is designed to be simple yet powerful, following industry best practices while remaining easy to understand and maintain.

