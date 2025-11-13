# Routing Structure Guide - React Router-like Architecture

This project now uses a flexible routing system similar to React Router, where routes can specify different layouts easily.

## Architecture Overview

### File Structure

```
Publications-Division/
├── index.html              # Main entry point
├── layouts/                # Layout templates
│   ├── default.html        # Default layout (header + footer)
│   ├── minimal.html        # Minimal layout (no header/footer)
│   └── auth.html           # Auth layout (header only)
├── pages/                  # Page content files
│   ├── home.html
│   ├── login.html
│   └── ...
└── js/
    ├── routes.js           # Route configuration with layouts
    ├── router.js           # Router with layout support
    ├── layout.js           # Layout manager
    └── app.js              # Application entry point
```

## How It Works

### 1. Route Configuration (`js/routes.js`)

Each route can specify a `layout` property:

```javascript
const Routes = {
  home: {
    path: '/',
    page: 'pages/home.html',
    layout: 'default',  // Uses layouts/default.html
    title: 'Home - Publications Division'
  },
  login: {
    path: '/login',
    page: 'pages/login.html',
    layout: 'minimal',  // Uses layouts/minimal.html
    title: 'Login - Publications Division'
  }
};
```

**Available Layouts:**
- `default` - Full layout with header and footer
- `minimal` - No header or footer (clean page)
- `auth` - Header only (for authentication pages)
- Custom layouts can be added by creating new files in `layouts/`

### 2. Layout Templates (`layouts/`)

Layout files define the structure using placeholders:

**layouts/default.html:**
```html
<div id="header-placeholder"></div>
<div id="app-content">
  <!-- Page content will be loaded here -->
</div>
<div id="footer-placeholder"></div>
```

**layouts/minimal.html:**
```html
<div id="app-content">
  <!-- Page content will be loaded here -->
</div>
```

### 3. Router (`js/router.js`)

The router automatically:
- Detects which layout a route needs
- Loads the appropriate layout template
- Switches layouts when navigating between routes with different layouts
- Loads page content into the layout

## Adding New Routes

### Step 1: Add Route Configuration

Edit `js/routes.js`:

```javascript
const Routes = {
  // ... existing routes
  newPage: {
    path: '/new-page',
    page: 'pages/new-page.html',
    layout: 'default',  // or 'minimal', 'auth', etc.
    title: 'New Page - Publications Division'
  }
};
```

### Step 2: Create Page File

Create `pages/new-page.html` with just the content (no HTML structure):

```html
<!-- New Page Content -->
<section class="container py-5">
    <div class="row">
        <div class="col-12">
            <h1 class="mb-4">New Page</h1>
            <p>Page content here.</p>
        </div>
    </div>
</section>
```

### Step 3: Update Navigation (if using default layout)

Edit `components/header.html` to add navigation link:

```html
<li class="nav-item">
    <a class="nav-link" href="/new-page">New Page</a>
</li>
```

## Creating New Layouts

### Step 1: Create Layout File

Create `layouts/custom.html`:

```html
<!-- Custom Layout -->
<div id="custom-header">
  <!-- Custom header content -->
</div>
<div id="app-content">
  <!-- Page content will be loaded here -->
</div>
<div id="custom-sidebar">
  <!-- Custom sidebar -->
</div>
```

**Important:** The layout must include `<div id="app-content">` for page content to load.

### Step 2: Use the Layout

In `js/routes.js`, specify the layout:

```javascript
customRoute: {
  path: '/custom',
  page: 'pages/custom.html',
  layout: 'custom',  // Uses layouts/custom.html
  title: 'Custom Page'
}
```

## Layout Switching

The router automatically handles layout switching:

- When navigating from a route with `default` layout to one with `minimal` layout, the header and footer are removed
- When navigating back, they are restored
- Layout components (header/footer) are only loaded when needed

## Best Practices

1. **Page Content**: Keep page files as content fragments only (no `<html>`, `<head>`, or `<body>` tags)

2. **Layout Selection**:
   - Use `default` for most pages (with navigation)
   - Use `minimal` for login, registration, standalone pages
   - Use `auth` for authentication-related pages with minimal header

3. **Route Organization**: Group routes by layout in `routes.js` for better readability

4. **Page-Specific Scripts**: Use the `pageLoaded` event for page-specific initialization:

```javascript
window.addEventListener('pageLoaded', function(e) {
  const route = e.detail.route;
  if (route.path === '/new-page') {
    // Initialize page-specific code
  }
});
```

## Examples

### Example 1: Public Page with Full Layout

```javascript
about: {
  path: '/about',
  page: 'pages/about.html',
  layout: 'default',
  title: 'About Us'
}
```

### Example 2: Login Page with Minimal Layout

```javascript
login: {
  path: '/login',
  page: 'pages/login.html',
  layout: 'minimal',
  title: 'Login'
}
```

### Example 3: Dashboard with Custom Layout

```javascript
dashboard: {
  path: '/dashboard',
  page: 'pages/dashboard.html',
  layout: 'dashboard',  // Custom layout
  title: 'Dashboard'
}
```

## Migration Notes

- Existing routes without `layout` property default to `'default'`
- All existing pages continue to work
- Layout switching is automatic and seamless
- No changes needed to existing page files

## Troubleshooting

### Layout Not Loading
- Check that layout file exists in `layouts/` directory
- Verify layout name matches the file name (e.g., `'default'` → `layouts/default.html`)
- Check browser console for errors

### Page Content Not Showing
- Ensure layout includes `<div id="app-content">`
- Verify page file path is correct in route configuration
- Check that page file exists

### Header/Footer Not Appearing
- Verify route uses `layout: 'default'`
- Check that `components/header.html` and `components/footer.html` exist
- Ensure LayoutManager is initialized (automatic for default layout)

