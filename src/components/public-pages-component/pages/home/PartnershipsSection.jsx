import Image from "next/image";
import {
  BackgroundRevealButton,
  FontResizerWrapper,
  RevealOnView,
} from "../..";

const PartnershipsSection = () => {
  return (
    <section id="home-page-partnerships-section" className="w-full px-5">
      <div className="w-full max-screen-width h-[500px] border border-[#00000060] dark:border-[#ffffff20] rounded-[24px] flex items-center overflow-hidden pl-5">
        <div className="overflow-hidden">
          <RevealOnView as="div" xOffset={-100}>
            <FontResizerWrapper
              as="h1"
              fontClasses={{
                0: "heading-0-2",
                1: "heading-2",
                2: "heading-2-1",
              }}
              className="text-gray-400 dark:text-dark-white font-family-primary font-[600]"
            >
              Looking to create partnerships for your business?
            </FontResizerWrapper>
          </RevealOnView>

          <RevealOnView as="div" yOffset={100}>
            <FontResizerWrapper
              as="p"
              fontClasses={{
                0: "subtitle-0-1",
                1: "subtitle-1",
                2: "subtitle-1-1",
              }}
              className="text-gray-400 dark:text-dark-white font-family-secondary font-[500] my-[24px]"
            >
              “Fostering long-term strategic collaborations that drive
              innovation, create shared value, and shape the future of industry
              together.”
            </FontResizerWrapper>
          </RevealOnView>

          <BackgroundRevealButton
            btnLabel="Partnership Offers"
            textColor="text-gray-400 dark:text-dark-white"
          />
        </div>

        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 z-[99] bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#212227] dark:via-[#21222780]" />

          <Image
            src="/fujairah-freezone/pages/home/partnerships.png"
            alt="Partnerships"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
