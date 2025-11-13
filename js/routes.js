// Route Configuration
// Centralized route definitions with layout support
// Layout options: 
//   'default' (header + footer), 
//   'content-only' (default structure but no header/footer components), 
//   'minimal' (no header/footer), 
//   'auth' (header only), 
//   'none' (no layout)
const Routes = {
  home: {
    path: '/',
    page: 'pages/home.html',
    layout: 'default',
    title: 'Home - Publications Division'
  },
  buy: {
    path: '/buy',
    page: 'pages/buy.html',
    layout: 'default',
    title: 'Buy Books - Publications Division'
  },
  about: {
    path: '/about',
    page: 'pages/about.html',
    layout: 'default',
    title: 'About Us - Publications Division'
  },
  ourVision: {
    path: '/ourvision',
    page: 'pages/ourvision.html',
    layout: 'default',
    title: 'Vision & Mission - Publications Division'
  },
  publications: {
    path: '/publications',
    page: 'pages/publications.html',
    layout: 'default',
    title: 'Publications - Publications Division'
  },
  feedback: {
    path: '/feedback',
    page: 'pages/feedback.html',
    layout: 'default',
    title: 'Feedback & Grievance - Publications Division'
  },
  documents: {
    path: '/documents',
    page: 'pages/documents.html',
    layout: 'default',
    title: 'Documents - Publications Division'
  },
  business: {
    path: '/business',
    page: 'pages/business.html',
    layout: 'default',
    title: 'Business - Publications Division'
  },
  login: {
    path: '/login',
    page: 'pages/login.html',
    layout: 'default',
    title: 'Login - Publications Division'
  },
  register: {
    path: '/register',
    page: 'pages/register.html',
    layout: 'default',
    title: 'Register - Publications Division'
  },
  forgetPassword: {
    path: '/forget-password',
    page: 'pages/forget-password.html',
    layout: 'default',
    title: 'Forgot Password - Publications Division'
  },
  submit: {
    path: '/submit',
    page: 'pages/submit.html',
    layout: 'default',
    title: 'Submit Book Manuscript - Publications Division'
  },
  viewMore: {
    path: '/view-more',
    page: 'pages/view-more.html',
    layout: 'default',
    title: 'View More - Publications Division'
  },
  whosWho: {
    path: '/whos-who',
    page: 'pages/whos-who.html',
    layout: 'default',
    title: "Who's Who - Publications Division"
  },
  notFound: {
    path: '/404',
    page: 'pages/404.html',
    layout: 'default',
    title: '404 - Page Not Found'
  },
  listingProduct: {
    path: '/listing-product',
    page: 'pages/listingProduct.html',
    layout: 'default',
    title: 'Listing Product - Publications Division'
  },

};

// Helper function to get route by path
function getRouteByPath(path) {
  return Object.values(Routes).find(route => route.path === path) || Routes.notFound;
}

// Export for use in router
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Routes, getRouteByPath };
}

