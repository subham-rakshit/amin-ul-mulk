import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicAboutPageData } from "@/actions/frontEndPageDataActions";
import {
  AboutPageContentSection,
  BlogsSection,
  CommonBannerSection,
  DepartmentSection,
  GetInTouch,
  OurAttorneys,
  OurServices,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { generateMetaStructure } from "@/utils/metaTagUtils";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { FaBullseye, FaRegEye } from "react-icons/fa";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { otherInfoData } = await getPublicPageCMSContent("about-us");
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  const { locale } = await params;

  // Generate meta structure
  return generateMetaStructure({
    currentLanguage: locale,
    isPageInfoExist,
    otherInfoData,
    path: otherInfoData?.pageSlug || ROUTES.ABOUT_US,
  });
};

const AboutUsPage = async ({ params }) => {
  const { locale } = await params;
  const currentLanguage = locale || "en";

  // Fetch nessary data
  const { filesList, contentData, otherInfoData, homeContentData } =
    await fetchPublicAboutPageData("about-us", currentLanguage);

  // Our Mission and Our Vision Data
  const about_details_section_image =
    contentData?.["about-us-section-3-image"] || "";

  const our_mission_section_heading =
    contentData?.["about-us-section-4-card-heading-1"] || "";
  const our_mission_section_description =
    contentData?.["about-us-section-4-card-description-1"] || "";

  const our_vision_section_heading =
    contentData?.["about-us-section-4-card-heading-2"] || "";
  const our_vision_section_description =
    contentData?.["about-us-section-4-card-description-2"] || "";

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <>
      <CommonBannerSection
        sectionId={`about-us-banner-section`}
        bannerSrc={contentData?.["about-us-section-1-banner-image"] || null}
        bannerTitle={contentData?.["about-us-section-1-banner-heading"] || null}
        breadcrumbsFields={[
          {
            label: "Home",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`,
          },
        ]}
        breadcrumbsCurrentTabName={otherInfoData?.pageName || null}
        filesList={filesList}
      />

      <section id="about-us-content-section" className="w-full mt-[40px]">
        <div className="max-screen-width mx-auto w-full px-2 md:px-5">
          <AboutPageContentSection
            contentData={contentData}
            filesList={filesList}
          />
        </div>

        {/* Our Mission And Our Vision */}
        {our_mission_section_heading ||
        our_mission_section_description ||
        our_vision_section_heading ||
        our_vision_section_description ? (
          <div className="w-full mt-[40px] py-[50px] relative">
            {about_details_section_image && (
              <div className="absolute inset-0 z-[9] size-full overflow-hidden">
                {getImageURL(about_details_section_image) && (
                  <Image
                    src={getImageURL(about_details_section_image)}
                    alt="overlay"
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 z-[9] size-full overflow-hidden">
              <Image
                src="/amin-ul-miulk-law-firm/bg/hero1-overlay-dark-option-2.png"
                alt="hero overlay"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 100vw"
                className="object-cover scale-[1.3] brightness-0"
              />
            </div>

            <div className="relative z-[10] w-full max-screen-width mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-2 md:px-5">
              {/* Our Mission */}
              {our_mission_section_heading ||
              our_mission_section_description ? (
                <div className="w-full p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-[1.05] transition-all duration-500 ease-in-out">
                  {our_mission_section_heading ? (
                    <div className="flex items-center gap-3">
                      <span>
                        <FaBullseye className="text-[25px] text-light-color" />
                      </span>
                      <h3 className="subtitle-2 md:subtitle-1 text-light-color primary-font-family font-bold">
                        {our_mission_section_heading}
                      </h3>
                    </div>
                  ) : null}

                  {our_mission_section_description ? (
                    <p className="body2 md:body1 text-light-color secondary-font-family font-normal mt-5 whitespace-pre-line">
                      {our_mission_section_description}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {/* Our Vision */}
              {our_vision_section_heading || our_vision_section_description ? (
                <div className="w-full p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-[1.05] transition-all duration-500 ease-in-out">
                  {our_vision_section_heading ? (
                    <div className="flex items-center gap-3">
                      <span>
                        <FaRegEye className="text-[25px] text-light-color" />
                      </span>
                      <h3 className="subtitle-2 md:subtitle-1 text-light-color primary-font-family font-bold">
                        {our_vision_section_heading}
                      </h3>
                    </div>
                  ) : null}

                  {our_vision_section_description ? (
                    <p className="body2 md:body1 text-dark-white secondary-font-family font-normal mt-5 whitespace-pre-line">
                      {our_vision_section_description}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Our Services */}
        <OurServices
          sectionId="about-page-our-services-section"
          filesList={filesList}
          currentLanguage={currentLanguage}
        />

        {/* Our Department */}
        <DepartmentSection
          sectionId="about-page-department-section"
          filesList={filesList}
          currentLanguage={currentLanguage}
        />

        {/* Our Atorneys */}
        <OurAttorneys
          sectionId="about-page-attorneys-section"
          data={
            homeContentData?.["home-section-7-attorneys-multi-attorneys"] || []
          }
          filesList={filesList}
        />

        {/* Bolg Section */}
        <BlogsSection
          headingColor="text-light-color"
          sectionClasses="bg-primary py-[50px]"
          sectionId="about-page-blogs-section"
          currentLanguage={currentLanguage}
        />

        {/* Get In Touch */}
        <GetInTouch currentLanguage={currentLanguage} />
      </section>
    </>
  );
};

export default AboutUsPage;
