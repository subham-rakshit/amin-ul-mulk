import {
  getAllPublicFiles,
  getAllPublicServices,
  getAllPublicWebsiteSettings,
  getPublicServiceDetails,
} from "@/actions/frontEndActions/action";
import {
  BlogsSection,
  CommonBannerSection,
  GetInTouch,
  ServiceContentSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { generateMetaStructure } from "@/utils/metaTagUtils";
import { notFound } from "next/navigation";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  if (!slug) return notFound();

  const { fetchData: otherInfoData } = await getPublicServiceDetails(slug);
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  const { locale } = await params;

  // Generate meta structure
  return generateMetaStructure({
    currentLanguage: locale,
    isPageInfoExist,
    otherInfoData: {
      pageMetaTitle: otherInfoData?.meta_title || "",
      pageMetaDescription: otherInfoData?.meta_description || "",
    },
    path: `${ROUTES.SERVICE}/${otherInfoData?.slug || slug}`,
  });
};

const ServicePage = async ({ params }) => {
  const { locale, slug } = await params;
  const currentLanguage = locale || "en";

  // Handle empty slug
  if (!slug) return notFound();

  const [
    serviceDetailsResponse,
    servicesResponse,
    filesResponse,
    websiteSettingsResponse,
  ] = await Promise.all([
    getPublicServiceDetails(slug),
    getAllPublicServices(),
    getAllPublicFiles(),
    getAllPublicWebsiteSettings(),
  ]);

  // Extract Data from fetched responses
  const { fetchData: serviceDetails, translationData: translations } =
    serviceDetailsResponse;
  const { fetchData: services } = servicesResponse;

  const { filesList } = filesResponse;
  const { settingsData } = websiteSettingsResponse;

  // Handle non active service
  if (serviceDetails?.is_active === false) return notFound();

  // TODO : Need to add for Other Services **
  // const filteredOtherServices = services.filter(
  //   (service) => service.slug !== slug
  // );

  return (
    <>
      <CommonBannerSection
        sectionId={`${serviceDetails.slug}-service-banner-section`}
        bannerSrc={getImageFullUrl(serviceDetails.banner_image?.fileUrl)}
        bannerTitle={translations?.[currentLanguage]?.service_name || ""}
        breadcrumbsFields={[
          {
            label: "Home",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`,
          },
          {
            label: "Services",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.SERVICE}`,
          },
        ]}
        breadcrumbsCurrentTabName={
          translations?.[currentLanguage]?.service_name || ""
        }
      />

      <ServiceContentSection
        sectionId={`${serviceDetails.slug}-service-content-section`}
        content={{
          commonData: serviceDetails,
          translationData: translations,
        }}
        services={services}
        currentLanguage={currentLanguage}
        settingsData={settingsData}
        filesList={filesList}
      />

      <BlogsSection
        headingColor="text-dark-white"
        sectionClasses="bg-primary-blue-500 py-[50px]"
        sectionId="service-page-blogs-section"
        currentLanguage={currentLanguage}
      />

      <GetInTouch />
    </>
  );
};

export default ServicePage;
