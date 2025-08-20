import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicServicesPageData } from "@/actions/frontEndPageDataActions";
import {
  CommonBannerSection,
  GetInTouch,
  OurServices,
  ScrollToSectionContainer,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { generateMetaStructure } from "@/utils/metaTagUtils";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { otherInfoData } = await getPublicPageCMSContent("services");
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  const { locale } = await params;

  // Generate meta structure
  return generateMetaStructure({
    currentLanguage: locale,
    isPageInfoExist,
    otherInfoData,
    path: otherInfoData?.pageSlug || ROUTES.SERVICE,
  });
};

const ServicesListingPage = async ({ params, searchParams }) => {
  const { locale } = await params;
  const { page, pageSize } = await searchParams;
  const currentLanguage = locale || "en";

  // Fetch nessesary data
  const { contentData, otherInfoData, filesList } =
    await fetchPublicServicesPageData("services", currentLanguage);

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <>
      <CommonBannerSection
        sectionId={`services-banner-section`}
        bannerSrc={contentData?.["services-section-1-banner-image"] || null}
        bannerTitle={contentData?.["services-section-1-banner-heading"] || null}
        breadcrumbsFields={[
          {
            label: "Home",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`,
          },
        ]}
        breadcrumbsCurrentTabName={otherInfoData?.pageName || null}
        filesList={filesList}
      />

      <ScrollToSectionContainer>
        <OurServices
          sectionId="each-services-listing-section"
          isListingPage={true}
          servicesSubHeading={
            contentData?.["services-listing-section-2-sub-heading"] || null
          }
          servicesHeading={
            contentData?.["services-listing-section-2-heading"] || null
          }
          currentLanguage={currentLanguage}
          paginationData={{
            page: page || 1,
            pageSize: pageSize || 6,
          }}
        />
      </ScrollToSectionContainer>

      <GetInTouch currentLanguage={currentLanguage} />
    </>
  );
};

export default ServicesListingPage;
