"use server";

import { PERMISSIONS } from "@/constants/permissions";
import { useExtractSlugAndTargetId } from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";
import { getAllCareers, getPerticularCareer } from "../apiClientActions/career";
import {
  getAllCasePackages,
  getPerticularCasePackage,
} from "../apiClientActions/case-package";
import { getAllCMSPages, getPerticularCMSPage } from "../apiClientActions/cms";
import {
  getAllContactQueries,
  getAllContacts,
  getContactDetails,
} from "../apiClientActions/contacts";
import { getAllCourses, getCourseDetails } from "../apiClientActions/courses";
import {
  getAllCoursePackages,
  getCoursePackageDetails,
} from "../apiClientActions/courses/packages";
import { getAllFilesFromDB } from "../apiClientActions/files";
import {
  getAllLanguages,
  getPerticularLanguage,
} from "../apiClientActions/languages";
import {
  getAllMenus,
  getPerticularMenuDetails,
} from "../apiClientActions/menu";
import {
  getAllNewsArticles,
  getPerticularNewsArticle,
} from "../apiClientActions/news/articles";
import {
  getAllServices,
  getPerticularService,
} from "../apiClientActions/services";
import {
  getAllTestimonials,
  getPerticularTestimonial,
} from "../apiClientActions/testimonila";
import { getAllTimezones } from "../apiClientActions/timezone";
import {
  getAllPermissions,
  getAllRoles,
  getAllUsers,
  getPerticularRole,
  getUserDetails,
} from "../apiClientActions/user";
import { getSessionUserData } from "../authActions";

// NOTE User Permission Checks
export const checkUserPermission = async (premission) => {
  const { userId } = await verifySession();
  if (!userId) return { error: "Unauthorized" };

  const { success, userDetails, permissionsList } =
    await getSessionUserData(userId);
  const hasPermission =
    userDetails.adminAsignedRole?.name !== "Super Admin" &&
    !permissionsList.includes(premission);

  if (
    !success ||
    (userDetails.adminAsignedRole?.name !== "Super Admin" &&
      !permissionsList.includes(premission))
  ) {
    return { error: "Forbidden" };
  }

  return {
    userId,
    adminRole: userDetails.adminAsignedRole?.name || null,
    permissionsList,
  };
};

/*
 ******************
 ******************
 */

