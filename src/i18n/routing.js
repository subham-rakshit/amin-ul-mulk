import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ps", "prs"],

  // Used when no locale matches
  defaultLocale: "en",
});

// Define all supported hreflang mappings (for meta link)
export const hrefLangMap = {
  en: "en-ae",
  ps: "ps-ae",
  prs: "prs-ae",
};
