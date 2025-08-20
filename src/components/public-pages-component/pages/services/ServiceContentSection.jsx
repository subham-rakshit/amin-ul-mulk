import { ScrollArea } from "@/components/ui/scroll-area";
import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const ServiceContentSection = ({
  sectionId = "",
  content = {},
  services = [],
  currentLanguage = "en",
  settingsData = [],
  filesList = [],
}) => {
  const translate = useTranslations();
  const { commonData, translationData } = content;

  // Footer Contact Location Data
  const footer_contact_location_data = getFESettingsFieldValues(
    settingsData,
    [
      "footer-contact-logo-1",
      "footer-contact-name-1",
      "footer-contact-value-option-one-1",
      "footer-contact-value-option-two-1",
    ],
    currentLanguage
  );

  // Footer Contact Phone Data
  const footer_contact_phone_data = getFESettingsFieldValues(
    settingsData,
    [
      "footer-contact-logo-2",
      "footer-contact-name-2",
      "footer-contact-value-option-one-2",
      "footer-contact-value-option-two-2",
    ],
    currentLanguage
  );

  // console.log("footer_contact_phone_data: ", footer_contact_phone_data);

  // Footer Contact Email Data
  const footer_contact_email_data = getFESettingsFieldValues(
    settingsData,
    [
      "footer-contact-logo-3",
      "footer-contact-name-3",
      "footer-contact-value-option-one-3",
      "footer-contact-value-option-two-3",
    ],
    currentLanguage
  );

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <section id={sectionId} className="w-full py-[40px] md:py-[80px]">
      <div className="max-screen-width mx-auto w-full px-2 md:px-5">
        <div className="grid grid-cols-12 gap-5 lg:gap-8 relative">
          {/* Details Section */}
          <div className="col-span-12 lg:col-span-7">
            {commonData?.cover_image?.fileUrl && (
              <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-[24px] shadow-custom-three-sides group">
                <Image
                  src={getImageFullUrl(commonData.cover_image.fileUrl)}
                  alt={
                    translationData?.[currentLanguage]?.service_name || "Image"
                  }
                  fill
                  sizes="(max-width: 767px) 100vw, 100vw"
                  className="object-cover group-hover:scale-[1.1] transition-all duration-500 ease-in-out"
                />
              </div>
            )}

            {translationData?.[currentLanguage]?.detailed_description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTMLServer(
                    translationData[currentLanguage].detailed_description
                  ),
                }}
                className="w-full mt-[40px] secondary-font-family text-dark-color body2 md:body1 whitespace-pre-line"
              />
            )}
          </div>

          {/* Other Sections */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-0">
              {/* Other Services */}
              {services.length > 0 ? (
                <div className="w-full rounded-[12px] lg:rounded-[24px] bg-[#f5f5f5] px-4 py-5 lg:p-8">
                  <h3 className="subtitle-1 text-dark-color primary-font-family font-bold tracking-wide">
                    {translate("Other Services")}
                  </h3>

                  <ScrollArea className="w-full h-[350px] mt-5">
                    {services.map((service, index) => {
                      if (
                        !service?.service_name?.[currentLanguage] ||
                        !service?.slug
                      )
                        return null;

                      return (
                        <Link
                          key={index}
                          href={`${ROUTES.SERVICE}/${service.slug}`}
                          className="w-full px-5 py-5 rounded-[12px] lg:rounded-[24px] bg-light-color hover:bg-secondary flex items-center justify-between gap-3 body2 secondary-font-family font-medium text-dark-color hover:text-light-color group transition-all duration-500 ease-in-out mb-5 last:mb-0"
                        >
                          <span className="rtl:order-2">
                            {service?.service_name?.[currentLanguage]}
                          </span>
                          <span className="rtl:order-1">
                            <FaArrowRightLong
                              size={20}
                              className="text-dark-color group-hover:text-light-color rtl:rotate-[180deg]"
                            />
                          </span>
                        </Link>
                      );
                    })}
                  </ScrollArea>
                </div>
              ) : null}

              {/* Need Help */}
              <div className="w-full rounded-[24px] bg-primary px-4 py-5 lg:p-8 mt-[30px]">
                <h3 className="subtitle-2 md:subtitle-1 text-light-color primary-font-family font-bold tracking-wide">
                  {translate("service_details_contact_heading")}
                </h3>
                <p className="body2 md:body1 text-light-color secondary-font-family font-normal tracking-wide">
                  {translate("service_details_contact_sub_heading")}
                </p>

                <div className="w-full flex flex-col gap-4 md:gap-6 mt-5 md:mt-8">
                  {/* Phone */}
                  {footer_contact_phone_data?.["footer-contact-logo-2"] ||
                  footer_contact_phone_data?.[
                    "footer-contact-value-option-one-2"
                  ] ||
                  footer_contact_phone_data?.[
                    "footer-contact-value-option-two-2"
                  ] ? (
                    <div className="flex gap-2 md:gap-5 group">
                      {/* Logo */}
                      {getImageURL(
                        footer_contact_phone_data?.["footer-contact-logo-2"]
                      ) ? (
                        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-light-color flex items-center justify-center flex-shrink-0">
                          <div className="w-[30px] h-[30px] overflow-hidden relative">
                            <Image
                              src={getImageURL(
                                footer_contact_phone_data[
                                  "footer-contact-logo-2"
                                ]
                              )}
                              alt="Location Logo"
                              fill
                              sizes="(max-width: 768px) 100vw, 100vw"
                              className="object-contain group-hover:scale-x-[-1] transition-all duration-500 ease-in-out"
                            />
                          </div>
                        </div>
                      ) : null}

                      {footer_contact_phone_data?.["footer-contact-name-2"] ||
                      footer_contact_phone_data?.[
                        "footer-contact-value-option-one-2"
                      ] ||
                      footer_contact_phone_data?.[
                        "footer-contact-value-option-two-2"
                      ] ? (
                        <div className="flex flex-col">
                          {footer_contact_phone_data?.[
                            "footer-contact-name-2"
                          ] ? (
                            <h4 className="subtitle-2 md:subtitle-1 primary-font-family font-bold text-light-color">
                              {
                                footer_contact_phone_data?.[
                                  "footer-contact-name-2"
                                ]
                              }
                            </h4>
                          ) : null}

                          {/* Link 1 */}
                          {footer_contact_phone_data?.[
                            "footer-contact-value-option-one-2"
                          ] ? (
                            <Link
                              href={`tel:${footer_contact_phone_data["footer-contact-value-option-one-2"]}`}
                              className="body3 md:body2 secondary-font-family font-normal text-light-color mt-3 inline-block"
                            >
                              {
                                footer_contact_phone_data[
                                  "footer-contact-value-option-one-2"
                                ]
                              }
                            </Link>
                          ) : null}

                          {/* Link 2 */}
                          {footer_contact_phone_data?.[
                            "footer-contact-value-option-two-2"
                          ] ? (
                            <Link
                              href={`tel:${footer_contact_phone_data["footer-contact-value-option-two-2"]}`}
                              className="body3 md:body2 secondary-font-family font-normal text-light-color mt-1 inline-block"
                            >
                              {
                                footer_contact_phone_data[
                                  "footer-contact-value-option-two-2"
                                ]
                              }
                            </Link>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Email */}
                  {footer_contact_email_data?.["footer-contact-logo-3"] ||
                  footer_contact_email_data?.["footer-contact-name-3"] ||
                  footer_contact_email_data?.[
                    "footer-contact-value-option-one-3"
                  ] ||
                  footer_contact_email_data?.[
                    "footer-contact-value-option-two-3"
                  ] ? (
                    <div className="flex gap-2 md:gap-5 group">
                      {/* Logo */}
                      {getImageURL(
                        footer_contact_email_data?.["footer-contact-logo-3"]
                      ) ? (
                        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-light-color flex items-center justify-center flex-shrink-0">
                          <div className="w-[30px] h-[30px] overflow-hidden relative">
                            <Image
                              src={getImageURL(
                                footer_contact_email_data[
                                  "footer-contact-logo-3"
                                ]
                              )}
                              alt="Location Logo"
                              fill
                              sizes="(max-width: 768px) 100vw, 100vw"
                              className="object-contain group-hover:scale-x-[-1] transition-all duration-500 ease-in-out"
                            />
                          </div>
                        </div>
                      ) : null}

                      {footer_contact_email_data?.["footer-contact-name-3"] ||
                      footer_contact_email_data?.[
                        "footer-contact-value-option-one-3"
                      ] ||
                      footer_contact_email_data?.[
                        "footer-contact-value-option-two-3"
                      ] ? (
                        <div className="flex flex-col">
                          {footer_contact_email_data?.[
                            "footer-contact-name-3"
                          ] ? (
                            <h4 className="subtitle-2 md:subtitle-1 primary-font-family font-bold text-light-color">
                              {
                                footer_contact_email_data[
                                  "footer-contact-name-3"
                                ]
                              }
                            </h4>
                          ) : null}

                          {/* Link 1 */}
                          {footer_contact_email_data?.[
                            "footer-contact-value-option-one-3"
                          ] ? (
                            <Link
                              href={`mailto:${
                                footer_contact_email_data[
                                  "footer-contact-value-option-one-3"
                                ]
                              }`}
                              className="body3 md:body2 secondary-font-family font-normal text-light-color mt-3 inline-block"
                            >
                              {
                                footer_contact_email_data[
                                  "footer-contact-value-option-one-3"
                                ]
                              }
                            </Link>
                          ) : null}

                          {/* Link 2 */}
                          {footer_contact_email_data?.[
                            "footer-contact-value-option-two-3"
                          ] ? (
                            <Link
                              href={`mailto:${
                                footer_contact_email_data[
                                  "footer-contact-value-option-two-3"
                                ]
                              }`}
                              className="body3 md:body2 secondary-font-family font-normal text-light-color mt-1 inline-block"
                            >
                              {
                                footer_contact_email_data[
                                  "footer-contact-value-option-two-3"
                                ]
                              }
                            </Link>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Address */}
                  {footer_contact_location_data?.["footer-contact-logo-1"] ||
                  footer_contact_location_data?.["footer-contact-name-1"] ||
                  footer_contact_location_data?.[
                    "footer-contact-value-option-one-1"
                  ] ||
                  footer_contact_location_data?.[
                    "footer-contact-value-option-two-1"
                  ] ? (
                    <div className="flex gap-2 md:gap-5 group">
                      {getImageURL(
                        footer_contact_location_data?.["footer-contact-logo-1"]
                      ) ? (
                        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-light-color flex items-center justify-center flex-shrink-0">
                          <div className="w-[30px] h-[30px] overflow-hidden relative">
                            <Image
                              src={getImageURL(
                                footer_contact_location_data[
                                  "footer-contact-logo-1"
                                ]
                              )}
                              alt="Location Logo"
                              fill
                              sizes="(max-width: 768px) 100vw, 100vw"
                              className="object-contain group-hover:scale-x-[-1] transition-all duration-500 ease-in-out"
                            />
                          </div>
                        </div>
                      ) : null}

                      {footer_contact_location_data?.[
                        "footer-contact-name-1"
                      ] ||
                      footer_contact_location_data?.[
                        "footer-contact-value-option-one-1"
                      ] ||
                      footer_contact_location_data?.[
                        "footer-contact-value-option-two-1"
                      ] ? (
                        <div className="flex flex-col">
                          {footer_contact_location_data?.[
                            "footer-contact-name-1"
                          ] ? (
                            <h4 className="subtitle-2 md:subtitle-1 primary-font-family font-bold text-light-color">
                              {
                                footer_contact_location_data[
                                  "footer-contact-name-1"
                                ]
                              }
                            </h4>
                          ) : null}

                          {/* Link 1 */}
                          {footer_contact_location_data?.[
                            "footer-contact-value-option-one-1"
                          ] ? (
                            <Link
                              href="#"
                              target="_self"
                              className="body3 md:body2 secondary-font-family font-normal text-light-color mt-3 inline-block"
                            >
                              {
                                footer_contact_location_data[
                                  "footer-contact-value-option-one-1"
                                ]
                              }
                            </Link>
                          ) : null}

                          {/* Link 2 */}
                          {footer_contact_location_data?.[
                            "footer-contact-value-option-two-1"
                          ] ? (
                            <Link
                              href="#"
                              target="_self"
                              className="body3 md:body2 secondary-font-family font-normal text-light-color mt-1 inline-block"
                            >
                              {
                                footer_contact_location_data[
                                  "footer-contact-value-option-two-1"
                                ]
                              }
                            </Link>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContentSection;