// ALL NEWS ARTICLES VIEW PAGE
export async function fetchAllNewsArticlesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const newsArticleResponse = await getAllNewsArticles(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    newsArticleResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE NEWS ARTICLE PAGE
export async function fetchCreateNewsArticlePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
  ]);

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE NEWS ARTICLE PAGE
export async function fetchUpdateNewsArticlePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { targetId } = await params;

  const { slug, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  if (
    !slug ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const [filesResponse, languagesResponse, newArticleResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularNewsArticle(userId, slug, targetId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    newArticleResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL SERVICES VIEW PAGE
export async function fetchAllServicesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const servicesResponse = await getAllServices(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    servicesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE SERVICES PAGE
export async function fetchCreateServicePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
  ]);

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE SERVICES PAGE
export async function fetchUpdateServicePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { targetId } = await params;

  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const { slug, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  const [filesResponse, languagesResponse, serviceResponse] = await Promise.all(
    [
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularService(userId, slug, targetId),
    ]
  );

  return {
    filesResponse,
    languagesResponse,
    serviceResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL CASE PACKAGES VIEW PAGE
export async function fetchAllCasePackagesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const casePackagesResponse = await getAllCasePackages(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    casePackagesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE CASE PACKAGE PAGE
export async function fetchCreateCasePackagePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
  ]);

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE CASE PACKAGE PAGE
export async function fetchUpdateCasePackagePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { targetId } = await params;
  const { slug, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const [filesResponse, languagesResponse, casePackageResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularCasePackage(userId, slug, targetId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    casePackageResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// CREATE NEW CONTACT PAGE
export async function fetchAddNewContactPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// ALL CONTACTS VIEW PAGE
export async function fetchAllContactsPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured, type } = await searchParams;

  const allContactsResponse = await getAllContacts(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured,
    type
  );

  return {
    allContactsResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// UPDATE CONTACT PAGE
export async function fetchUpdateContactPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { slug } = await params;
  const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  if (
    !slugData ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, languagesResponse, contactResponse] = await Promise.all(
    [
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getContactDetails(userId, slugData, targetId),
    ]
  );

  return {
    filesResponse,
    languagesResponse,
    contactResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// ALL CONTACT QUERY MESSAGES VIEW PAGE
export async function fetchAllContactQueriesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { search, page, pageSize, name, email, number } = await searchParams;

  const allContactQueriesResponse = await getAllContactQueries(
    userId,
    search || "",
    page,
    pageSize,
    name,
    email,
    number
  );

  return {
    allContactQueriesResponse,
    userId,
    adminRole,
    permissionsList,
    search,
  };
}

/*
 ******************
 ******************
 */

// CREATE TESTIMONIAL PAGE
export async function fetchCreateTestimonialPageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;

  return {
    userId,
  };
}

// GET ALL TESTIMONIAL PAGE
export async function fetchAllTestimonialsPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status } = await searchParams;

  const allTestimonialsResponse = await getAllTestimonials(
    userId,
    search || "",
    page,
    pageSize,
    status
  );

  return {
    allTestimonialsResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE TESTIMONIAL PAGE
export async function fetchUpdateTestimonialPageData(
  params,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;

  const { targetId } = await params;

  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return { error: "Not Found" };
  }

  const [languagesResponse, testimonialDetailsResponse] = await Promise.all([
    getAllLanguages(userId),
    getPerticularTestimonial(userId, targetId),
  ]);

  return {
    languagesResponse,
    testimonialDetailsResponse,
    userId,
  };
}

/*
 ******************
 ******************
 */

// CREATE CAREER PAGE
export async function fetchCreateCareerPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}

// GET ALL CAREER PAGE
export async function fetchAllCareersPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const allCareersResponse = await getAllCareers(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    allCareersResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE CAREER PAGE
export async function fetchUpdateCareerPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { targetId } = await params;

  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return { error: "Not Found" };
  }

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, languagesResponse, careerDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularCareer(userId, targetId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    careerDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// CREATE COURSE PAGE
export async function fetchAddNewCoursePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// VIEW COURSE PAGE
export async function fetchAllCoursesPageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const coursesResponse = await getAllCourses(userId);

  return {
    coursesResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE COURSE PAGE
export async function fetchUpdateCoursePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { slug } = await params;
  const { lang, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  // console.log("AFE-Slug: ", slug);

  if (!slug || !lang) {
    return { error: "Not Found" };
  }

  const [filesResponse, languagesResponse, courseDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getCourseDetails(userId, slug, lang),
    ]);

  return {
    filesResponse,
    languagesResponse,
    courseDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    lang,
    slug,
  };
}

// CREATE COURSE PACKAGE PAGE
export async function fetchAddNewCoursePackagePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, coursesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllCourses(userId),
  ]);

  return {
    filesResponse,
    coursesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// VIEW COURSE PACKAGES PAGE
export async function fetchAllCoursePackagesData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { course, search, page, pageSize, status, featured } =
    await searchParams;

  const [coursesResponse, coursePackagesResponse] = await Promise.all([
    getAllCourses(userId),
    getAllCoursePackages(
      userId,
      course,
      search,
      page,
      pageSize,
      status,
      featured
    ),
  ]);

  return {
    coursesResponse,
    coursePackagesResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE COURSE PACKAGE PAGE
export async function fetchUpdateCoursePackagePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { targetId } = await params;
  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return { error: "Not Found" };
  }

  const { lang, course, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  const [
    filesResponse,
    languagesResponse,
    coursesResponse,
    coursePackageDetailsResponse,
  ] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
    getAllCourses(userId),
    getCoursePackageDetails(userId, targetId, lang),
  ]);

  return {
    filesResponse,
    languagesResponse,
    coursesResponse,
    coursePackageDetailsResponse,
    userId,
    targetId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    lang,
    course,
  };
}

/*
 ******************
 ******************
 */

// CREATE CMS PAGE
export async function fetchCreateCMSPageData(searchParams, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// ALL CMS PAGE LISTING
export async function fetchAllCMSPageLisitngData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize } = await searchParams;

  const allCMSPagesResponse = await getAllCMSPages(
    userId,
    search || "",
    page,
    pageSize
  );

  return {
    allCMSPagesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// UPDATE CMS PAGE
export async function fetchUpdateCMSPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { linkId } = await params;

  if (!linkId) return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType, tab } =
    await searchParams;

  const [filesResponse, languagesResponse, cmsPageDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularCMSPage(userId, linkId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    cmsPageDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE CMS PAGE SECTIONS
export async function fetchUpdateCMSPageSectionsData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { linkId } = await params;

  if (!linkId) return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType, tab } =
    await searchParams;

  const [filesResponse, languagesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
  ]);

  return {
    filesResponse,
    languagesResponse,
    userId,
    searchName,
    selectedFileType,
    tab,
    linkId,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ADMIN_STAFF DETAILS PAGE
export async function fetchAdminStaffDetailsPageData(
  params,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const [userDetailsResponse, rolesResponse] = await Promise.all([
    getUserDetails(userId, targetId),
    getAllRoles(userId),
  ]);

  return {
    userDetailsResponse,
    rolesResponse,
    userId,
    targetId,
  };
}

// ADMIN_STAFF LIST PAGE
export async function fetchAdminStaffListPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, role } = await searchParams;

  // Check user have VIEW_STAFF_ROLES permission
  const canViewRoles =
    adminRole === "Super Admin" ||
    permissionsList.includes(PERMISSIONS.STAFF.VIEW_STAFF_ROLES);

  const [getAllUsersResponse, getAllRolesResponse] = await Promise.all([
    getAllUsers(userId, search || "", page, pageSize, role),
    canViewRoles ? getAllRoles(userId) : Promise.resolve(null),
  ]);

  return {
    getAllUsersResponse,
    getAllRolesResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL ADMIN_CREATED_ROLE
export async function fetchAllAdminCreatedRolePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize } = await searchParams;

  const { success, fetchData, paginationData, message } = await getAllRoles(
    userId,
    search,
    page,
    pageSize
  );

  return {
    fetchData,
    paginationData,
    message,
    userId,
    adminRole,
    permissionsList,
  };
}

// CREATE ADMIN STAFF ROLE
export async function fetchCreateAdminStaffRolePageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;

  const { success, fetchData } = await getAllPermissions(userId);

  return {
    success,
    fetchData,
    userId,
  };
}

