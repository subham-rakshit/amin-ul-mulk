"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { deletePatternCache, getCache, setCache } from "@/lib/redis/actions";
import axios from "axios";

// [GET] HEADER MENUS
export const getAllPublicMenus = async (search = "") => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.MENUS}-${search || "search"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    return {
      fetchData: parsedValue?.menus || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_MENUS}?search=${search || ""}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log("getAllPublicMenus: Database Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        fetchData: response.data?.menus || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all menus FE CLIENT: ${error}`);

    return {
      fetchData: [],
    };
  }
};

// [GET] LANGUAGES
export const getAllPublicLanguages = async () => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.LANGUAGES}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicLanguages: Cache HIT ✅");
    return {
      fetchData: parsedValue?.languageList || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_LANGUAGES}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log(
        "getAllPublicLanguages: Databse Call and storing in cache 💾"
      );

      return {
        fetchData: response.data?.languageList || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all languages FE CLIENT: ${error}`);
    return {
      fetchData: [],
    };
  }
};

// [GET] WEBSITE SETTINGS
export const getAllPublicWebsiteSettings = async () => {
  const { parsedValue } = await getCache(cacheKeyNames.WEBSITE_SETTINGS);

  if (parsedValue) {
    console.log("getAllSettings: Cache HIT ✅");

    return {
      settingsData: parsedValue?.settingsList || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_WEBSITE_SETTINGS}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(
        cacheKeyNames.WEBSITE_SETTINGS,
        JSON.stringify(response.data)
      );
      console.log("getAllSettings: Databse Call and storing in cache 💾");

      return {
        settingsData: response.data?.settingsList || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all settings FE CLIENT: ${error}`);

    return {
      settingsData: [],
    };
  }
};

// [GET] FILES
export const getAllPublicFiles = async () => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.FE_FILES}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicFiles: Cache HIT ✅");

    return {
      filesList: parsedValue?.files || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_FILES}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllPublicFiles: Databse Call and storing in cache 💾");

      return {
        filesList: response.data?.files || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all files FE CLIENT: ${error}`);

    return {
      filesList: [],
    };
  }
};

// [GET] NEWS LISTING
export const getAllPublicNewsArticles = async (feature) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.NEWS_ARTICLES_FE}-${feature === true ? "true" : "all"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicNewsArticles: Cache HIT ✅");
    return {
      fetchData: parsedValue?.newsArticles || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_NEWS_ARTICLES}?feature=${feature === true ? true : "all"}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log(
        "getAllPublicNewsArticles: Databse Call and storing in cache 💾"
      );

      return {
        fetchData: response.data?.newsArticles || [],
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting all news articles FE CLIENT: ${error.message}`
    );

    return {
      fetchData: [],
    };
  }
};

// [GET DETAILS] NEWS ITEM DETAILS
export const getPublicNewsArticleDetails = async (slug, lang) => {
  const keyName = `${cacheKeyNames.NEWS_ARTICLE_DETAILS_FE}-${slug || "slug"}-${lang || "en"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPublicNewsArticleDetails: Cache HIT ✅");

    return {
      success: true,
      newsArticleData: parsedValue?.newsArticleDetails || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PUBLIC_NEWS_ARTICLE_DETAILS}/${slug}?lang=${lang || "en"}`
  );

  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log(
        "getPublicNewsArticleDetails: Databse Call and storing in cache 💾"
      );

      return {
        newsArticleData: response.data?.newsArticleDetails || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting news article details FE CLIENT: ${error}`);
    return {
      newsArticleData: {},
    };
  }
};

// [GET] CONTACT LISTING
export const getAllPublicContacts = async (search, page, pageSize, type) => {
  const keyName = `${cacheKeyNames.CONTACTS}-${search || "search"}-${page || 0}-${pageSize || 0}-${type || "branch"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicContacts: Cache HIT ✅");

    return {
      fetchData: parsedValue.contacts,
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_CONTACTS}`
  );

  const params = {
    search: search || "",
    page,
    pageSize,
    type: type || "branch",
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
      console.log("getAllPublicContacts: Databse Call and storing in cache 💾");

      return {
        fetchData: response.data?.contacts || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all contacts FE CLIENT: ${error}`);

    return {
      fetchData: [],
      paginationData: {},
    };
  }
};

// [GET] CONTACT DETAILS
export const getPublicContactDetails = async (slug) => {
  const keyName = `${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPublicContactDetails: Cache HIT ✅");

    return {
      contactDetails: parsedValue?.contactDetails || {},
      translationDetails: parsedValue?.translationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PUBLIC_CONTACT_DETAILS}?slug=${slug || ""}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log(
        "getPublicContactDetails: Databse Call and storing in cache 💾"
      );

      return {
        contactDetails: response.data?.contactDetails || {},
        translationDetails: response.data?.translationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting contact details FE CLIENT: ${error}`);

    return {
      contactDetails: {},
      translationDetails: {},
    };
  }
};

// [POST] CONTACT QUERY FORM SUBMISSION
export const submitContactQuery = async (data, lang = "en") => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.SUBMIT_CONTACT_QUERY}`
  );

  try {
    const response = await axios.post(url.toString(), {
      ...data,
      lang,
    });

    if (response.data.success && response.status === 201) {
      await deletePatternCache(`${cacheKeyNames.CONTACT_QUERIES}-*`);
      console.log(
        `submitContactQuery: ${cacheKeyNames.CONTACT_QUERIES} cache deleted ✅`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in submitting contact query FE CLIENT: ${error}`);

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
        message: "An unexpected error occurred Please try again later",
      };
    }
  }
};

