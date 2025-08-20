"use client";

import { useTranslations } from "next-intl";
import { BackgroundRevealButton } from "..";

const inputClass =
  "w-full border border-light-color rounded-[12px] bg-[#ffffff1f] backdrop-blur-md p-[20px] text-primary-400 placeholder-[#ffffff80] secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-light-color";
const labelClass =
  "body2 md:body1 text-light-color secondary-font-family font-light";

const GetInTouchFormSection = ({
  services = [],
  contactFormHeading = "",
  currentLanguage = "en",
}) => {
  const translate = useTranslations();

  return (
    <div className="relative w-full z-[99] overflow-hidden px-2 py-5 md:p-10">
      <form className="w-full h-full">
        {contactFormHeading ? (
          <h2 className="heading-3 md:heading-2 text-light-color primary-font-family font-bold mb-5 md:mb-10 whitespace-pre-line">
            {contactFormHeading}
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
              className={`w-full border border-light-color rounded-[12px] bg-[#ffffff1f] backdrop-blur-md text-light-color appearance-none secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-light-color h-[50px] mt-2`}
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
          label={translate("submit_btn_label")}
          borderColor="border-light-color"
          className="w-fit px-5 py-[10px] rounded-full"
        />
      </form>
    </div>
  );
};

export default GetInTouchFormSection;
