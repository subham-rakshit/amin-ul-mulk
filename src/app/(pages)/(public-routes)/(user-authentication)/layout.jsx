import Image from "next/image";

import {
  getAllPublicFiles,
  getAllPublicWebsiteSettings,
} from "@/actions/frontEndActions/action";
import { globalStyleObj } from "@/app/assets/styles";
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
import { getImageFullUrl } from "@/utils/helper-functions";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../globals.css";

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

const UserAuthenticationLayout = ({ children, ...props }) => {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${poppinsRg.variable} ${poppinsMd.variable} ${poppinsBl.variable} ${poppinsBo.variable} ${poppinsLi.variable} ${poppinsELi.variable} ${poppinsSb.variable} antialiased`}
      >
        <AuthProvider>
          <main className="relative min-h-screen w-full bg-[#F3F3F9]">
            <section className="relative min-h-[50vh] bg-auth-hero-pattern bg-cover bg-center">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black-500/60 px-2">
                {/* Content */}
                <div
                  className={`${globalStyleObj.flexColCenter} size-full gap-4`}
                >
                  <div className="relative w-[200px] h-[80px] overflow-hidden">
                    <Image
                      src="/amin-ul-miulk-law-firm/website-logo/footer-logo.svg"
                      alt="light logo"
                      fill
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1440 120"
                className="absolute inset-x-0 bottom-0 z-10"
              >
                <path
                  d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
                  fill="#F3F3F9"
                ></path>
              </svg>
            </section>

            <section className="relative min-h-[50vh] w-full">
              <div
                className={`${globalStyleObj.flexColCenter} relative top-[-80px] z-[99] w-full gap-4 px-3 sm:px-5`}
              >
                {children}
              </div>
              <p
                className={`absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-center font-poppins-rg text-[13px] text-light-weight-400`}
              >
                © Amin Ul Mulk Law Firm 2025. All Rights Reserved
              </p>
            </section>
          </main>

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
        </AuthProvider>
      </body>
    </html>
  );
};

export default UserAuthenticationLayout;