// UPDATE ADMIN STAFF ROLE
export async function fetchUpdateAdminStaffRolePageData(
  params,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;
  const { roleId } = await params;
  if (roleId === "undefiend" || !mongoose.Types.ObjectId.isValid(roleId))
    return { error: "Not Found" };

  const [permissionsResponse, roleResponse] = await Promise.all([
    getAllPermissions(userId),
    getPerticularRole(userId, roleId),
  ]);

  return {
    permissionsResponse,
    roleResponse,
    userId,
    roleId,
  };
}

/*
 ******************
 ******************
 */

// ALL LANGUAGES VIEW PAGE
export async function fetchAllLanguagessPageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { success, fetchData, message } = await getAllLanguages(userId);

  return {
    success,
    fetchData,
    message,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE LANGUAGE PAGE
export async function fetchUpdateLanguagePageData(params, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const { success, languageData, message } = await getPerticularLanguage(
    userId,
    targetId
  );

  return {
    success,
    languageData,
    message,
    userId,
  };
}

/*
 ******************
 ******************
 */

// ADD NEW MENU PAGE
export async function fetchCreateNewMenuPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;

  const { search } = await searchParams;

  const menusResponse = await getAllMenus(userId, search);

  return {
    menusResponse,
    userId,
  };
}

// ALL MENU LISTING PAGE
export async function fetchAllMenusPageData(searchParams, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { search } = await searchParams;

  const menusResponse = await getAllMenus(userId, search);

  return {
    menusResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE MENU PAGE
export async function fetchUpdateMenuPageData(params, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const [menusResponse, languagesResponse, menuDetailsResponse] =
    await Promise.all([
      getAllMenus(userId),
      getAllLanguages(userId),
      getPerticularMenuDetails(userId, targetId),
    ]);

  return {
    menusResponse,
    languagesResponse,
    menuDetailsResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// WEBSITE GENERAL SETTINGS PAGE
export async function fetchWebsiteGeneralSettingPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [allFilesResponse, allTimezonesResponse, languagesResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllTimezones(userId),
      getAllLanguages(userId),
    ]);

  return {
    allFilesResponse,
    allTimezonesResponse,
    languagesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}

// WEBSITE FOOTER SETTINGS PAGE
export async function fetchWebsiteFooterSettingsPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [allFilesResponse, languagesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
  ]);

  return {
    allFilesResponse,
    languagesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}
