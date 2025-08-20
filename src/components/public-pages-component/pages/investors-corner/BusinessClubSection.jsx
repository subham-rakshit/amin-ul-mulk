import Image from "next/image";
import { FontResizerWrapper, RevealOnView, SectionInfo } from "../..";

const BusinessClubSection = () => {
  return (
    <div className="w-full mt-[32px]">
      <SectionInfo
        heading="Business Club"
        headingColor="text-primary-400"
        subHeading="The Fujairah Free Zone Authority is dedicated to delivering exceptional services that not only meet your needs but also surpass your expectations."
        className="mb-[60px]"
      />

      <RevealOnView as="div" yOffset={100} className="relative">
        <div className="relative overflow-hidden w-full h-[500px] rounded-[24px]">
          <Image
            src="/fujairah-freezone/pages/investors-corner/business-club-1.png"
            alt="Business Club"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="w-full max-w-[650px] absolute top-full -translate-y-1/2 bg-[linear-gradient(270deg,_#00587E_0%,_#C8212B_100%)] rounded-[12px] p-5 ml-5">
          <FontResizerWrapper
            as="h2"
            fontClasses={{
              0: "heading-0-3",
              1: "heading-3",
              2: "heading-3-1",
            }}
            className="text-dark-white font-family-primary font-[600]"
          >
            Fujairah Free Zone Authority offers the Business Club
          </FontResizerWrapper>

          <FontResizerWrapper
            as="p"
            fontClasses={{
              0: "body-0-2",
              1: "body2",
              2: "body-2-1",
            }}
            className="text-dark-white font-family-secondary font-[400] mt-5"
          >
            Whether you are launching a new product, hosting a live event,
            Exhibitions, premiering a screening or presenting a seminar, The
            Business Club is the ideal place. As always, your own convenience is
            at the heart of our thinking. Business Club include Auditorium,
            Majlis, Ballroom, Meeting Rooms, An Ideal Conference Space.
          </FontResizerWrapper>
        </div>
      </RevealOnView>

      <div className="grid grid-cols-2 gap-10 my-[200px] overflow-hidden">
        <RevealOnView
          as="div"
          yOffset={100}
          className="w-full h-full flex flex-col justify-center gap-8"
        >
          <FontResizerWrapper
            as="h1"
            fontClasses={{
              0: "heading-0-2",
              1: "heading-2",
              2: "heading-2-1",
            }}
            className="text-primary-400 dark:text-dark-white font-family-primary font-[600]"
          >
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </FontResizerWrapper>

          <FontResizerWrapper
            as="p"
            fontClasses={{
              0: "subtitle-0-2",
              1: "subtitle-2",
              2: "subtitle-2-1",
            }}
            className="text-gray-400 dark:text-dark-white font-family-primary font-[400]"
          >
            Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </FontResizerWrapper>
        </RevealOnView>

        <RevealOnView
          as="div"
          yOffset={100}
          delay={0.4}
          className="relative w-full h-[500px] rounded-[24px] overflow-hidden"
        >
          <Image
            src="/fujairah-freezone/pages/investors-corner/business-club-2.png"
            alt="Business"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </RevealOnView>
      </div>
    </div>
  );
};

export default BusinessClubSection;
