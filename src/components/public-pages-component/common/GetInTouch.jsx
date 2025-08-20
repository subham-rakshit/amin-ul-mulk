import {
  getAllPublicFiles,
  getAllPublicServices,
  getPublicPageCMSContent,
} from "@/actions/frontEndActions/action";
import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { GetInTouchFormSection } from "..";

const GetInTouch = async ({ currentLanguage = "en" }) => {
  const [contentResponse, filesResponse, servicesResponse] = await Promise.all([
    getPublicPageCMSContent("home", currentLanguage),
    getAllPublicFiles(),
    getAllPublicServices(),
  ]);

  // Extract necessary data
  const homeContentData = contentResponse?.contentDetails || {};
  const filesList = filesResponse?.filesList || [];

  const contactFormHeading =
    homeContentData?.["home-section-11-contact-heading"] || null;

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <section
      id="home-page-get-in-touch-section"
      className="w-full bg-secondary relative"
    >
      <div className="relative z-[9] w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {getImageURL(homeContentData?.["home-section-11-contact-image"]) ? (
          //  Left Side Image
          <div className="hidden lg:flex w-full h-full relative overflow-hidden">
            <Image
              src={getImageURL(
                homeContentData["home-section-11-contact-image"]
              )}
              alt="Contact Image"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Right Side Form */}
        <GetInTouchFormSection
          services={servicesResponse?.fetchData || []}
          contactFormHeading={contactFormHeading}
          currentLanguage={currentLanguage}
        />
      </div>
    </section>
  );
};

export default GetInTouch;
