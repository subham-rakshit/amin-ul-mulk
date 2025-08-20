import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicPackagesPageData } from "@/actions/frontEndPageDataActions";
import {
  CommonBannerSection,
  CommonPackageLisitng,
  GetInTouch,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { generateMetaStructure } from "@/utils/metaTagUtils";
import { getFileSettingsValue } from "@/utils/website-settings-helper";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { otherInfoData } = await getPublicPageCMSContent("packages");
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  const { locale } = await params;

  // Generate meta structure
  return generateMetaStructure({
    currentLanguage: locale,
    isPageInfoExist,
    otherInfoData,
    path: otherInfoData?.pageSlug || ROUTES.PACKAGES,
  });
};

const PackagesPage = async ({ params, searchParams }) => {
  const { locale } = await params;
  const { page, pageSize } = await searchParams;

  const currentLanguage = locale || "en";

  // Fetch nessesary data
  const { contentData, otherInfoData, filesList } =
    await fetchPublicPackagesPageData("packages", currentLanguage);

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <>
      <CommonBannerSection
        sectionId={`packages-banner-section`}
        bannerSrc={contentData?.["packages-section-1-banner-image"] || null}
        bannerTitle={contentData?.["packages-section-1-banner-heading"] || null}
        breadcrumbsFields={[
          {
            label: "Home",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`,
          },
        ]}
        breadcrumbsCurrentTabName={otherInfoData?.pageName || null}
        filesList={filesList}
      />

      <section id="packages-listing-section" className="w-full mt-[40px]">
        <div className="max-screen-width mx-auto w-full px-2 md:px-5 mb-10">
          {/* Section Header */}
          {contentData?.["packages-listing-section-2-sub-heading"] ||
          contentData?.["packages-listing-section-2-heading"] ? (
            <div className="flex flex-col items-center gap-2 pb-5 md:pb-10">
              {contentData?.["packages-listing-section-2-sub-heading"] ? (
                <h3 className="subtitle-2 md:subtitle-1 text-secondary test-font-family font-bold text-center">
                  {contentData["packages-listing-section-2-sub-heading"]}
                </h3>
              ) : null}

              {contentData?.["packages-listing-section-2-heading"] ? (
                <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold text-center">
                  {contentData["packages-listing-section-2-heading"]}
                </h2>
              ) : null}

              <span className="w-[100px] border border-secondary mt-2 md:mt-5" />
            </div>
          ) : null}

          {/* Prices */}
          <CommonPackageLisitng
            filesList={filesList}
            currentLanguage={currentLanguage}
            paginationData={{
              page: page || 1,
              pageSize: pageSize || 6,
            }}
            isListingPage={true}
          />
        </div>

        {/* Get In Touch */}
        <GetInTouch currentLanguage={currentLanguage} />
      </section>
    </>
  );
};

export default PackagesPage;
