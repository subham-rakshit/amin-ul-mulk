import { hrefLangMap } from "@/i18n/routing";

export const generateMetaStructure = ({
  currentLanguage = "en",
  isPageInfoExist = false,
  otherInfoData = {},
  path = null,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const canonicalUrl = path
    ? `${baseUrl}/${currentLanguage}${path.startsWith("/") ? path : `/${path}`}`
    : `${baseUrl}/${currentLanguage}`;

  const defaultTitle =
    process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Title";
  const defaultDescription =
    process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION ||
    "Default Description";

  // Get current hreflang mapping
  const currentHrefLang = hrefLangMap[currentLanguage] || "en-ae";

  return {
    title:
      isPageInfoExist && otherInfoData.pageMetaTitle
        ? otherInfoData.pageMetaTitle
        : defaultTitle,
    description:
      isPageInfoExist && otherInfoData.pageMetaDescription
        ? otherInfoData.pageMetaDescription
        : defaultDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [currentHrefLang]: canonicalUrl,
      },
    },
    openGraph: {
      title:
        isPageInfoExist && otherInfoData.pageMetaTitle
          ? otherInfoData.pageMetaTitle
          : defaultTitle,
      description:
        isPageInfoExist && otherInfoData.pageMetaDescription
          ? otherInfoData.pageMetaDescription
          : defaultDescription,
      url: canonicalUrl,
      type: "website",
      locale:
        currentLanguage === "en"
          ? "en_US"
          : currentLanguage === "ar"
            ? "ar_EG"
            : currentLanguage,
      siteName: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Name",
    },
  };
};
