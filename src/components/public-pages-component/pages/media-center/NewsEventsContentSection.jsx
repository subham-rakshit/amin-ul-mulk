import { newsAndEvents } from "@/app/assets/data/pagesData/media-center-data";
import Image from "next/image";
import {
  BackgroundRevealButton,
  FontResizerWrapper,
  RevealOnView,
  SectionInfo,
} from "../..";

const NewsEventsContentSection = () => {
  return (
    <div className="w-full mt-[32px]">
      <SectionInfo
        heading="News & Events"
        headingColor="text-primary-400"
        subHeading="The Fujairah Free Zone Authority is committed to providing outstanding services that not only fulfill your requirements but also exceed your expectations."
        className="mb-[60px]"
      />

      <ul className="grid grid-cols-3 gap-5 mb-[80px]">
        {newsAndEvents.map((eachCategory) =>
          eachCategory.children.map((item, index) => {
            const delay = index === 0 ? 0 : 0.1 + (index - 1) * 0.1;
            return (
              <RevealOnView
                key={item._id}
                as="li"
                yOffset={100}
                delay={delay}
                className="w-full p-6 rounded-[12px] border border-[#00587E50] shadow-custom-three-sides bg-white dark:bg-[#ffffff10]"
              >
                <div className="relative overflow-hidden w-full h-[380px] rounded-[12px] shadow-[0px_4px_4px_0px_#00587E80]">
                  <Image
                    src={item.imageSrc}
                    alt={`News and Events ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />

                  <div className="absolute top-0 left-0 z-[99] bg-primary-400 rounded-br-[12px] rounded-bl-[12px] p-[6px] ml-5 flex flex-col items-center justify-center">
                    <FontResizerWrapper
                      as="span"
                      fontClasses={{
                        0: "body-0-1",
                        1: "body1",
                        2: "body-1-1",
                      }}
                      className="text-dark-white font-family-secondary font-[600] uppercase"
                    >
                      <span>{item.updatedAt.split(" ")[0]}</span>
                    </FontResizerWrapper>

                    <FontResizerWrapper
                      as="span"
                      fontClasses={{
                        0: "body-0-3",
                        1: "body3",
                        2: "body-3-1",
                      }}
                      className="text-dark-white font-family-secondary font-[600] capitalize"
                    >
                      <span>
                        {item.updatedAt.split(" ").slice(1).join(" ")}
                      </span>
                    </FontResizerWrapper>
                  </div>
                </div>

                <div className="w-full mt-[36px]">
                  <FontResizerWrapper
                    as="h2"
                    fontClasses={{
                      0: "subtitle-0-1",
                      1: "subtitle-1",
                      2: "subtitle-1-1",
                    }}
                    className="text-primary-400 dark:text-dark-white font-family-primary font-[500]"
                  >
                    {item.title}
                  </FontResizerWrapper>

                  <FontResizerWrapper
                    as="p"
                    fontClasses={{
                      0: "body-0-2",
                      1: "body2",
                      2: "body-2-1",
                    }}
                    className="text-gray-400 dark:text-dark-white font-family-secondary font-[400] mt-1 mb-[24px]"
                  >
                    {item.description}
                  </FontResizerWrapper>

                  <BackgroundRevealButton
                    btnLabel="Read More"
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
          })
        )}
      </ul>

      {/* <CustomPaginationSection /> */}
    </div>
  );
};

export default NewsEventsContentSection;
