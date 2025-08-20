import Link from "next/link";
import { FaPhoneVolume } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";

const ContactCards = () => {
  return (
    <div className="max-screen-width mx-auto w-full px-2 md:px-5 mb-10">
      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
        {/* Location */}
        <div className="w-full h-[200px] md:h-[250px] rounded-[24px] shadow-[-3px_-3px_15px_#ffffff90,_3px_3px_15px_#00000090] hover:shadow-[-2px_-2px_4px_#ffffff90,_2px_2px_4px_#00000090] transition-all duration-200 ease-in-out flex items-center p-8">
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <span className="flex-shrink-0">
              <GrMapLocation className="text-[50px] text-secondary" />
            </span>

            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="heading-3 md:heading-2 primary-font-family font-bold text-secondary text-center">
                Location
              </h2>

              <Link
                href="#"
                className="body2 text-dark-color secondary-font-family font-medium text-center"
              >
                214 West 42nd St, New York, NY 10036
              </Link>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="w-full h-[200px] md:h-[250px] rounded-[24px] shadow-[-3px_-3px_15px_#ffffff90,_3px_3px_15px_#00000090] hover:shadow-[-2px_-2px_4px_#ffffff90,_2px_2px_4px_#00000090] transition-all duration-200 ease-in-out flex items-center p-8">
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <span className="flex-shrink-0">
              <IoIosMail className="text-[50px] text-secondary" />
            </span>

            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="heading-3 md:heading-2 primary-font-family font-bold text-secondary text-center">
                Mail Us
              </h2>

              <Link
                href="mailto:contact@aminulmulkfirm.com"
                className="body1 text-dark-color secondary-font-family font-medium text-center"
              >
                contact@aminulmulkfirm.com
              </Link>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="w-full h-[200px] md:h-[250px] rounded-[24px] shadow-[-3px_-3px_15px_#ffffff90,_3px_3px_15px_#00000090] hover:shadow-[-2px_-2px_4px_#ffffff90,_2px_2px_4px_#00000090] transition-all duration-200 ease-in-out flex items-center p-8">
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <span className="flex-shrink-0">
              <FaPhoneVolume className="text-[50px] text-secondary rotate-[-45deg]" />
            </span>

            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="heading-3 md:heading-2 primary-font-family font-bold text-secondary text-center">
                Call Us
              </h2>

              <Link
                href="tel:+15273948612"
                className="body1 text-dark-color secondary-font-family font-medium text-center"
              >
                +15273948612
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
