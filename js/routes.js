// Route Configuration
// Centralized route definitions following best practices
const Routes = {
  home: {
    path: '/',
    page: 'pages/home.html',
    title: 'Home - Publications Division'
  },
  buy: {
    path: '/buy',
    page: 'pages/buy.html',
    title: 'Buy Books - Publications Division'
  },
  about: {
    path: '/about',
    page: 'pages/about.html',
    title: 'About Us - Publications Division'
  },
  publications: {
    path: '/publications',
    page: 'pages/publications.html',
    title: 'Publications - Publications Division'
  },
  feedback: {
    path: '/feedback',
    page: 'pages/feedback.html',
    title: 'Feedback & Grievance - Publications Division'
  },
  documents: {
    path: '/documents',
    page: 'pages/documents.html',
    title: 'Documents - Publications Division'
  },
  business: {
    path: '/business',
    page: 'pages/business.html',
    title: 'Business - Publications Division'
  },
    login: {
    path: '/login',
    page: 'pages/login.html',
    title: 'login page'
  },
  submit: {
    path: '/submit',
    page: 'pages/submit.html',
    title: 'Submit Book Manuscript - Publications Division'
  },
  viewMore: {
    path: '/view-more',
    page: 'pages/view-more.html',
    title: 'View More - Publications Division'
  },
  whosWho: {
    path: '/whos-who',
    page: 'pages/whos-who.html',
    title: "Who's Who - Publications Division"
  },
  notFound: {
    path: '/404',
    page: 'pages/404.html',
    title: '404 - Page Not Found'
  }
};

// Helper function to get route by path
function getRouteByPath(path) {
  return Object.values(Routes).find(route => route.path === path) || Routes.notFound;
}

// Export for use in router
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Routes, getRouteByPath };
}

