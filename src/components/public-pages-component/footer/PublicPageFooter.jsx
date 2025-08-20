import Image from "next/image";
import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";

import { social_react_icons } from "@/app/assets/data/socials-icons";
import { getImageFullUrl } from "@/utils/helper-functions";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";

const PublicPageFooter = ({
  currentLanguage = "en",
  settingsData = [],
  filesList = [],
  languageList = [],
}) => {
  const translate = useTranslations();

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

  // Footer Info Widget Data
  const footer_info_widget_data = getFESettingsFieldValues(
    settingsData,
    ["footer_logo", "footer_info_description"],
    currentLanguage
  );

  // Footer Pages Widget Data
  const footer_pages_widget_data = getFESettingsFieldValues(
    settingsData,
    ["link_one_title", "link_one_label", "link_one_value"],
    currentLanguage
  );

  // Footer Our Services Widget Data
  const footer_services_widget_data = getFESettingsFieldValues(
    settingsData,
    ["link_two_title", "link_two_label", "link_two_value"],
    currentLanguage
  );

  // Footer Newsletter Widget Data
  const footer_newsletter_widget_data = getFESettingsFieldValues(
    settingsData,
    ["link_three_title", "link_three_text"],
    currentLanguage
  );

  // Copywrite Widget Data
  const copywrite_widget_data = getFESettingsFieldValues(
    settingsData,
    ["copywrite_text"],
    currentLanguage
  );

  // Get Socials Data
  const footer_socails_data = getFESettingsFieldValues(settingsData, [
    "show_social_links",
    "social_whatsapp",
    "social_snapchat",
    "social_tiktok",
    "social_twitter",
    "social_facebook",
    "social_instagram",
    "social_youtube",
    "social_linkedin",
    "social_github",
  ]);

  // Generate social links array
  const socialsKeys = Object.keys(footer_socails_data).filter((key) =>
    key.startsWith("social_")
  );

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <footer className="relative z-[100] pt-[50px] md:pt-[80px] pb-[50px] bg-primary">
      <div className="relative z-10 w-full max-screen-width mx-auto px-2 md:px-5">
        {/* Footer Contacts */}
        {Object.keys(footer_contact_location_data)?.length > 0 ||
        Object.keys(footer_contact_phone_data)?.length > 0 ||
        Object.keys(footer_contact_email_data)?.length > 0 ? (
          <div className="w-full border-b border-[#ffffff1f]  pb-[40px] md:pb-[58px] mb-[40px] md:mb-[80px]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {/* Location */}
              {footer_contact_location_data?.["footer-contact-logo-1"] ||
              footer_contact_location_data?.["footer-contact-name-1"] ||
              footer_contact_location_data?.[
                "footer-contact-value-option-one-1"
              ] ||
              footer_contact_location_data?.[
                "footer-contact-value-option-two-1"
              ] ? (
                <div className="lg:ltr:border-r lg:ltr:border-r-[#ffffff1f] lg:rtl:border-l lg:rtl:border-l-[#ffffff1f]">
                  <div className="max-w-[246px] h-full flex gap-3 group">
                    {getImageURL(
                      footer_contact_location_data?.["footer-contact-logo-1"]
                    ) ? (
                      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
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

                    {footer_contact_location_data?.["footer-contact-name-1"] ||
                    footer_contact_location_data?.[
                      "footer-contact-value-option-one-1"
                    ] ||
                    footer_contact_location_data?.[
                      "footer-contact-value-option-two-1"
                    ] ? (
                      <div>
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
                </div>
              ) : null}

              {/* Phone */}
              {footer_contact_phone_data?.["footer-contact-logo-2"] ||
              footer_contact_phone_data?.["footer-contact-name-2"] ||
              footer_contact_phone_data?.[
                "footer-contact-value-option-one-2"
              ] ||
              footer_contact_phone_data?.[
                "footer-contact-value-option-two-2"
              ] ? (
                <div className="lg:ltr:border-r lg:ltr:border-r-[#ffffff1f] lg:rtl:border-l lg:rtl:border-l-[#ffffff1f] my-10 md:my-0">
                  <div className="max-w-[246px] h-full flex gap-3 group md:mx-auto">
                    {getImageURL(
                      footer_contact_phone_data?.["footer-contact-logo-2"]
                    ) ? (
                      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-[30px] h-[30px] overflow-hidden relative">
                          <Image
                            src={getImageURL(
                              footer_contact_phone_data["footer-contact-logo-2"]
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
                      <div>
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
                            href={`tel:${
                              footer_contact_phone_data[
                                "footer-contact-value-option-two-2"
                              ]
                            }`}
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
                <div className="md:mt-10 lg:mt-0">
                  <div className="max-w-[246px] h-full flex gap-3 group lg:ltr:ml-auto lg:rtl:mr-auto">
                    {getImageURL(
                      footer_contact_email_data?.["footer-contact-logo-3"]
                    ) ? (
                      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-[30px] h-[30px] overflow-hidden relative">
                          <Image
                            src={getImageURL(
                              footer_contact_email_data["footer-contact-logo-3"]
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
                      <div>
                        {footer_contact_email_data?.[
                          "footer-contact-name-3"
                        ] ? (
                          <h4 className="subtitle-2 md:subtitle-1 primary-font-family font-bold text-light-color">
                            {footer_contact_email_data["footer-contact-name-3"]}
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
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Footer Links */}
        <div className="w-full mb-[70px]">
          <div className="grid grid-cols-12">
            {/* Logo & Socials */}
            {footer_info_widget_data?.["footer_logo"] ||
            footer_info_widget_data?.["footer_info_description"] ||
            footer_socails_data?.["show_social_links"] ? (
              <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 lg:ltr:border-r lg:ltr:border-r-[#ffffff1f] md:ltr:pr-10 lg:rtl:border-l lg:rtl:border-l-[#ffffff1f] md:rtl:pl-10">
                {/* Logo */}
                {footer_info_widget_data?.["footer_logo"] ? (
                  getImageURL(footer_info_widget_data?.["footer_logo"]) ? (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`}
                      className="mb-[20px] md:mb-[30px] inline-block"
                    >
                      <div className="relative w-[220px] h-[80px] overflow-hidden">
                        <Image
                          src={getImageURL(
                            footer_info_widget_data["footer_logo"]
                          )}
                          alt="Footer Logo"
                          fill
                          priority={true}
                          sizes="(max-width: 768px) 100vw, 100vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  ) : null
                ) : null}

                {/* Description */}
                {footer_info_widget_data?.["footer_info_description"] ? (
                  <p className="body3 md:body2 secondary-font-family font-normal text-light-color mb-[20px] md:mb-[30px]">
                    {footer_info_widget_data["footer_info_description"]}
                  </p>
                ) : null}

                {/* Socials */}
                {footer_socails_data?.["show_social_links"] === 1 ? (
                  <div className="flex flex-wrap gap-3">
                    {socialsKeys.map((social, index) =>
                      footer_socails_data?.[social] ? (
                        <Link
                          key={`${social}-${index + 1}`}
                          href={footer_socails_data[social] || ""}
                          target={
                            footer_socails_data[social] !== "#"
                              ? "_blank"
                              : "_self"
                          }
                          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primary-100 hover:bg-secondary group transition-all duration-500 ease-in-out"
                        >
                          <span className="text-light-color body1">
                            {social_react_icons[social]}
                          </span>
                        </Link>
                      ) : null
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Pages Links */}
            {footer_pages_widget_data?.["link_one_title"] ||
            footer_pages_widget_data?.["link_one_label"] ||
            footer_pages_widget_data?.["link_one_value"] ? (
              <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 lg:ltr:border-r lg:ltr:border-r-[#ffffff1f] lg:ltr:pr-10 lg:rtl:border-l lg:rtl:border-l-[#ffffff1f] h-full mt-10 md:mt-0">
                <div className="lg:w-fit lg:mx-auto">
                  {footer_pages_widget_data?.["link_one_title"] ? (
                    <h3 className="subtitle-0-1 text-light-color primary-font-family font-bold mb-[30px]">
                      {footer_pages_widget_data["link_one_title"]}
                    </h3>
                  ) : null}

                  {footer_pages_widget_data?.["link_one_label"]?.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                      {footer_pages_widget_data["link_one_label"].map(
                        (label, index) => (
                          <li
                            key={index}
                            className="body2 secondary-font-family font-normal text-light-color hover:text-secondary transition-all duration-500 ease-in-out"
                          >
                            <Link
                              href={`${
                                footer_pages_widget_data?.["link_one_value"]?.[
                                  index
                                ] !== "/"
                                  ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${
                                      footer_pages_widget_data?.[
                                        "link_one_value"
                                      ]?.[index]
                                    }`
                                  : `${
                                      process.env.NEXT_PUBLIC_DOMAIN_URL
                                    }/${currentLanguage}`
                              }`}
                              className="inline-block"
                            >
                              {label}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Our Services Links */}
            {footer_services_widget_data?.["link_two_title"] ||
            footer_services_widget_data?.["link_two_label"] ||
            footer_services_widget_data?.["link_two_value"] ? (
              <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 xl:ltr:border-r xl:ltr:border-r-[#ffffff1f] xl:rtl:border-l xl:rtl:border-l-[#ffffff1f] h-full mt-10 lg:mt-0 md:px-5">
                <div className="lg:w-fit lg:mx-auto">
                  {footer_services_widget_data?.["link_two_title"] ? (
                    <h3 className="subtitle-0-1 text-light-color primary-font-family font-bold mb-[30px]">
                      {footer_services_widget_data["link_two_title"]}
                    </h3>
                  ) : null}

                  {footer_services_widget_data?.["link_two_label"]?.length >
                  0 ? (
                    <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                      <ul className="flex flex-col gap-3">
                        {footer_services_widget_data["link_two_label"].map(
                          (label, index) =>
                            index <= 3 && (
                              <li
                                key={index}
                                className="body2 secondary-font-family font-normal text-light-color hover:text-secondary transition-all duration-500 ease-in-out"
                              >
                                {index === 3 ? (
                                  <Link
                                    href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/en/services#${footer_services_widget_data["link_two_value"]?.[index]?.split("/")?.pop()}`}
                                    className="inline-block"
                                  >
                                    {translate("View All")}
                                  </Link>
                                ) : (
                                  <Link
                                    href={`${
                                      footer_services_widget_data?.[
                                        "link_two_value"
                                      ]?.[index] !== "/"
                                        ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${
                                            footer_services_widget_data?.[
                                              "link_two_value"
                                            ]?.[index]
                                          }`
                                        : `${
                                            process.env.NEXT_PUBLIC_DOMAIN_URL
                                          }/${currentLanguage}`
                                    }`}
                                    className="inline-block"
                                  >
                                    {label}
                                  </Link>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Newsletter */}
            {footer_newsletter_widget_data?.["link_three_title"] ||
            footer_newsletter_widget_data?.["link_three_text"] ? (
              <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-3 h-full xl:ltr:pl-10 xl:rtl:pr-10 mt-10 xl:mt-0">
                {footer_newsletter_widget_data?.["link_three_title"] ? (
                  <h3 className="subtitle-0-1 text-light-color primary-font-family font-bold mb-[30px]">
                    {footer_newsletter_widget_data["link_three_title"]}
                  </h3>
                ) : null}

                <div className="relative w-full h-[50px] border border-[#ffffff1f] rounded-full overflow-hidden mb-[30px]">
                  <input
                    type="text"
                    className="w-full h-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none pl-5 body2 secondary-font-family font-normal text-light-color placeholder:text-dark-white"
                    placeholder={translate("footer_email_placeholder")}
                  />

                  <button
                    type="button"
                    className="absolute top-0 bottom-0 ltr:right-0 rtl:left-0 w-[50px] h-full rounded-full flex flex-shrink-0 justify-center items-center bg-secondary group"
                  >
                    <FaTelegramPlane
                      size={25}
                      className="text-light-color group-hover:text-dark-color transition-all duration-500 ease-in-out"
                    />
                  </button>
                </div>

                {footer_newsletter_widget_data?.["link_three_text"] ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: footer_newsletter_widget_data["link_three_text"],
                    }}
                    className="body2 secondary-font-family font-normal text-light-color"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer Copyright */}
        {copywrite_widget_data?.["copywrite_text"] ? (
          <div className="w-full py-[16px] md:py-[24px] bg-[#ffffff1f] rounded-[50px]">
            <div
              className="flex items-center justify-center body4 md:body2 secondary-font-family font-medium text-light-color"
              dangerouslySetInnerHTML={{
                __html: copywrite_widget_data["copywrite_text"],
              }}
            />
          </div>
        ) : null}
      </div>
    </footer>
  );
};

export default PublicPageFooter;