// [GET] TESTIMONIAL LISTING
export const getAllPublicTestimonials = async () => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.TESTIMONIALS}-`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicTestimonials: Cache HIT ✅");
    return {
      fetchData: parsedValue?.testimonials || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_TESTIMONIALS}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log(
        "getAllPublicTestimonials: Databse Call and storing in cache 💾"
      );

      return {
        fetchData: response.data?.testimonials || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all testimonials FE CLIENT: ${error}`);

    return {
      fetchData: [],
    };
  }
};

// [GET] CAREER LISTING
export const getAllPublicCareers = async () => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.CAREERS}-`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicCareers: Cache HIT ✅");
    return {
      fetchData: parsedValue?.careers || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_CAREERS}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllPublicCareers: Databse Call and storing in cache 💾");

      return {
        fetchData: response.data?.careers || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all careers FE CLIENT: ${error}`);

    return {
      fetchData: [],
    };
  }
};

// [GET] PAGE CMS CONTENT
export const getPublicPageCMSContent = async (linkId, lang) => {
  const keyName = `${cacheKeyNames.PAGE_CMS_FE_CONTENT_DETAILS}-${linkId || "linkId"}-${lang}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPublicPageCMSContent: Cache HIT ✅");

    return {
      success: true,
      contentDetails: parsedValue?.contentData || {},
      otherInfoData: parsedValue?.otherInfo || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PUBLIC_PAGE_CMS_CONTENT}/${linkId}?lang=${lang || "en"}`
  );

  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log(
        "getPublicPageCMSContent: Databse Call and storing in cache 💾"
      );
      await setCache(keyName, JSON.stringify(response.data));

      return {
        contentDetails: response.data?.contentData || {},
        otherInfoData: response.data?.otherInfo || {},
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting cms page content details FE CLIENT: ${error}`
    );

    return {
      contentDetails: {},
      otherInfoData: {},
    };
  }
};

// [GET] COURSES LISTING
export const getAllPublicCourses = async () => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.COURSES}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicCourses: Cache HIT ✅");
    return {
      fetchData: parsedValue?.courses || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_COURSES}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllPublicCourses: Databse Call and storing in cache 💾");

      return {
        fetchData: response.data?.courses || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all courses FE CLIENT: ${error}`);

    return {
      fetchData: [],
    };
  }
};

// [GET] COURSE DETAILS
export const getPublicCourseDetails = async (slug, lang = "en") => {
  const keyName = `${cacheKeyNames.FE_COURSE_DETAILS}-${slug || "slug"}-${lang}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPublicCourseDetails: Cache HIT ✅");

    return {
      courseDetails: parsedValue?.courseData || {},
      packagesDetails: parsedValue?.packagesData || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PUBLIC_COURSE_DETAILS}`
  );

  const params = {
    slug: slug || "",
    lang: lang,
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
        "getPublicCourseDetails: Databse Call and storing in cache 💾"
      );
      await setCache(keyName, JSON.stringify(response.data));

      return {
        courseDetails: response.data?.courseData || {},
        packagesDetails: response.data?.packagesData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting course details FE CLIENT: ${error}`);

    return {
      courseDetails: {},
    };
  }
};

// [GET] SERVICE LISTING
export const getAllPublicServices = async (page = 0, pageSize = 0) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.FE_SERVICES}-${page}-${pageSize}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicServices: Cache HIT ✅");
    return {
      fetchData: parsedValue?.services || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_SERVICES}?page=${page}&pageSize=${pageSize}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllPublicServices: Databse Call and storing in cache 💾");

      return {
        fetchData: response.data?.services || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all services FE CLIENT: ${error}`);

    return {
      fetchData: [],
      paginationData: {},
    };
  }
};

// [GET] SERVICE DETAILS
export const getPublicServiceDetails = async (slug) => {
  const keyName = `${cacheKeyNames.SERVICE_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPublicServiceDetails: Cache HIT ✅");

    return {
      fetchData: parsedValue?.serviceCommonDetails || {},
      translationData: parsedValue?.translationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PUBLIC_SERVICE_DETAILS}/${slug}`
  );

  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log(
        "getPublicServiceDetails: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        fetchData: response.data?.serviceCommonDetails || {},
        translationData: response.data?.translationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting service details FE CLIENT: ${error}`);
    return {
      serviceCommonDetails: {},
      translationData: {},
    };
  }
};

// [GET] PACKAGES LISTING
export const getAllPublicPackages = async (page = 0, pageSize = 0) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.FE_CASE_PACKAGES}-${page}-${pageSize}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPublicPackages: Cache HIT ✅");
    return {
      fetchData: parsedValue?.packages || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PUBLIC_CASE_PACKAGES}?page=${page}&pageSize=${pageSize}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllPublicPackages: Databse Call and storing in cache 💾");

      return {
        fetchData: response.data?.packages || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all packages FE CLIENT: ${error}`);

    return {
      fetchData: [],
      paginationData: {},
    };
  }
};
