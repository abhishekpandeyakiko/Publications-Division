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
  salesEmporiumAddress: {
    path: '/business/sales-emporium-address',
    page: 'pages/business/sales-emporium-address.html',
    layout: 'default',
    title: 'Sales Emporium Address - Publications Division'
  },
  eResourceAggregator: {
    path: '/business/e-resource-aggregator',
    page: 'pages/business/e-resource-aggregator.html',
    layout: 'default',
    title: 'E Resource Aggregator - Publications Division'
  },
  businessPolicyGuidelines: {
    path: '/business/business-policy-guidelines',
    page: 'pages/business/business-policy-guidelines.html',
    layout: 'default',
    title: 'Business Policy/Guidelines - Publications Division'
  },
  agentsBooks: {
    path: '/business/agents-books',
    page: 'pages/business/agents-books.html',
    layout: 'default',
    title: 'Agents (Books) - Publications Division'
  },
  homeLibraryScheme: {
    path: '/business/home-library-scheme',
    page: 'pages/business/home-library-scheme.html',
    layout: 'default',
    title: 'Home Library Scheme - Publications Division'
  },
  attractiveDiscounts: {
    path: '/business/attractive-discounts',
    page: 'pages/business/attractive-discounts.html',
    layout: 'default',
    title: 'Attractive Discounts - Publications Division'
  },
  agentsJournals: {
    path: '/business/agents-journals',
    page: 'pages/business/agents-journals.html',
    layout: 'default',
    title: 'Agents (Journals) - Publications Division'
  },
  agentsEmpNews: {
    path: '/business/agents-emp-news',
    page: 'pages/business/agents-emp-news.html',
    layout: 'default',
    title: 'Agents (Emp News) - Publications Division'
  },
  agentBooksAgreement: {
    path: '/business/agent-books-agreement',
    page: 'pages/business/agent-books-agreement.html',
    layout: 'default',
    title: 'Agent Books Agreement - Publications Division'
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
  userProfile: {
    path: '/user-profile',
    page: 'pages/user-info.html',
    layout: 'default',
    title: 'User Profile - Publications Division'
  },
  // BUY sub-pages
  buyBooks: {
    path: '/buy/books',
    page: 'pages/buy/books.html',
    layout: 'default',
    title: 'Books - Publications Division'
  },
  buyEbooks: {
    path: '/buy/ebooks',
    page: 'pages/buy/ebooks.html',
    layout: 'default',
    title: 'EBooks/EJournal - Publications Division'
  },
  buyJournal: {
    path: '/buy/journal',
    page: 'pages/buy/journal.html',
    layout: 'default',
    title: 'Journal - Publications Division'
  },
  // Publications sub-pages
  publicationsBooks: {
    path: '/publications/books',
    page: 'pages/publications/books.html',
    layout: 'default',
    title: 'Books - Publications Division'
  },
  publicationsEbooks: {
    path: '/publications/ebooks',
    page: 'pages/publications/ebooks.html',
    layout: 'default',
    title: 'eBooks/eJournals - Publications Division'
  },
  publicationsJournals: {
    path: '/publications/journals',
    page: 'pages/publications/journals.html',
    layout: 'default',
    title: 'Journals - Publications Division'
  },
  publicationsCatalogue: {
    path: '/publications/catalogue',
    page: 'pages/publications/catalogue.html',
    layout: 'default',
    title: 'Catalogue - Publications Division'
  },
  publicationsEmpanelledPrinters: {
    path: '/publications/empanelled-printers',
    page: 'pages/publications/empanelled-printers.html',
    layout: 'default',
    title: 'Empanelled Printers - Publications Division'
  },
  publicationsListOfReprints: {
    path: '/publications/list-of-reprints',
    page: 'pages/publications/list-of-reprints.html',
    layout: 'default',
    title: 'List of Reprints - Publications Division'
  },
  // Feedback sub-pages
  searchGrievance: {
    path: '/feedback/search-grievance',
    page: 'pages/feedback/search-grievance.html',
    layout: 'default',
    title: 'Search Grievance - Publications Division'
  },
  grievanceReopen: {
    path: '/feedback/grievance-reopen',
    page: 'pages/feedback/grievance-reopen.html',
    layout: 'default',
    title: 'Grievance Reopen - Publications Division'
  },
  // Documents sub-pages
  royaltyStructure: {
    path: '/documents/royalty-structure',
    page: 'pages/documents/royalty-structure.html',
    layout: 'default',
    title: 'Royalty Structure - Publications Division'
  },
  tenders: {
    path: '/documents/tenders',
    page: 'pages/documents/tenders.html',
    layout: 'default',
    title: 'Tenders - Publications Division'
  },
  tendersAwarded: {
    path: '/documents/tenders-awarded',
    page: 'pages/documents/tenders-awarded.html',
    layout: 'default',
    title: 'Tenders Awarded - Publications Division'
  },
  rti: {
    path: '/documents/rti',
    page: 'pages/documents/rti.html',
    layout: 'default',
    title: 'RTI - Publications Division'
  },
  budget: {
    path: '/documents/budget',
    page: 'pages/documents/budget.html',
    layout: 'default',
    title: 'Budget - Publications Division'
  },
  authorAgreement: {
    path: '/documents/author-agreement',
    page: 'pages/documents/author-agreement.html',
    layout: 'default',
    title: 'Author Agreement - Publications Division'
  },
  bookSelectionPublishingProcess: {
    path: '/documents/book-selection-publishing-process',
    page: 'pages/documents/book-selection-publishing-process.html',
    layout: 'default',
    title: 'Book Selection & Publishing Process - Publications Division'
  },
  jobNotification: {
    path: '/documents/job-notification',
    page: 'pages/documents/job-notification.html',
    layout: 'default',
    title: 'Job Notification - Publications Division'
  },
  ordersNotices: {
    path: '/documents/orders-notices',
    page: 'pages/documents/orders-notices.html',
    layout: 'default',
    title: 'Orders and Notices - Publications Division'
  },
  suoMotoDisclosure: {
    path: '/documents/suo-moto-disclosure',
    page: 'pages/documents/suo-moto-disclosure.html',
    layout: 'default',
    title: 'Suo Moto Disclosure - Publications Division'
  },
  internalComplaintsCommittee: {
    path: '/documents/internal-complaints-committee',
    page: 'pages/documents/internal-complaints-committee.html',
    layout: 'default',
    title: 'Internal Complaints Committee - Publications Division'
  },
  refundPolicy: {
    path: '/documents/refund-policy',
    page: 'pages/documents/refund-policy.html',
    layout: 'default',
    title: 'Refund Policy - Publications Division'
  },
  // Submit sub-pages
  createAuthorAccount: {
    path: '/submit/create-author-account',
    page: 'pages/submit/create-author-account.html',
    layout: 'default',
    title: 'Create Author Account - Publications Division'
  },
  submissionProcess: {
    path: '/submit/submission-process',
    page: 'pages/submit/submission-process.html',
    layout: 'default',
    title: 'Submission Process - Publications Division'
  },
  // View More sub-pages
  citizenCharter: {
    path: '/view-more/citizen-charter',
    page: 'pages/view-more/citizen-charter.html',
    layout: 'default',
    title: 'Citizen Charter - Publications Division'
  },
  videoGallery: {
    path: '/view-more/video-gallery',
    page: 'pages/view-more/video-gallery.html',
    layout: 'default',
    title: 'Video Gallery - Publications Division'
  },
  photoGallery: {
    path: '/view-more/photo-gallery',
    page: 'pages/view-more/photo-gallery.html',
    layout: 'default',
    title: 'Photo Gallery - Publications Division'
  },
  faqs: {
    path: '/view-more/faqs',
    page: 'pages/view-more/faqs.html',
    layout: 'default',
    title: "FAQ's - Publications Division"
  },
  imageGallery: {
    path: '/view-more/image-gallery',
    page: 'pages/view-more/image-gallery.html',
    layout: 'default',
    title: 'Image Gallery - Publications Division'
  },
  eventsHighlights: {
    path: '/view-more/events-highlights',
    page: 'pages/view-more/events-highlights.html',
    layout: 'default',
    title: 'Events & Highlights - Publications Division'
  },
  webInformationManager: {
    path: '/web-information-manager',
    page: 'pages/web-information-manager.html',
    layout: 'default',
    title: 'Web Information Manager - Publications Division'
  },
  termsConditions: {
    path: '/terms-conditions',
    page: 'pages/terms-conditions.html',
    layout: 'default',
    title: 'Terms & Conditions - Publications Division'
  },
  contactUs: {
    path: '/contact-us',
    page: 'pages/contact-us.html',
    layout: 'default',
    title: 'Contact Us - Publications Division'
  },
  privacyPolicy: {
    path: '/privacy-policy',
    page: 'pages/privacy-policy.html',
    layout: 'default',
    title: 'Privacy Policy - Publications Division'
  },
  copyrightPolicy: {
    path: '/copyright-policy',
    page: 'pages/copyright-policy.html',
    layout: 'default',
    title: 'Copyright Policy - Publications Division'
  },
  accessibilityStatement: {
    path: '/accessibility-statement',
    page: 'pages/accessibility-statement.html',
    layout: 'default',
    title: 'Accessibility Statement - Publications Division'
  },
  siteMap: {
    path: '/site-map',
    page: 'pages/site-map.html',
    layout: 'default',
    title: 'Site Map - Publications Division'
  },
  notifications: {
    path: '/notifications',
    page: 'pages/notifications.html',
    layout: 'default',
    title: 'Notifications - Publications Division'
  },
  cart: {
    path: '/cart',
    page: 'pages/cart.html',
    layout: 'default',
    title: 'Shopping Cart - Publications Division'
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

