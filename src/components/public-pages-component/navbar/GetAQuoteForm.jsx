"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
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
  "w-full border border-light-color bg-[#ffffff1f] rounded-[12px] backdrop-blur-md p-[20px] text-light-color placeholder-[#ffffff80] secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-light-color";
const labelClass = "body1 text-light-color secondary-font-family font-light";

const GetAQuoteForm = ({
  className = "",
  textColor = "text-dark-white",
  hoverBgColor = "group-hover:bg-primary-blue-500",
  buttonWidth = "min-w-[150px]",
}) => {
  const translate = useTranslations();

  return (
    <Dialog>
      <form>
        <DialogTrigger>
          <div
            className={`group relative px-8 py-[10px] rounded-full ${textColor} hover:text-light-color secondary-font-family font-semibold body3 z-10 inline-block transition-all duration-500 ease-in-out ${className} bg-transparent overflow-hidden ${buttonWidth} flex-shrink-0 flex items-center justify-center`}
          >
            <span className="relative z-[9] flex items-center gap-2">
              {translate(`Book a Consultation`)}
            </span>

            {/* Animated Border (using ::before) */}
            <span className={`absolute inset-0 block z-[8]`}>
              <span className="absolute left-0 top-0 h-full w-full scale-95 opacity-100 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <span
                  className={`absolute inset-0 border-2 border-secondary bg-secondary ${hoverBgColor} transition-all duration-500 ease-in-out rounded-full`}
                />
              </span>
            </span>
          </div>
        </DialogTrigger>

        <DialogContent className="z-[999] w-full h-full md:h-fit bg-home-hero-section-bg-image bg-cover bg-center border-none overflow-hidden">
          <div className="absolute inset-0 bg-[#a2790d80] backdrop-blur-sm" />
          <DialogHeader className="z-[99]">
            <DialogTitle className="heading-0-3 text-light-color primary-font-family font-bold mb-5 ltr:border-l-[10px] rtl:border-r-[10px] ltr:border-l-[#D99E0C] rtl:border-r-[#D99E0C] whitespace-pre-line ltr:pl-5 rtl:pr-5">
              {translate("contact_heading")}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full max-h-[70vh] z-[99] overflow-auto">
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
                  className={`w-full border border-light-color bg-[#ffffff1f] rounded-[12px] backdrop-blur-md text-primary-400 appearance-none secondary-font-family font-normal focus:ring-0 focus-outline-none focus:border-light-color h-[50px] mt-2`}
                >
                  <option
                    value="none"
                    className="body2 text-dark-color secondary-font-family font-normal"
                  >
                    {translate("services_label")}
                  </option>
                  {services.map((service, index) => (
                    <option
                      key={index}
                      value={translate(service)}
                      className="body2 text-dark-color secondary-font-family font-normal"
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
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default GetAQuoteForm;
