"use client";

import { getImageFullUrl } from "@/utils/helper-functions";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const services = [
  "service_1", // Family Law
  "service_2", // Financial Settlements
  "service_3", // Construction & Engineering Disputes
  "service_4", // Real Estate Disputes
  "service_5", // Civil Disputes
  "service_6", // Financial Disputes
  "service_7", // Commercial Disputes
  "service_8", // Arbitration
  "service_9", // Criminal
  "service_10", // Settlements
];

const HomePagePopup = ({
  currentLocale = "en",
  cmsData = {},
  filesList = [],
}) => {
  const translate = useTranslations();
  // const dispatch = useDispatch();
  // const { showHomePagePopup, wasPopupVisible } = useSelector(
  //   (state) => state.popup
  // );
  const [showNewsLetterPopup, setShowNewsLetterPopup] = useState(false);

  // useEffect(() => {
  //   if (!wasPopupVisible) {
  //     const timeout = setTimeout(() => {
  //       window.scrollTo(0, 0); // ✅ Scroll to top
  //       dispatch(visibleHomePagePopup());
  //       dispatch(setWasPopupVisible());
  //       document.body.style.overflow = "hidden"; // ✅ Disable scrolling
  //     }, 1000);

  //     return () => {
  //       clearTimeout(timeout);
  //       document.body.style.overflow = ""; // ✅ Restore scrolling on unmount
  //     };
  //   }
  // }, [dispatch, wasPopupVisible]);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenNewsLetterPopup");
    if (!hasSeenPopup) {
      const timeout = setTimeout(() => {
        window.scrollTo(0, 0);
        sessionStorage.setItem("hasSeenNewsLetterPopup", "true");
        setShowNewsLetterPopup(true);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  useEffect(() => {
    if (showNewsLetterPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showNewsLetterPopup]);

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  if (!showNewsLetterPopup) return null;

  // Handle Data Empty
  if (!cmsData.footer_image && !cmsData.popup_content) return null;

  return (
    <div
      className={`w-[100vw] h-[100vh] absolute inset-0 z-[999] bg-[#00000090] flex justify-center items-center`}
    >
      <div className="relative w-[90%] md:max-w-[650px] h-fit rounded-[12px] overflow-hidden">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
          {getImageURL(cmsData.footer_image) ? (
            <div className="hidden md:flex relative size-full overflow-hidden">
              <Image
                src={getImageURL(cmsData.footer_image)}
                alt="Popup Image"
                fill
                sizes="(max-width: 767px) 100vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="w-full h-full bg-[#E7E7E7] px-5 py-5 border border-black-500 relative">
            <button
              type="button"
              onClick={() => {
                setShowNewsLetterPopup(false);
                document.body.style.overflow = "";
              }}
              className="w-[30px] h-[30px] absolute top-0 right-0 m-1 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-all duration-500 ease-in-out"
            >
              <MdClose size={25} className="text-light-color" />
            </button>

            {cmsData?.popup_content ? (
              <div
                className="text-dark-color secondary-font-family font-light mt-3 tracking-normal"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTMLServer(cmsData.popup_content),
                }}
              />
            ) : null}

            <form>
              <input
                type="text"
                className={`w-full border border-[#00000030] rounded-[8px] bg-[#ffffff1f] backdrop-blur-md p-[20px] text-gray-400 placeholder-[#00000060] secondary-font-family focus:ring-0 focus-outline-none focus:border-[#fff] h-[50px] mt-4`}
                placeholder={translate("email_placeholder")}
              />

              {/* <BackgroundRevealButton
                href="/services"
                label="Subscribe"
                borderColor="border-[#36393B]"
                textColor="text-gray-400"
                textSize="body2"
                hoverBgColor="group-hover:bg-gold"
                className="w-full px-4 py-[12px] mt-5"
                // roundedStyle="rounded-none"
              /> */}
              <button
                type="submit"
                className="w-full px-2 py-3 bg-transparent hover:bg-secondary rounded-[50px] text-dark-color hover:text-light-color transition-all duration-500 ease-in-out mt-4 secondary-font-family font-semibold border border-dark-color hover:border-light-color"
              >
                {translate("Subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePagePopup;
