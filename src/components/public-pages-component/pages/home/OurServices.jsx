import {
  getAllPublicServices,
  getPublicPageCMSContent,
} from "@/actions/frontEndActions/action";
import { useConvertEnToPsPrsNumber, useFilterFeaturedItems } from "@/lib/hooks";
import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BackgroundRevealButton, PaginationSection } from "../..";

const OurServicesSection = ({
  serviceNum = "",
  iconSrc = "",
  serviceName = "",
  shortDescription = "",
  serviceDescription = "",
  redirectLink = "#",
  serviceImgSrc = "",
  className = "",
}) => {
  "use client";

  const translate = useTranslations();

  // Handle Empty Data
  if (
    !serviceNum &&
    !iconSrc &&
    !serviceName &&
    !shortDescription &&
    !serviceDescription &&
    !redirectLink &&
    !serviceImgSrc
  ) {
    return null;
  }

  return (
    <div
      id={redirectLink}
      className={`w-full flex flex-col md:flex-row justify-between gap-5 md:gap-10 hover:gap-0 transition-all duration-500 ease-in-out h-[400px] group ${className}`}
    >
      {/* Left Part */}
      <div
        className={`relative w-full md:w-1/2 h-full bg-primary-blue-500 group-hover:bg-secondary-blue-400 group-hover:h-full md:group-hover:w-full transition-all duration-500 ease-in-out rounded-[20px] overflow-hidden px-5 py-3 md:py-5 order-2`}
      >
        <div className="relative w-full h-full">
          {/* After Hover Content */}
          <div className="absolute w-full h-full overflow-hidden translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
            <div className="w-full h-full flex flex-col justify-between gap-3">
              {serviceNum && (
                <h2 className="heading-2 text-light-color group-hover:text-light-color transition-all duration-500 ease-in-out primary-font-family font-extrabold">
                  {serviceNum}
                </h2>
              )}

              {serviceName && (
                <h3 className="body1 md:subtitle-1 text-light-color primary-font-family font-medium">
                  {serviceName}
                </h3>
              )}

              {serviceDescription && (
                <p className="body3 md:body1 text-light-color secondary-font-family font-normal">
                  {serviceDescription}
                </p>
              )}

              {redirectLink && (
                <BackgroundRevealButton
                  href={`/services/${redirectLink}`}
                  label={translate("View Details")}
                  hoverBgColor="group-hover:bg-secondary"
                  className="w-fit px-4 py-[10px] border border-light-color"
                />
              )}
            </div>
          </div>

          {/* Before Hover Content */}
          <div className="relative size-full flex flex-col gap-3 md:gap-6 group-hover:translate-y-[-100%] group-hover:opacity-0 transition-all duration-500 ease-in-out">
            {serviceNum && (
              <h2 className="subtitle-1 md:heading-2 text-light-color transition-all duration-500 ease-in-out primary-font-family font-extrabold">
                {serviceNum}
              </h2>
            )}

            {(serviceName || serviceDescription) && (
              <div className="my-auto">
                <h3 className="subtitle-0-1 md:subtitle-1 text-light-color primary-font-family font-bold">
                  {serviceName}
                </h3>

                <p className="hidden md:block body-0-2 md:body2 text-light-color secondary-font-family font-normal mt-2 md:mt-3">
                  {shortDescription}
                </p>
              </div>
            )}
          </div>
        </div>

        {iconSrc && (
          <div className="absolute ltr:right-0 rtl:left-0 top-0 size-[90px] ltr:rounded-bl-[24px] rtl:rounded-br-[24px] bg-[#ffffff1f] group-hover:bg-secondary flex items-center justify-center transition-all duration-500 ease-in-out">
            <div className="relative w-[40px] h-[40px] overflow-hidden">
              <Image
                src={iconSrc}
                alt="icon"
                fill
                sizes="(max-width: 767px) 100vw, 100vw"
                className="object-contain group-hover:scale-x-[-1] transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Part */}
      {serviceImgSrc && (
        <div
          className={`relative w-full md:w-1/2 h-full group-hover:h-0 md:group-hover:h-full md:group-hover:w-0 transition-all duration-500 ease-in-out rounded-[20px] overflow-hidden order-1 md:order-2`}
        >
          <Image
            src={serviceImgSrc}
            alt="service-img"
            fill
            sizes="(max-width: 767px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

const OurServices = async ({
  sectionId = "",
  isListingPage = false,
  servicesSubHeading = "",
  servicesHeading = "",
  filesList = [],
  currentLanguage = "en",
  paginationData = {},
}) => {
  // Fetch services nessary data
  const [homeCMSData, servicesListingCMSData, servicesResponse] =
    await Promise.all([
      getPublicPageCMSContent("home", currentLanguage),
      getPublicPageCMSContent("services", currentLanguage),
      getAllPublicServices(
        paginationData?.page || 0,
        paginationData?.pageSize || 0
      ),
    ]);

  const homeContentData = homeCMSData?.contentDetails || {};

  // Extract Non-Lisitng Page CMS values
  const services_non_lisitng_page_sub_heading =
    homeContentData?.["home-section-5-services-sub-heading"] || "";
  const services_non_lisitng_page_heading =
    homeContentData?.["home-section-5-services-heading"] || "";
  const services_non_lisitng_page_description =
    homeContentData?.["home-section-5-services-description"] || "";
  const services_non_lisitng_page_featured_image_id =
    homeContentData?.["home-section-5-services-image"] || "";

  // Updated Services Based On Featured Status
  const featuredServices = isListingPage
    ? servicesResponse?.fetchData || []
    : useFilterFeaturedItems(servicesResponse?.fetchData || [], "is_featured");

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  // Pagination Items Index Calculation
  const currentPage = servicesResponse?.paginationData?.currentPage || 1;
  const currentLimit = servicesResponse?.paginationData?.currentLimit || 6;
  const startIndex = (currentPage - 1) * currentLimit;

  return (
    <section id={sectionId} className="w-full py-[50px] relative bg-light">
      <div className="w-full max-screen-width mx-auto px-2 md:px-5">
        {/* Section Info Container */}
        {!isListingPage ? (
          services_non_lisitng_page_featured_image_id ||
          services_non_lisitng_page_sub_heading ||
          services_non_lisitng_page_heading ||
          services_non_lisitng_page_description ? (
            // {/* Section Info Non Listing Page */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {getImageURL(services_non_lisitng_page_featured_image_id) ? (
                <div className="w-full h-[300px] md:h-[400px] rounded-[20px] relative overflow-hidden">
                  <Image
                    src={getImageURL(
                      services_non_lisitng_page_featured_image_id
                    )}
                    alt="Service Image"
                    fill
                    sizes="(max-width: 767px) 100vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="flex flex-col justify-center gap-5 md:px-10 order-1">
                {services_non_lisitng_page_sub_heading ? (
                  <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold">
                    {services_non_lisitng_page_sub_heading}
                  </h3>
                ) : null}

                {services_non_lisitng_page_heading ? (
                  <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold">
                    {services_non_lisitng_page_heading}
                  </h2>
                ) : null}

                {services_non_lisitng_page_description ? (
                  <p className="body2 lg:subtitle-2 text-dark-color secondary-font-family font-normal">
                    {services_non_lisitng_page_description}
                  </p>
                ) : null}

                {/* <BackgroundRevealButton
              href="/services"
              label={translate("service_btn_label")}
              borderColor="border-[#36393B]"
              textColor="text-gray-400"
              textSize="body2"
              hoverBgColor="group-hover:bg-gold"
              className="w-fit px-4 py-[12px]"
            /> */}
              </div>
            </div>
          ) : null
        ) : (
          // {/* Section Info for Listing Page */}
          <div className="flex flex-col justify-center items-center gap-5 md:px-10 order-1">
            {servicesSubHeading ? (
              <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold text-center">
                {servicesSubHeading}
              </h3>
            ) : null}

            {servicesHeading ? (
              <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold text-center">
                {servicesHeading}
              </h2>
            ) : null}
          </div>
        )}

        {/* Services */}
        {featuredServices?.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-10">
            {featuredServices.map((service, index) => {
              const actualIndex = startIndex + index + 1; // +1 for 1-based indexing

              return (
                <OurServicesSection
                  key={service?._id || `service-${actualIndex + 1}`}
                  serviceNum={
                    actualIndex >= 10
                      ? useConvertEnToPsPrsNumber(
                          `${actualIndex}`,
                          currentLanguage
                        )
                      : useConvertEnToPsPrsNumber(
                          `0${actualIndex}`,
                          currentLanguage
                        )
                  }
                  iconSrc={getImageFullUrl(service?.card_icon?.fileUrl ?? null)}
                  serviceName={service?.service_name?.[currentLanguage] || ""}
                  shortDescription={
                    service?.card_short_description?.[currentLanguage] || ""
                  }
                  serviceDescription={
                    service?.card_long_description?.[currentLanguage] || ""
                  }
                  redirectLink={service?.slug || "#"}
                  serviceImgSrc={getImageFullUrl(
                    service?.card_image?.fileUrl ?? null
                  )}
                />
              );
            })}
          </div>
        ) : null}

        {/* Pagination */}
        {servicesResponse?.paginationData?.totalItemsCount >
          servicesResponse?.paginationData?.currentLimit &&
          isListingPage && (
            <div className="w-full mt-10">
              <PaginationSection
                paginationDetails={servicesResponse?.paginationData || {}}
              />
            </div>
          )}
      </div>
    </section>
  );
};

export default OurServices;
