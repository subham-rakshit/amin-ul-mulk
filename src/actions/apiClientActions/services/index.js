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

// CREATE A NEW SERVICE
export const createNewService = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_SERVICE}/${userId}`,
      {
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allServices related caches
      await deletePatternCache(`${cacheKeyNames.SERVICES}-*`);
      await deletePatternCache(`${cacheKeyNames.FE_SERVICES}-*`);
      console.log(
        `createNewService: ${cacheKeyNames.SERVICES} ${cacheKeyNames.FE_SERVICES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new service CLIENT: ${error}`);

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

// GET ALL SERVICES
export const getAllServices = async (
  userId,
  search,
  page,
  pageSize,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.SERVICES}-${search || "search"}-${page || 1}-${pageSize || 5}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllServices: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue?.services || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_SERVICES}/${userId}`
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
      console.log("getAllServices: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data?.services || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all services CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET A PERTICULAR SERVICE
export const getPerticularService = async (userId, slug, targetId) => {
  const keyName = `${cacheKeyNames.SERVICE_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularService: Cache HIT ✅");

    return {
      success: true,
      fetchData: parsedValue?.serviceCommonDetails || {},
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_SERVICE_DETAILS}/${userId}?targetId=${targetId}`
  );

  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log("getPerticularService: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        fetchData: response.data?.serviceCommonDetails || {},
        translationDetails: response.data?.translationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting service details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR SERVICE
export const updatePerticularService = async (userId, slug, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.EDIT_SERVICE}/${userId}?targetId=${targetId}`,
      {
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all services related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.SERVICE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.SERVICES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_SERVICES}-*`),
      ]);
      console.log(
        `updatePerticularService: ${cacheKeyNames.SERVICE_DETAILS} ${cacheKeyNames.SERVICES} ${cacheKeyNames.FE_SERVICES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating service article CLIENT: ${error}`);

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

// DELETE A PERTICULAR SERVICE
export const deletePerticularService = async (userId, slug, targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_SERVICE}/${userId}?targetId=${targetId}`
  );

  try {
    // Make the DELETE request using fetch
    const response = await axios.delete(url.toString());

    if (response.data.success && response.status === 200) {
      // Revalidate the service related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.SERVICE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.SERVICES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_SERVICES}-*`),
      ]);
      console.log(
        `deletePerticularService: ${cacheKeyNames.SERVICE_DETAILS} ${cacheKeyNames.SERVICES} ${cacheKeyNames.FE_SERVICES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data?.message || "Service deleted successfully.",
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the service CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR SERVICE ACTIVE STATUS
export const togglePerticularServiceActiveStatus = async (
  userId,
  slug,
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_ACTIVE_SERVICE_STATUS}/${userId}?targetId=${targetId}`
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.SERVICE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.SERVICES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_SERVICES}-*`),
      ]);
      console.log(
        `togglePerticularServiceActiveStatus: ${cacheKeyNames.SERVICE_DETAILS} ${cacheKeyNames.SERVICES} ${cacheKeyNames.FE_SERVICES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing service active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR SERVICE FEATURED STATUS
export const togglePerticularServiceFeaturedStatus = async (
  userId,
  slug,
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_FEATURED_SERVICE_STATUS}/${userId}?targetId=${targetId}`
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the services related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.SERVICE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.SERVICES}-*`),
        deletePatternCache(`${cacheKeyNames.FE_SERVICES}-*`),
      ]);
      console.log(
        `togglePerticularServiceFeaturedStatus: ${cacheKeyNames.SERVICE_DETAILS} ${cacheKeyNames.SERVICES} ${cacheKeyNames.FE_SERVICES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing service featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
