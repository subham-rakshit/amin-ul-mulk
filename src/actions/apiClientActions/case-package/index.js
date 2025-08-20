"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import {
  deleteCache,
  deletePatternCache,
  getCache,
  setCache,
} from "@/lib/redis/actions";
import axios from "axios";

// CREATE A NEW CASE PACKAGE
export const createNewCasePackage = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_CASE_PACKAGE}/${userId}`,
      {
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all casePackages related caches
      await deletePatternCache(`${cacheKeyNames.CASE_PACAKGES}-*`);
      await deletePatternCache(`${cacheKeyNames.FE_CASE_PACKAGES}-*`);
      console.log(
        `createNewCasePackage: ${cacheKeyNames.CASE_PACAKGES} ${cacheKeyNames.FE_CASE_PACKAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new case package CLIENT: ${error}`);

    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// GET ALL CASE PACKAGES
export const getAllCasePackages = async (
  userId,
  search,
  page,
  pageSize,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.CASE_PACAKGES}-${search || "search"}-${page || 1}-${pageSize || 5}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllCasePackages: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue?.packages || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_CASE_PACKAGES}/${userId}`
  );
  const params = {
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 5,
    status: status || "",
    featured: featured || "",
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllNewsArticles: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data?.packages || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting all case packages CLIENT: ${error.message}`
    );

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET A PERTICULAR CASE PACKAGE
export const getPerticularCasePackage = async (userId, slug, targetId) => {
  const keyName = `${cacheKeyNames.CASE_PACAKGE_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularCasePackage: Cache HIT ✅");

    return {
      success: true,
      packageDetails: parsedValue?.packageDetails || {},
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_CASE_PACKAGE_DETAILS}/${targetId}?userId=${userId}`
  );

  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log(
        "getPerticularCasePackage: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        packageDetails: response.data?.packageDetails || {},
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting case package details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR CASE PACKAGE
export const updatePerticularCasePackage = async (
  userId,
  slug,
  targetId,
  data
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.EDIT_CASE_PACKAGE}/${targetId}?userId=${userId}`,
      {
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CASE_PACAKGE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CASE_PACAKGES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_CASE_PACKAGES}-*`),
      ]);
      console.log(
        `updatePerticularCasePackage: ${cacheKeyNames.CASE_PACAKGE_DETAILS} ${cacheKeyNames.CASE_PACAKGES} ${cacheKeyNames.FE_CASE_PACKAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the case package CLIENT: ${error}`);

    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// DELETE A PERTICULAR CASE PACKAGE
export const deletePerticularCasePackage = async (userId, slug, targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_CASE_PACKAGE}/${targetId}?userId=${userId}`
  );

  try {
    // Make the DELETE request using fetch
    const response = await axios.delete(url.toString());

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CASE_PACAKGE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CASE_PACAKGES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_CASE_PACKAGES}-*`),
      ]);
      console.log(
        `deletePerticularCasePackage: ${cacheKeyNames.CASE_PACAKGE_DETAILS} ${cacheKeyNames.CASE_PACAKGES} ${cacheKeyNames.FE_CASE_PACKAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the case package CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR CASE PACKAGE ACTIVE STATUS
export const togglePerticularCasePackageActiveStatus = async (
  userId,
  slug,
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_ACTIVE_CASE_PACKAGE_STATUS}/${targetId}?userId=${userId}`
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CASE_PACAKGE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CASE_PACAKGES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_CASE_PACKAGES}-*`),
      ]);
      console.log(
        `togglePerticularCasePackageActiveStatus: ${cacheKeyNames.CASE_PACAKGE_DETAILS} ${cacheKeyNames.CASE_PACAKGES} ${cacheKeyNames.FE_CASE_PACKAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing case package active status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR CASE PACKAGE FEATURED STATUS
export const togglePerticularCasePackageFeaturedStatus = async (
  userId,
  slug,
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_FEATURED_CASE_PACKAGE_STATUS}/${targetId}?userId=${userId}`
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CASE_PACAKGE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CASE_PACAKGES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_CASE_PACKAGES}-*`),
      ]);
      console.log(
        `togglePerticularCasePackageFeaturedStatus: ${cacheKeyNames.CASE_PACAKGE_DETAILS} ${cacheKeyNames.CASE_PACAKGES} ${cacheKeyNames.FE_CASE_PACKAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing case package featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
