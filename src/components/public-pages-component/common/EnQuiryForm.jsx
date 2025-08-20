"use client";

import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useTranslations } from "use-intl";
import { BackgroundRevealButton } from "..";

const services = [
  "service_1", // Family Law
  "service_2", // Financial Settlements
  "service_3", // Construction & Engineering Disputes
  "service_4", // Real Estate Disputes
  "service_5", // Civil Disputes
  "service_6", // Financial Disputes
  "service_7", // Commercial Disputes
  "service_8", // Arbitration
  "service_9", // Criminal
  "service_10", // Settlements
];

const inputClass =
  "w-full border border-[#fff] bg-[#ffffff1f] rounded-[12px] backdrop-blur-md p-[20px] text-primary-400 placeholder-[#ffffff80] secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-[#fff]";
const labelClass =
  "body3 md:body1 text-primary-400 secondary-font-family font-light";

const EnQuiryForm = () => {
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);

  const translate = useTranslations();

  useEffect(() => {
    if (isEnquiryFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isEnquiryFormOpen]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-[999] w-full h-full bg-[#00000090] ${
          isEnquiryFormOpen ? "translate-x-0" : "translate-x-full"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-[999] w-[80vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] h-screen ml-auto bg-home-hero-section-bg-image bg-cover bg-center flex flex-col justify-center items-center ${
          isEnquiryFormOpen ? "translate-x-0" : "translate-x-full"
        } transform transition-transform duration-700 ease-in-out`}
      >
        <div className="absolute inset-0 bg-[#a2790d80] backdrop-blur-sm" />

        <button
          type="button"
          onClick={() => setIsEnquiryFormOpen((prev) => !prev)}
          className={`absolute z-[1000] top-1/2 left-[-30px] -translate-y-1/2 w-[70px] h-[70px] ${isEnquiryFormOpen ? "bg-gray" : "bg-secondary"} rounded-full p-[2px] md:p-2 ${isEnquiryFormOpen ? "flex items-center justify-center" : "flex items-center ltr:justify-start rtl:justify-end transition-all duration-500 ease-in-out border border-dark-color"}`}
        >
          {isEnquiryFormOpen ? (
            <MdClose size={40} color="#fff" />
          ) : (
            <FaTelegramPlane size={20} color="#fff" />
          )}
        </button>

        {!isEnquiryFormOpen && (
          <span
            className="absolute z-[99] top-1/2 -translate-y-1/2 left-[-85px] rotate-[90deg] body1 md:subtitle-1 text-secondary font-family-secondary font-bold"
            style={{
              WebkitTextStroke: "1px #000000",
              paintOrder: "stroke fill",
            }}
          >
            Enquiry
          </span>
        )}

        <form className="w-full mx-auto relative max-h-[90vh] z-[999] overflow-auto pl-10 md:pl-14 pr-2 md:pr-5">
          <h3 className="relative w-full subtitle-1-1 lg:heading-0-3 text-dark-white primary-font-family font-bold mb-5 ltr:border-l-[8px] rtl:border-r-[8px] ltr:border-l-[#D99E0C] rtl:border-r-[#D99E0C] pl-5 rtl:pr-5">
            {translate("Request A Free Quote")}
          </h3>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-5">
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

          <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-5">
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
                className={`w-full border border-[#fff] bg-[#ffffff1f] rounded-[12px] backdrop-blur-md text-primary-400 appearance-none secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-[#fff] h-[50px] mt-2`}
              >
                <option
                  value="none"
                  className="body2 text-gray-400 secondary-font-family font-normal"
                >
                  {translate("services_label")}
                </option>
                {services.map((service, index) => (
                  <option
                    key={index}
                    value={translate(service)}
                    className="body2 text-gray-400 secondary-font-family font-normal"
                  >
                    {translate(service)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label
            className={labelClass}
          >{`${translate("message_label")} *`}</label>

          <textarea
            rows={5}
            type="text"
            className={`${inputClass} h-[120px] mt-2 mb-5`}
            placeholder={translate("message_placeholder")}
          />

          <BackgroundRevealButton
            href="#"
            label={translate("submit_btn_label")}
            className="w-fit px-5 py-[10px] rounded-full"
          />
        </form>
      </div>
    </>
  );
};

export default EnQuiryForm;
