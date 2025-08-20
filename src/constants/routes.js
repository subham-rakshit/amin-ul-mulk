const ROUTES = {
  // Auth Routes:::
  LOGIN: "/login",

  // Public Routes:::
  HOME: "/",
  ABOUT_US: "/about-us",
  SERVICE: "/services",
  NEWS: "/news-blogs",
  PACKAGES: "/packages",
  CONTACT_US: "/contact-us",
  CANCELLATION_POLICY: "/cancellation-policy",
  PRIVACY_POLICY: "/privacy-policy",
  NOT_FOUND: "/not-found",

  // Admin Routes:::
  ADMIN_PROFILE: "/admin/profile-info",

  ADMIN_DASHBOARD_ECOMMERCE: "/admin/dashboard",

  // Service Routes
  ADMIN_ALL_SERVICES: "/admin/service/view",
  ADMIN_CREATE_SERVICE: "/admin/service/create",
  ADMIN_UPDATE_SERVICE: "/admin/service/update",

  // News Article Routes
  ADMIN_ALL_NEWS_ARTICLES: "/admin/news/article/view",
  ADMIN_CREATE_NEWS_ARTICLE: "/admin/news/article/create",
  ADMIN_UPDATE_NEWS_ARTICLE: "/admin/news/article/update",

  // Case Packages Routes
  ADMIN_ALL_CASE_PACKAGES: "/admin/case-package/view",
  ADMIN_CREATE_CASE_PACKAGE: "/admin/case-package/create",
  ADMIN_UPDATE_CASE_PACKAGE: "/admin/case-package/update",

  // Contact Routes
  ADMIN_ALL_CONTACTS: "/admin/contact/view",
  ADMIN_CREATE_CONTACT: "/admin/contact/create",
  ADMIN_ALL_CONTACT_QUERIES: "/admin/contact/queries",
  ADMIN_UPDATE_CONTACT: (targetId) => `/admin/contact/update/${targetId}`,

  // Testimonial Routes
  ADMIN_ALL_TESTIMONIALS: "/admin/testimonial/view",
  ADMIN_CREATE_TESTIMONIAL: "/admin/testimonial/create",
  ADMIN_UPDATE_TESTIMONIAL: `/admin/testimonial/update`,

  // Career Routes
  ADMIN_ALL_CAREERS: "/admin/career/view",
  ADMIN_CREATE_CAREER: "/admin/career/create",
  ADMIN_UPDATE_CAREER: (targetId) => `/admin/career/update/${targetId}`,

  // Courses Routes
  ADMIN_ALL_COURSES: "/admin/training-courses/view",
  ADMIN_CREATE_COURSE: "/admin/training-courses/create?tab=section-1",
  ADMIN_UPDATE_COURSE: (slug) => `/admin/training-courses/update/${slug}`,

  // Courses Package Routes
  ADMIN_ALL_COURSE_PACKAGES: "/admin/training-courses/package/view",
  ADMIN_CREATE_COURSE_PACKAGE: "/admin/training-courses/package/create",
  ADMIN_UPDATE_COURSE_PACKAGE: (targetId) =>
    `/admin/training-courses/package/update/${targetId}`,

  // File Routes
  ADMIN_ALL_FILES: "/admin/files/view",
  ADMIN_CREATE_FILE: "/admin/files/create",

  // Menu Management Routes
  ADMIN_MENU_LISTS: "/admin/menu/view",
  ADMIN_ADD_NEW_MENU: "/admin/menu/create",
  ADMIN_EDIT_MENU: (targetId) => `/admin/menu/update/${targetId}`,

  // Staff Management Routes
  ADMIN_ALL_STAFF: "/admin/staff/view",
  ADMIN_STAFF_UPDATE: (targetId) => `/admin/staff/update/${targetId}`,

  ADMIN_STAFF_ALL_ROLES: "/admin/staff/role/view",
  ADMIN_STAFF_CREATE_ROLE: "/admin/staff/role/create",
  ADMIN_STAFF_UPDATE_ROLE: (roleId) => `/admin/staff/role/update/${roleId}`,

  // Language Management Routes
  ADMIN_ALL_LANGUAGES: "/admin/configurations/language/view",
  ADMIN_CREATE_LANGUAGE: "/admin/configurations/language/create",
  ADMIN_UPDATE_LANGUAGE: (targetId) =>
    `/admin/configurations/language/update/${targetId}`,

  // CMS Setup Routes
  ADMIN_CMS_ALL_PAGES: "/admin/pages-setup/view",
  ADMIN_CMS_CREATE_PAGE: "/admin/pages-setup/create",
  ADMIN_CMS_UPDATE_PAGE: (linkId) => `/admin/pages-setup/update/${linkId}`,
  ADMIN_CMS_UPDATE_PAGE_SECTIONS: (linkId) =>
    `/admin/pages-setup/sections/${linkId}`,

  // Setup Management Routes
  ADMIN_WEBSITE_APPEARANCE_SETUP: "/admin/configurations/appearance",
  ADMIN_WEBSITE_FOOTER_SETUP: "/admin/configurations/footer",
};

export default ROUTES;
