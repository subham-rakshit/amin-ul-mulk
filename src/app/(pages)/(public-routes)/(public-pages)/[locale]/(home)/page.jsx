import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicHomePageData } from "@/actions/frontEndPageDataActions";
import {
  AboutCompanySection,
  BlogsSection,
  DepartmentSection,
  GetInTouch,
  HeroSection,
  HomePagePopup,
  OurAttorneys,
  OurServices,
  PartnersSection,
  PricesSection,
  TestimonialSection,
} from "@/components/public-pages-component";
import { getImageFullUrl } from "@/utils/helper-functions";
import { generateMetaStructure } from "@/utils/metaTagUtils";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { otherInfoData } = await getPublicPageCMSContent("home");
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  const { locale } = await params;

  // Generate meta structure
  return generateMetaStructure({
    currentLanguage: locale,
    isPageInfoExist,
    otherInfoData,
  });
};

const HomePage = async ({ params }) => {
  const { locale } = await params;
  const currentLanguage = locale || "en";

  // Fetch nessary data
  const { testimonials, filesList, contentData, settingsData } =
    await fetchPublicHomePageData("home", currentLanguage);

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  // Extract necessary popup data
  const { show_website_popup, footer_image, popup_content } =
    getFESettingsFieldValues(
      settingsData,
      ["show_website_popup", "footer_image", "popup_content"],
      currentLanguage
    );

  return (
    <>
      {show_website_popup === 1 && (
        <HomePagePopup
          currentLocale={currentLanguage}
          cmsData={{
            footer_image,
            popup_content,
          }}
          filesList={filesList}
        />
      )}

      <HeroSection
        contentData={{
          banner_image_ids: contentData?.["home_section_1_banner_images"] || [],
          banner_headings:
            contentData?.["home_section_1_banner_headings"] || [],
          banner_btn_label:
            contentData?.["home-section-1-banner-button-label"] || "",
        }}
        filesList={filesList}
        currentLanguage={currentLanguage}
      />

      <AboutCompanySection
        contentData={contentData}
        filesList={filesList}
        currentLanguage={currentLanguage}
      />

      <PricesSection
        contentData={contentData}
        filesList={filesList}
        currentLanguage={currentLanguage}
      />

      <OurServices
        sectionId="home-page-our-services-section"
        filesList={filesList}
        currentLanguage={currentLanguage}
      />

      <PartnersSection
        contentData={contentData}
        filesList={filesList}
        currentLanguage={currentLanguage}
      />

      <OurAttorneys sectionId="home-page-attorneys-section" />

      <DepartmentSection
        sectionId="home-page-department-section"
        filesList={filesList}
        currentLanguage={currentLanguage}
      />

      <TestimonialSection
        contentData={contentData}
        filesList={filesList}
        currentLanguage={currentLanguage}
        testimonials={testimonials}
      />

      <BlogsSection
        headingColor="text-light-color"
        sectionClasses="bg-primary py-[50px]"
        sectionId="home-page-blogs-section"
        currentLanguage={currentLanguage}
      />

      <GetInTouch currentLanguage={currentLanguage} />
    </>
  );
};

export default HomePage;
