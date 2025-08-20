import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";
import { GoGlobe, GoLocation, GoMail } from "react-icons/go";
import { TbArrowBigDown } from "react-icons/tb";
import { FontResizerWrapper, SectionInfo } from "../..";

const ContactMapSection = () => {
  return (
    <div className="relative z-[99] w-full mt-[52px]">
      <div className="max-screen-width px-5 mb-[43px]">
        <SectionInfo
          heading="Contact With Us"
          headingColor="text-primary-400"
          subHeading="Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
        />
      </div>

      <div className="grid grid-cols-5 h-[600px]">
        <div className="col-span-3 w-full h-full relative overflow-hidden">
          <Image
            src="/fujairah-freezone/pages/contact-us/contact-map.png"
            alt="Map"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="col-span-2 w-full h-full bg-primary-400 p-[55px] flex flex-col justify-center items-center">
          <div className="w-full max-w-fit flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <span>
                <GoLocation size={48} color="#fff" />
              </span>

              <div>
                <FontResizerWrapper
                  as="h2"
                  fontClasses={{
                    0: "subtitle-0-2",
                    1: "subtitle-2",
                    2: "subtitle-2-1",
                  }}
                  className="text-dark-white font-family-secondary font-[200] mb-[12px]"
                >
                  Head Office
                </FontResizerWrapper>

                <FontResizerWrapper
                  as="p"
                  fontClasses={{
                    0: "subtitle-0-3",
                    1: "subtitle-3",
                    2: "subtitle-3-1",
                  }}
                  className="text-dark-white font-family-secondary font-[500]"
                >
                  PO Box 1133, Fujairah,
                  <br /> United Arab Emirates
                </FontResizerWrapper>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span>
                <FiPhoneCall size={48} color="#fff" />
              </span>

              <div>
                <FontResizerWrapper
                  as="h2"
                  fontClasses={{
                    0: "subtitle-0-2",
                    1: "subtitle-2",
                    2: "subtitle-2-1",
                  }}
                  className="text-dark-white font-family-secondary font-[200] mb-[12px]"
                >
                  Reach us over a call
                </FontResizerWrapper>

                <FontResizerWrapper
                  as="p"
                  fontClasses={{
                    0: "subtitle-0-3",
                    1: "subtitle-3",
                    2: "subtitle-3-1",
                  }}
                  className="text-dark-white font-family-secondary font-[500]"
                >
                  Tel : +9719 2228000
                  <br />
                  Fax : +9719 2228888
                </FontResizerWrapper>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="inline-block relative">
                <GoMail size={48} color="#fff" />
                <TbArrowBigDown
                  size={32}
                  color="#fff"
                  className="rotate-[180deg] absolute top-[-12px] left-1/2 translate-x-[-50%] z-[99] fill-[#00587E]"
                />
              </span>

              <div>
                <FontResizerWrapper
                  as="h2"
                  fontClasses={{
                    0: "subtitle-0-2",
                    1: "subtitle-2",
                    2: "subtitle-2-1",
                  }}
                  className="text-dark-white font-family-secondary font-[200] mb-[12px]"
                >
                  E-mail
                </FontResizerWrapper>

                <FontResizerWrapper
                  as="p"
                  fontClasses={{
                    0: "subtitle-0-3",
                    1: "subtitle-3",
                    2: "subtitle-3-1",
                  }}
                  className="text-dark-white font-family-secondary font-[500]"
                >
                  freezone@emirates.net.ae
                </FontResizerWrapper>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span>
                <GoGlobe size={48} color="#fff" />
              </span>

              <div>
                <FontResizerWrapper
                  as="h2"
                  fontClasses={{
                    0: "subtitle-0-2",
                    1: "subtitle-2",
                    2: "subtitle-2-1",
                  }}
                  className="text-dark-white font-family-secondary font-[200] mb-[12px]"
                >
                  Website
                </FontResizerWrapper>

                <FontResizerWrapper
                  as="p"
                  fontClasses={{
                    0: "subtitle-0-3",
                    1: "subtitle-3",
                    2: "subtitle-3-1",
                  }}
                  className="text-dark-white font-family-secondary font-[500]"
                >
                  www.fujairahfreezone.com /<br />
                  www.fujairahfreezone.ae
                </FontResizerWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMapSection;
