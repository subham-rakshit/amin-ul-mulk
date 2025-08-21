"use server";

import {
  getAllPublicCareers,
  getAllPublicCourses,
  getAllPublicFiles,
  getAllPublicLanguages,
  getAllPublicMenus,
  getAllPublicNewsArticles,
  getAllPublicServices,
  getAllPublicTestimonials,
  getAllPublicWebsiteSettings,
  getPublicCourseDetails,
  getPublicPageCMSContent,
} from "../frontEndActions/action";

// Parent Layout Data
export const fetchPublicParentLayoutData = async () => {
  const [websiteSettingsResponse, filesResponse, languageResponse] =
    await Promise.all([
      getAllPublicWebsiteSettings(),
      getAllPublicFiles(),
      getAllPublicLanguages(),
    ]);

  return {
    settingsData: websiteSettingsResponse?.settingsData || [],
    filesList: filesResponse?.filesList || [],
    languageList: languageResponse?.fetchData || [],
  };
};

// Header Data
export const fetchPublicHeaderData = async () => {
  const headerMenuResponse = await getAllPublicMenus();

  return {
    menuList: headerMenuResponse?.fetchData || [],
  };
};

// NOTE News Listing Page Data
export const fetchPublicNewsListingPageData = async (
  searchParams,
  linkId = "",
  lang = "en"
) => {
  const { search, page, pageSize, category, status, featured } =
    await searchParams;

  const [
    newsArticleResponse,
    contentResponse,
    filesResponse,
    languagesResponse,
  ] = await Promise.all([
    getAllPublicNewsArticles(
      search,
      page,
      pageSize,
      category,
      status,
      featured
    ),
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
    getAllPublicLanguages(),
  ]);

  return {
    newsArticleResponse,
    newsCategoriesResponse,
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
    languages: languagesResponse?.fetchData || [],
    search,
    category,
    page,
  };
};

// About Page Data
export const fetchPublicAboutPageData = async (linkId, lang = "en") => {
  const [
    fielsResponse,
    contentResponse,
    homeContentResponse,
    testimonialResponse,
  ] = await Promise.all([
    getAllPublicFiles(),
    getPublicPageCMSContent(linkId, lang),
    getPublicPageCMSContent("home", lang),
    getAllPublicTestimonials(),
  ]);

  return {
    filesList: fielsResponse?.filesList || [],
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    homeContentData: homeContentResponse?.contentDetails || {},
    testimonials: testimonialResponse?.fetchData || [],
  };
};

// Careers Page Data
export const fetchPublicCareersPageData = async (linkId = "", lang = "en") => {
  const [careersResponse, contentResponse, filesResponse] = await Promise.all([
    getAllPublicCareers(),
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
  ]);

  return {
    fetchData: careersResponse?.fetchData || [],
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
  };
};

// Contact Us Page Data
export const fetchPublicContactUsPageData = async (
  linkId = "",
  lang = "en"
) => {
  const [
    contentResponse,
    filesResponse,
    servicesResponse,
    websiteSettingsResponse,
  ] = await Promise.all([
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
    getAllPublicServices(),
    getAllPublicWebsiteSettings(),
  ]);

  return {
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
    services: servicesResponse?.fetchData || [],
    settingsData: websiteSettingsResponse?.settingsData || [],
  };
};

// Courses Page Data
export const fetchPublicCoursesPageData = async (linkId = "", lang = "en") => {
  const [contentResponse, coursesResponse, fielsResponse] = await Promise.all([
    getPublicPageCMSContent(linkId, lang),
    getAllPublicCourses(),
    getAllPublicFiles(),
  ]);

  return {
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: fielsResponse?.filesList || [],
    coursesResponse,
  };
};

// Course Details Page Data
export const fetchPublicCourseDetailsPageData = async (slug, lang = "en") => {
  const [
    testimonialResponse,
    courseDetailsResponse,
    filesResponse,
    contentResponse,
    courseContentResponse,
    languageResponse,
  ] = await Promise.all([
    getAllPublicTestimonials(),
    getPublicCourseDetails(slug, lang),
    getAllPublicFiles(),
    getPublicPageCMSContent("home", lang),
    getPublicPageCMSContent("courses", lang),
    getAllPublicLanguages(),
  ]);

  return {
    testimonialResponse,
    courseDetailsResponse,
    filesResponse,
    contentData: contentResponse?.contentDetails || {},
    courseContentData: courseContentResponse?.contentDetails || {},
    languageList: languageResponse?.fetchData || [],
  };
};

// Home Page Data
export const fetchPublicHomePageData = async (linkId = "", lang = "") => {
  const [
    // newsResponse,
    testimonialResponse,
    filesResponse,
    contentResponse,
    websiteSettingsResponse,
    // coursesResponse,
    // languageResponse,
  ] = await Promise.all([
    // getAllPublicNewsArticles(),
    getAllPublicTestimonials(),
    getAllPublicFiles(),
    getPublicPageCMSContent(linkId, lang),
    getAllPublicWebsiteSettings(),
    // getAllPublicCourses(),
    // getAllPublicLanguages(),
  ]);

  return {
    // newsResponse,
    testimonials: testimonialResponse?.fetchData || [],
    // coursesResponse,
    filesList: filesResponse?.filesList || [],
    contentData: contentResponse?.contentDetails || {},
    settingsData: websiteSettingsResponse?.settingsData || [],
    // otherInfoData: contentResponse?.otherInfoData || {},
    // languageList: languageResponse?.fetchData || [],
  };
};

// Package Listing Page Data
export const fetchPublicPackagesPageData = async (linkId = "", lang = "en") => {
  const [contentResponse, filesResponse] = await Promise.all([
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
  ]);

  return {
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
  };
};

// Services Listing Page Data
export const fetchPublicServicesPageData = async (linkId = "", lang = "en") => {
  const [contentResponse, filesResponse] = await Promise.all([
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
  ]);

  return {
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
  };
};
