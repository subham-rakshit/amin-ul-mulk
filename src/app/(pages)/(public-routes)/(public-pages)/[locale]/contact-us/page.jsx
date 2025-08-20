import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicContactUsPageData } from "@/actions/frontEndPageDataActions";
import {
  CommonBannerSection,
  ContactFormSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { generateMetaStructure } from "@/utils/metaTagUtils";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import Link from "next/link";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { otherInfoData } = await getPublicPageCMSContent("contact-us");
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  const { locale } = await params;

  // Generate meta structure
  return generateMetaStructure({
    currentLanguage: locale,
    isPageInfoExist,
    otherInfoData,
    path: otherInfoData?.pageSlug || ROUTES.CONTACT_US,
  });
};

// Main Server Component
const ContactUsPage = async ({ params }) => {
  const { locale } = await params;

  const currentLanguage = locale || "en";

  // Fetch contact us page data
  const { contentData, otherInfoData, filesList, services, settingsData } =
    await fetchPublicContactUsPageData("contact-us", currentLanguage);

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <>
      {/* Banner Section */}
      <CommonBannerSection
        sectionId={`contact-us-banner-section`}
        bannerSrc={contentData?.["contact-us-section-1-banner-image"] || null}
        bannerTitle={contentData?.["contact-us-section-1-heading"] || null}
        breadcrumbsFields={[
          {
            label: "Home",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`,
          },
        ]}
        breadcrumbsCurrentTabName={otherInfoData?.pageName || null}
        filesList={filesList}
      />

      <section id="contact-us-content-section" className="w-full mt-[40px]">
        {/* Contact Cards */}
        {contentData?.["contact-us-card-label-1"] ||
        contentData?.["contact-us-card-label-2"] ||
        contentData?.["contact-us-card-label-3"] ? (
          <div className="max-screen-width mx-auto w-full px-2 md:px-5 mb-10">
            <div className="grid grid-cols-12 gap-5 lg:gap-8">
              {/* Contact Cards */}
              {Array(3)
                .fill(0)
                .map((_, index) => {
                  const iconUrl = getImageURL(
                    contentData?.[`contact-us-card-logo-${index + 1}`]
                  );
                  const label =
                    contentData?.[`contact-us-card-label-${index + 1}`];
                  const labelValue =
                    contentData?.[`contact-us-card-value-${index + 1}`];
                  const labelLink =
                    contentData?.[`contact-us-card-value-link-${index + 1}`];
                  const isValidLink =
                    labelLink && labelLink !== "#" && labelLink !== "";

                  // Render contact card only if it has valid data
                  if (!iconUrl && !label && !labelValue && !labelLink)
                    return null;

                  return (
                    <div
                      key={`contact-card-${index + 1}`}
                      className="w-full col-span-12 md:col-span-6 lg:col-span-4 h-[200px] md:h-[250px] rounded-[24px] shadow-[-3px_-3px_15px_#ffffff90,_3px_3px_15px_#00000090] hover:shadow-[-2px_-2px_4px_#ffffff90,_2px_2px_4px_#00000090] transition-all duration-200 ease-in-out flex items-center p-8"
                    >
                      <div className="w-full flex flex-col justify-center items-center gap-5">
                        {iconUrl ? (
                          <div className="flex-shrink-0 w-[65px] h-[65px] flex items-center justify-center overflow-hidden">
                            <div className="size-full relative overflow-hidden">
                              <Image
                                src={iconUrl}
                                alt={label}
                                fill
                                sizes="(max-width: 768px) 100vw, 200px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-col justify-center items-center gap-2">
                          {label ? (
                            <h2 className="heading-3 md:heading-2 primary-font-family font-bold text-secondary text-center">
                              {label}
                            </h2>
                          ) : null}

                          {labelValue ? (
                            <Link
                              href={labelLink || "#"}
                              target={isValidLink ? "_blank" : "_self"}
                              className="body2 text-dark-color secondary-font-family font-medium text-center"
                            >
                              {labelValue}
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : null}

        {/* Contact Form Section */}
        <ContactFormSection
          contentData={contentData}
          filesList={filesList}
          settingsData={settingsData}
          services={services}
          currentLanguage={currentLanguage}
        />
      </section>
    </>
  );
};

export default ContactUsPage;
