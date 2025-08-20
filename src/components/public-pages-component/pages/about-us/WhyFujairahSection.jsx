import { whyFujairahSectionData } from "@/app/assets/data/pagesData/about-us-page-data";
import Image from "next/image";
import { FontResizerWrapper } from "../..";

const WhyFujairahSection = () => {
  return (
    <div className="w-full bg-primary-400 relative mb-[250px] flex flex-col justify-center overflow-hidden">
      <div className="absolute top-0 right-[-100px] w-[600px] h-full">
        <Image
          src="/fujairah-freezone/overlay/about-overlay-1.svg"
          alt="overlay"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 left-[-50px] w-[400px] h-full">
        <Image
          src="/fujairah-freezone/overlay/about-overlay-2.svg"
          alt="overlay"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-[99] max-screen-width px-5 py-[50px]">
        <FontResizerWrapper
          as="h1"
          fontClasses={{
            0: "heading-0-2",
            1: "heading-2",
            2: "heading-2-1",
          }}
          className="text-dark-white font-family-primary font-[600] text-center"
        >
          Why Fujairah Free Zone
        </FontResizerWrapper>

        <FontResizerWrapper
          as="p"
          fontClasses={{
            0: "subtitle-0-2",
            1: "subtitle-2",
            2: "subtitle-2-1",
          }}
          className="text-dark-white font-family-primary font-[400] text-center mt-[24px]"
        >
          Multi-access to neighboring and global markets by land, sea and air.
        </FontResizerWrapper>

        <ul className="grid grid-cols-5 gap-5 mt-[40px]">
          {whyFujairahSectionData.map((item, index) => (
            <li key={index} className="flex flex-col items-center gap-2">
              <div className="size-[100px] relative overflow-hidden">
                <Image
                  src={item.icon}
                  alt="icon"
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>

              <FontResizerWrapper
                as="p"
                fontClasses={{
                  0: "body-0-3",
                  1: "body3",
                  2: "body-3-1",
                }}
                className="text-dark-white font-family-secondary font-[400] text-center"
              >
                {item.text1}
              </FontResizerWrapper>

              <FontResizerWrapper
                as="p"
                fontClasses={{
                  0: "body-0-4",
                  1: "body4",
                  2: "body-4-1",
                }}
                className="text-dark-white font-family-secondary font-[400] text-center mt-[10px]"
              >
                {item.text2}
              </FontResizerWrapper>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhyFujairahSection;
