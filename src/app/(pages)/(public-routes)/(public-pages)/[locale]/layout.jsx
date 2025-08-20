"use server";

import {
  ContactsWidget,
  PublicPageFooter,
  PublicPageNavbar,
} from "@/components/public-pages-component";

import {
  getAllPublicFiles,
  getAllPublicLanguages,
  getAllPublicWebsiteSettings,
} from "@/actions/frontEndActions/action";
import { fetchPublicParentLayoutData } from "@/actions/frontEndPageDataActions";
import StoreProvider from "@/app/StoreProvider";
import {
  libreBaskerville,
  playfairDisplay,
  poppinsRg,
  robotoRg,
  sourceSerif,
} from "@/config/fonts";
import { getImageFullUrl } from "@/utils/helper-functions";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Toaster } from "sonner";
import "../../../../globals.css";

// ✅ **Async function to generate viewport**
export const generateViewport = async () => {
  return {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: "no",
  };
};

// ✅ **Async function to fetch metadata from Website Settings**
export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const baseIcon = "/amin-ul-miulk-law-firm/website-logo/rounded-logo.svg";

  // Default fallback values from env
  const defaultTitle =
    process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Title";
  const defaultDescription =
    process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION ||
    "Default Description";
  const defaultKeywords = "default,app,nextjs";

  try {
    // Fetch data in parallel
    const [websiteSettingsResponse, fielsResponse] = await Promise.all([
      getAllPublicWebsiteSettings(),
      getAllPublicFiles(),
    ]);

    // Extract settings values
    const { meta_title, meta_description, meta_keywords, meta_image } =
      getFESettingsFieldValues(websiteSettingsResponse?.settingsData ?? [], [
        "meta_title",
        "meta_description",
        "meta_keywords",
        "meta_image",
      ]);

    // Resolve meta image URL if available
    const metaImage = getImageFullUrl(
      getFileSettingsValue(fielsResponse?.filesList ?? [], meta_image)
        ?.fileUrl ?? null
    );

    return {
      title: meta_title || defaultTitle,
      description: meta_description || defaultDescription,
      keywords: meta_keywords || defaultKeywords,
      // viewport:
      //   "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      icons: {
        icon: metaImage || baseIcon,
      },
    };
  } catch (error) {
    console.error("❌ Metadata generation failed:", error);

    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: defaultKeywords,
      // viewport:
      //   "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      icons: {
        icon: baseIcon,
      },
    };
  }
};

const PublicPageLayout = async ({ children, params }) => {
  const { locale } = await params;
  // if (!routing.locales.includes(locale)) {
  //   notFound();
  // }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  const currentLanguage = locale || "en";
  const { fetchData } = await getAllPublicLanguages();

  const currentlangRTLStatus =
    (fetchData.length > 0 ? fetchData : []).find(
      (lang) => lang.code === currentLanguage
    )?.rtl ?? false;

  // Fetch data from backend
  const { settingsData, filesList, languageList } =
    await fetchPublicParentLayoutData();

  // Extract settings values
  const {
    primary_color,
    primary_hover_color,
    secondary_color,
    text_dark_color,
    text_light_color,
  } = getFESettingsFieldValues(settingsData, [
    "primary_color",
    "primary_hover_color",
    "secondary_color",
    "text_dark_color",
    "text_light_color",
  ]);

  return (
    <html lang={locale} dir={currentlangRTLStatus ? "rtl" : "ltr"}>
      <body
        className={`${poppinsRg.variable} ${playfairDisplay.variable} ${robotoRg.variable} ${sourceSerif.variable} ${libreBaskerville.variable} antialiased`}
        style={{
          // Set CSS variables from backend
          ["--primary-color"]: primary_color || "#2b5591",
          ["--primary-hover-color"]: primary_hover_color || "#4169E1",
          ["--secondary-color"]: secondary_color || "#91762b",
          ["--text-dark-color"]: text_dark_color || "#36393B",
          ["--text-light-color"]: text_light_color || "#ffffff",
        }}
      >
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <main className="min-w-screen min-h-screen bg-white dark:bg-dark">
              <PublicPageNavbar
                currentLanguage={currentLanguage}
                settingsData={settingsData}
                filesList={filesList}
                languageList={languageList}
              />
              <div className="relative">
                {children}
                <ContactsWidget />
              </div>
              <PublicPageFooter
                currentLanguage={currentLanguage}
                settingsData={settingsData}
                filesList={filesList}
                languageList={languageList}
              />
            </main>

            <Toaster richColors />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default PublicPageLayout;
