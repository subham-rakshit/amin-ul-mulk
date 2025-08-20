"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import axios from "axios";
import { deleteCache, getCache, setCache } from "../../lib/redis/actions";

// GET SESSION ADMIN USER DETAILS
export const getSessionUserData = async (sessionId) => {
  const keyName = `${cacheKeyNames.SESSION_USER_DETAILS}-${sessionId || "sessionId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getSessionUserDetails: Cache HIT ✅");
    return {
      success: true,
      userDetails: parsedValue.userDetails,
      permissionsList: parsedValue.permissionsList,
      logout: false,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_SESSION_USER_DETAILS}`
  );

  const params = {
    sessionId: sessionId || "",
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log(
        "getSessionUserDetails: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        userDetails: response.data.userDetails,
        permissionsList: response.data.permissionsList,
        logout: false,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting session user details CLIENT: ${error}`);

    if (error.response.status === 401) {
      return {
        success: false,
        message: "Session expired. Please log in again.",
        logout: true,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE ADMIN PROFILE DETAILS
export const updateProfileDetails = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_PROFILE}`,
      {
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      await deleteCache(
        `${cacheKeyNames.SESSION_USER_DETAILS}-${data?._id || "sessionId"}`
      );
      console.log(
        `updateProfileDetails: ${cacheKeyNames.SESSION_USER_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the profile CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
