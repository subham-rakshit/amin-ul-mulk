"use client";

import { getImageFullUrl } from "@/utils/helper-functions";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { BackgroundRevealButton } from "../..";

const inputClass =
  "w-full border border-light-color rounded-[12px] bg-[#ffffff1f] backdrop-blur-md p-[20px] text-primary-400 placeholder-[#ffffff80] secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-light-color";
const labelClass =
  "body2 md:body1 text-light-color secondary-font-family font-light";

const ContactFormSection = ({
  contentData = {},
  filesList = [],
  settingsData = [],
  services = [],
  currentLanguage = "en",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const translate = useTranslations();

  // Extract specific settings from settingsData using a helper function
  const { logo_white_image } = getFESettingsFieldValues(settingsData, [
    "logo_white_image",
  ]);

  // Form CMS data
  const mapImageId = contentData?.["contact-us-section-3-form-image"] || null;
  const formHeading = contentData?.["contact-us-section-3-heading"] || null;
  const submitButtonText =
    contentData?.["contact-us-section-3-button-label"] || null;

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  // Safe Guard
  if (!mapImageId && !formHeading && !submitButtonText) return null;

  return (
    <div className="w-full bg-gold py-5 md:py-10">
      <div className="w-full h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Map */}
        {getImageURL(mapImageId) ? (
          <div className="w-full h-[300px] lg:h-full relative overflow-hidden">
            <Image
              src={getImageURL(mapImageId)}
              alt="map"
              fill
              sizes="(max-width: 767px) 100vw, 100vw"
              className="object-contain filter invert brightness-300 contrast-200" // WHITE Dotted
              // className="object-contain filter invert sepia brightness-50 saturate-[20] hue-rotate-[500deg]"
            />

            {/* Spot Marker */}
            <div
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
              onClick={() => setIsVisible((prev) => !prev)}
              className="absolute top-[42%] left-[65%] -translate-x-[65%] -translate-y-[42%] w-[20px] h-[20px] z-[99] cursor-pointer"
            >
              {/* Outer ping effect */}
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-white animate-ping" />

              {/* Inner solid dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full bg-white" />

              {/* Logo */}
              {getImageURL(logo_white_image) ? (
                <div
                  className={`absolute top-[150%] ltr:lef-1/2 rtl:left-[-110px] ltr:-translate-x-1/2 ${isVisible ? "w-[220px] h-[80px] opacity-100" : "w-0 h-0 opacity-0"} rounded-[8px] bg-[#ffffff] transition-all duration-500 ease-in-out`}
                >
                  <Image
                    src={getImageURL(logo_white_image)}
                    alt="App Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Form */}
        <div className="relative w-full z-[99] overflow-hidden px-2 md:px-5 lg:px-10">
          <form className="w-full h-full">
            {formHeading ? (
              <h2 className="heading-3 md:heading-2 text-light-color primary-font-family font-bold mb-10 whitespace-pre-line">
                {formHeading}
              </h2>
            ) : null}

            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <div className="w-full md:max-w-1/2">
                <label
                  className={labelClass}
                >{`${translate("name_label")} *`}</label>

                <input
                  type="text"
                  className={`${inputClass} h-[50px] mt-2`}
                  placeholder={translate("name_placeholder")}
                />
              </div>

              <div className="w-full md:max-w-1/2">
                <label
                  className={labelClass}
                >{`${translate("email_label")} *`}</label>

                <input
                  type="text"
                  className={`${inputClass} h-[50px] mt-2`}
                  placeholder={translate("email_placeholder")}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <div className="w-full md:max-w-1/2">
                <label
                  className={labelClass}
                >{`${translate("phone_label")} *`}</label>

                <input
                  type="text"
                  className={`${inputClass} h-[50px] mt-2`}
                  placeholder={translate("phone_placeholder")}
                />
              </div>

              <div className="w-full md:max-w-1/2">
                <label
                  className={labelClass}
                >{`${translate("services_label")} *`}</label>

                <select
                  defaultValue="none"
                  className={`w-full border border-light-color rounded-[12px] bg-[#ffffff1f] backdrop-blur-md text-primary-400 appearance-none secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-light-color h-[50px] mt-2`}
                >
                  <option
                    value="none"
                    className="body2 text-dark-color secondary-font-family font-normal"
                  >
                    {translate("services_label")}
                  </option>
                  {services?.length > 0
                    ? services.map((service, index) =>
                        service?.service_name?.[currentLanguage] ? (
                          <option
                            key={service._id || `service-${index}`}
                            value={service._id || "none"}
                            className="body2 text-dark-color secondary-font-family font-normal"
                          >
                            {service.service_name[currentLanguage]}
                          </option>
                        ) : null
                      )
                    : null}
                </select>
              </div>
            </div>

            <label
              className={labelClass}
            >{`${translate("message_label")} *`}</label>

            <textarea
              rows={5}
              type="text"
              className={`${inputClass} h-[200px] mt-2 mb-5`}
              placeholder={translate("message_placeholder")}
            />

            <BackgroundRevealButton
              href="#"
              label={submitButtonText || translate("Get A Quote")}
              borderColor="border-light-color"
              className="w-fit px-5 py-[10px] rounded-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
