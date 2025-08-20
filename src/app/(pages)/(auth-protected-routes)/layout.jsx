import { getSessionUserData } from "@/actions/authActions";
import {
  getAllPublicFiles,
  getAllPublicLanguages,
  getAllPublicWebsiteSettings,
} from "@/actions/frontEndActions/action";
import { globalStyleObj } from "@/app/assets/styles";
import StoreProvider from "@/app/StoreProvider";
import { HandleSessionEnd } from "@/components";
import AuthProtectedLayoutProvider from "@/components/navigation/AuthProtectedLayoutProvider";
import {
  poppinsBl,
  poppinsBo,
  poppinsELi,
  poppinsLi,
  poppinsMd,
  poppinsRg,
  poppinsSb,
} from "@/config/fonts";
import AuthProvider from "@/context/AuthProvider";
import DarkModeProvider from "@/context/DarkModeProvider";
import { getImageFullUrl } from "@/utils/helper-functions";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";
import { verifySession } from "@/utils/verifySession";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import "../../globals.css";

// ✅ **Async function to fetch metadata from Website Settings**
export const generateMetadata = async () => {
  try {
    const [websiteSettingsResponse, fielsResponse] = await Promise.all([
      getAllPublicWebsiteSettings(),
      getAllPublicFiles(),
    ]);

    const { meta_title, meta_description, meta_keywords, meta_image } =
      getFESettingsFieldValues(websiteSettingsResponse?.settingsData ?? [], [
        "meta_title",
        "meta_description",
        "meta_keywords",
        "meta_image",
      ]);

    const metaImage = getImageFullUrl(
      getFileSettingsValue(fielsResponse?.filesList ?? [], meta_image)
        ?.fileUrl ?? null
    );

    return {
      title: meta_title,
      description: meta_description,
      keywords: meta_keywords,
      icons: { icon: metaImage },
    };
  } catch (error) {
    console.log(`❌ Error in generating metadata: ${error}`);

    return {
      title: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Title",
      description:
        process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION ||
        "Default Description",
      keywords: "default, app, nextjs",
      icons: { icon: "/amin-ul-miulk-law-firm/website-logo/rounded-logo.svg" },
    };
  }
};

const CommonLayoutForAdminAndUser = async ({ children }) => {
  const currentLanguage = await getLanguageFromCookie();
  const { fetchData } = await getAllPublicLanguages();

  const session = await verifySession();
  const { success, userDetails, permissionsList, logout } = session
    ? await getSessionUserData(session.userId)
    : { success: false, userDetails: {}, permissionsList: [], logout: true };

  if (logout) {
    return <HandleSessionEnd />;
  }

  const currentlangRTLStatus =
    (fetchData.length > 0 ? fetchData : []).find(
      (lang) => lang.code === currentLanguage
    )?.rtl ?? false;

  return (
    <html lang={currentLanguage} dir={currentlangRTLStatus ? "rtl" : "ltr"}>
      <body
        className={`${poppinsRg.variable} ${poppinsMd.variable} ${poppinsBl.variable} ${poppinsBo.variable} ${poppinsLi.variable} ${poppinsELi.variable} ${poppinsSb.variable} antialiased`}
      >
        <AuthProvider>
          <StoreProvider>
            <main
              id="full-screen-toggle-container"
              className={`${globalStyleObj.backgroundLight800Dark600} flex w-full justify-center`}
            >
              <DarkModeProvider>
                <AuthProtectedLayoutProvider
                  userDetails={success ? userDetails : {}}
                  permissionsList={success ? permissionsList : []}
                >
                  {children}
                </AuthProtectedLayoutProvider>
              </DarkModeProvider>

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
            </main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default CommonLayoutForAdminAndUser;
