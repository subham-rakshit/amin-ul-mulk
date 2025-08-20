import { format, formatDistanceToNowStrict } from "date-fns";
import { customAlphabet } from "nanoid";
import { toast } from "react-toastify";

// Define custom nanoid generators
const nanoidSlug = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 4); // 4 characters
const nanoidTitle = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4); // 4 characters

// Formate Pathname
export const useFormattedPathname = (path) => {
  const pathSegments = path
    .split("/")
    .filter((segment) => segment !== "" && segment !== "admin"); // Example -> /admin/dashboard/analytics -> [dashboard, analytics]

  // Find the index of "update" in the path segments
  const updateIndex = pathSegments.indexOf("update");

  // Check if "update" exists and if there is a segment after it
  if (updateIndex !== -1 && updateIndex < pathSegments.length - 1) {
    pathSegments.pop(); // Remove the last segment
  }

  return pathSegments.join("-");
};

// Make Category Tree Structure
export const useFormattedCategoryTree = (categories) => {
  // 1: Create a map to hold each category by its _id and initialize an empty children array for each category
  const map = {};
  categories.forEach((category) => {
    // Store each category in the map using its _id as the key and initialize an empty children array
    map[category._id] = { ...category, children: [] };
  });

  // 2: Initialize an empty array to store the final tree structure
  const tree = [];

  // 3: Iterate through the categories again to build the tree
  categories.forEach((category) => {
    if (category.parentCategoryId) {
      // If the category has a parent, find the parent in the map and add this category to the parent's children array
      map[category.parentCategoryId].children.push(map[category._id]);
    } else {
      // If the category has no parent (i.e., it's a top-level category), add it directly to the tree array

      tree.push(map[category._id]);
    }
  });

  // 4: Return the final tree structure
  return tree;
};

// Make Menu Tree Structure
export const useFormattedMenuTree = (menus) => {
  // 1: Create a map to hold each menu by its _id and initialize an empty children array for each category
  const map = {};
  menus.forEach((menu) => {
    // Store each menu in the map using its _id as the key and initialize an empty children array
    map[menu._id] = { ...menu, children: [] };
  });

  // 2: Initialize an empty array to store the final tree structure
  const tree = [];

  // 3: Iterate through the menus again to build the tree
  menus.forEach((menuItem) => {
    if (menuItem.parentMenu) {
      // If the menu has a parent, find the parent in the map and add this menu to the parent's menu array
      map[menuItem.parentMenu].children.push(map[menuItem._id]);
    } else {
      // If the menu has no parent (i.e., it's a top-level menu), add it directly to the tree array

      tree.push(map[menuItem._id]);
    }
  });

  // 4: Return the final tree structure
  return tree;
};

// Make Menu Sorted by Order Number with Active Status
export const useSortedMenuListByOrderNumber = (menuList) => {
  return menuList
    .filter((menu) => menu.activeStatus)
    .sort((a, b) => Number(b.orderNumber || 1) - Number(a.orderNumber || 1));
};

// Generate Slug
export const useGenerateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "r") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
    .trim();
};

// Generate Title
export const useGenerateTitle = (text) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Nanoid Slug Generator
export const useSlugNanoid = () => {
  return nanoidSlug();
};

// Nanoid Title Generator
export const useTitleNanoid = () => {
  return nanoidTitle();
};

// Formate File Size
export const useFormateFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, index)).toFixed(2); // Keep 2 decimal places

  return `${value} ${sizes[index]}`;
};

// Formate Date
export const useFormatISODate = (
  isoDateString,
  locale = "en-GB",
  options = { day: "numeric", month: "short", year: "numeric" }
) => {
  if (!isoDateString) {
    return "Invalid Date";
  }

  try {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    return "Invalid Date";
  }
};

