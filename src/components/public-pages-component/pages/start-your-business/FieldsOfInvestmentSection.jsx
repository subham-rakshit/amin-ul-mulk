import { fieldsOfInvestments } from "@/app/assets/data/pagesData/start-ur-business-data";
import Image from "next/image";
import {
  BackgroundRevealButton,
  FontResizerWrapper,
  RevealOnView,
  SectionInfo,
} from "../..";

const FieldsOfInvestmentSection = () => {
  return (
    <div className="w-full mt-[140px] mb-[240px]">
      <SectionInfo heading="FIELDS OF INVESTMENT" className="mb-[60px]" />

      <ul className="grid grid-cols-2 gap-10">
        {fieldsOfInvestments.map((item, index) => {
          const delay = index === 0 ? 0 : 0.2 + (index - 1) * 0.1;
          return (
            <RevealOnView
              key={item._id}
              as="li"
              yOffset={100}
              delay={delay}
              className="grid grid-cols-2 gap-5 overflow-hidden"
            >
              <div className="relative w-full h-[300px] overflow-hidden rounded-[24px]">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />

                {/* <div className="absolute inset-0 bg-hero-section-gradient" /> */}
              </div>

              <div className="size-full flex flex-col justify-center gap-5">
                <FontResizerWrapper
                  as="h2"
                  fontClasses={{
                    0: "heading-0-3",
                    1: "heading-3",
                    2: "heading-3-1",
                  }}
                  className="text-primary-400 dark:text-dark-white font-family-primary font-[500]"
                >
                  {item.title}
                </FontResizerWrapper>

                <FontResizerWrapper
                  as="p"
                  fontClasses={{
                    0: "body-0-3",
                    1: "body3",
                    2: "body-3-1",
                  }}
                  className="text-gray-400 dark:text-dark-white font-family-secondary font-[400]"
                >
                  {item.description}
                </FontResizerWrapper>

                <BackgroundRevealButton
                  btnLabel="Explore Now"
                  textColor="text-gray-400 dark:text-dark-white"
                  customFontSize={{
                    0: "body-0-2",
                    1: "body2",
                    2: "body-2-1",
                  }}
                  btnHeight="h-10"
                  innerBtnContainerWidth="w-10"
                  iconSize={18}
                />
              </div>
            </RevealOnView>
          );
        })}
      </ul>
    </div>
  );
};

export default FieldsOfInvestmentSection;