// Success Toast Message
export const useSuccessToast = (message) => {
  toast.success(message || "Success.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// Error Toast Message
export const useErrorToast = (message) => {
  toast.error(message || "Something went wrong. Please try again later.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// GROUP UI Permission Check
export const useGroupUIPermissionCheck = (
  adminRole,
  permissionsList,
  requireList
) => {
  if (adminRole === "Super Admin" || !requireList) return true;

  return requireList.some((item) => permissionsList.includes(item));
};

// PERTICULAR UI Permission Check
export const useUIPermissionCheck = (
  adminRole,
  permissionsList,
  requiredPermission
) => {
  if (adminRole === "Super Admin") return true;

  return adminRole && permissionsList.includes(requiredPermission);
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND DEFAULT STATUS (False)
export const useFilterActiveNonDefaultItems = (
  items = [],
  activeKeyName = "isActive",
  defaultKeyName = "isDefault"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[activeKeyName] && !item[defaultKeyName]);
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND RETURN THE LATEST N ITEMS (IF SPECIFIED)
export const useFilterActiveItems = (
  items = [],
  activeKeyName = "isActive",
  limit = null
) => {
  if (!items || items.length === 0) return [];

  const filteredItems = items.filter((item) => item[activeKeyName]);

  return limit && limit > 0
    ? [...filteredItems].slice(0, limit)
    : [...filteredItems];
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND FEATURED STATUS (False)
export const useFilterActiveNonFeaturedItems = (
  items = [],
  activeKeyName = "isActive",
  featuredKeyName = "isFeatured"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[activeKeyName] && !item[featuredKeyName]);
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND FEATURED STATUS (True)
export const useFilterActiveFeaturedItems = (
  items = [],
  activeKeyName = "isActive",
  featuredKeyName = "isFeatured"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[activeKeyName] && item[featuredKeyName]);
};

// FILTER ITEMs BY FEATURED STATUS (True)
export const useFilterFeaturedItems = (
  items = [],
  featuredKeyName = "isFeatured"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[featuredKeyName]);
};

// FILTER NEWS_CATEGORIES BY ACTIVE STATUS (True) AND DEFAULT STATUS (False)
export const useFilterCategoryByActiveStatus = (items) => {
  if (!items || !items.length) return [];

  return items.filter((item) => item.activeStatus && !item.isDefault);
};

// FILTER NEWS_ARTICLES BY ACTIVE STATUS (True)
export const useFilterNewsArticlesByActiveStatus = (items) => {
  if (!items || !items.length) return [];

  return items.filter((item) => item.isActive);
};

// Transform Date into -> 5 min Mar 11, 2025
export const useTransformDate = (createdAt) => {
  const date = new Date(createdAt);
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: false });
  const formattedDate = format(date, "MMM dd, yyyy"); // Example: May 05, 2024

  return `${timeAgo} ${formattedDate}`;
};

// Transform Date into -> 21.12.2024
export const useTransformCustomDate = (timeStamp) => {
  const date = new Date(timeStamp);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear(); // Keep the actual year

  return `${day}.${month}.${year}`;
};

// Extract slug and targtId
export const useExtractSlugAndTargetId = (slug) => {
  const itemsLength = slug.split("-").length;

  if (itemsLength === 0) {
    return { slugData: "", targetId: "" };
  }

  const targetId = slug.split("-").pop();
  const slugData = slug
    .split("-")
    .slice(0, itemsLength - 1)
    .join("-");

  return { slugData, targetId };
};

// EN to AR Number Conversion
export const useConverEnToArNumber = (number) => {
  const enToArMap = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
    ".": ",",
  };

  return number
    .toString()
    .split("")
    .map((char) => {
      return enToArMap[char] !== undefined ? enToArMap[char] : char;
    })
    .join("");
};

// EN to Pashto/Dari Number Conversion
export const useConvertEnToPsPrsNumber = (number, lang = "en") => {
  if (lang === "en") return number;

  const enToPsPrsMap = {
    0: "۰", // U+06F0
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    ".": "٫", // Arabic decimal separator (U+066B)
  };

  return number
    .toString()
    .split("")
    .map((char) =>
      enToPsPrsMap[char] !== undefined ? enToPsPrsMap[char] : char
    )
    .join("");
};

// AR to EN Number Conversion
const useConvertArToEnNumber = (arNumber) => {
  const arToEnMap = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
    "٫": ".", // Arabic decimal to dot
  };

  return arNumber
    .split("")
    .map((char) => (arToEnMap[char] !== undefined ? arToEnMap[char] : char))
    .join("");
};

// RTL Number Sum
export const useRTLNumberSum = (numbers) => {
  const numList = numbers
    .map((num) => parseFloat(useConvertArToEnNumber(num)))
    .filter((num) => !isNaN(num));
  const sum = numList.reduce((acc, num) => acc + num, 0).toFixed(2);

  return useConverEnToArNumber(sum);
};

// Extract section's ids from the TEXT_AREA_VALUE
export const useExtractSectionIds = (textAreaValue) => {
  // Create a temporary DOM element to parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(textAreaValue, "text/html");

  // Select all <section> elements
  const sections = doc.querySelectorAll("section");

  // Extract the 'id' values from each <section> element
  const idArray = Array.from(sections).map((section) => section.id);

  // Filter out any empty or duplicate values
  const uniqueIds = idArray.filter(
    (id, index) => id && idArray.indexOf(id) === index
  );

  return uniqueIds;
};
