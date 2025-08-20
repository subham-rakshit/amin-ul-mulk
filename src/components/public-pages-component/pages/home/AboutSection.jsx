import { aboutSectionData } from "@/app/assets/data/pagesData/home-page-data";
import ROUTES from "@/constants/routes";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DrawOutlineLinkButton, PageNavigationButton } from "../..";

const AboutSection = () => {
  return (
    <>
      <section
        id="home-page-about-section"
        className="w-full pt-[48px] md:px-[60px] md:pt-[100px]"
      >
        <div className="flex flex-col xl:flex-row xl:justify-between gap-4 xl:gap-5">
          <PageNavigationButton btnText="About us" extraClasses="w-fit h-fit" />

          <div className="w-full max-w-[841px]">
            <p className="text-[18px] md:text-[32px] leading-[21.97px] md:leading-[39.06px] text-black-500 font-candara-rg">
              We are one of Dubai’s top driving schools, dedicated to safety,
              confidence, and skill development. With a range of courses to suit
              every learner, we’re here to help you become a licensed and
              skilled driver in the UAE
            </p>

            <DrawOutlineLinkButton
              redirectionLink={ROUTES.ABOUT_US}
              extraClasses="hidden md:flex"
              btnClasses="p-[12px]"
            >
              <span className="text-[16px] md:text-[20px] text-black-500 font-candara-rg flex items-center gap-2">
                <span>Read more</span>
                <ArrowRight className="size-[20px] md:size-[24px] text-black-300" />
              </span>
            </DrawOutlineLinkButton>
          </div>
        </div>

        {/* Desktop Image Layout (Stacked) */}
        <div className="w-full h-[300px] hidden md:flex justify-center gap-5 mt-[48px] md:mt-[50px]">
          {(aboutSectionData || []).map((eachImage, index) => (
            <div
              key={eachImage._id}
              className="relative rounded-[12px] md:rounded-[17px] overflow-hidden w-full max-w-[322px] h-full group"
            >
              <Image
                src={eachImage.imageSrc}
                alt={eachImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover group-hover:scale-[1.2] transition-300"
              />
            </div>
          ))}
        </div>

        {/* Mobile Image Layout (Stacked) */}
        <div className="flex md:hidden w-full h-[242px] gap-2 mt-[48px]">
          <div className="w-full h-full relative rounded-[12px] overflow-hidden">
            <Image
              src={aboutSectionData[1].imageSrc} // Middle image as main
              alt={aboutSectionData[1].alt}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col w-full h-full gap-2">
            <div className="w-full h-[117px] relative rounded-[12px] overflow-hidden">
              <Image
                src={aboutSectionData[0].imageSrc} // Left image
                alt={aboutSectionData[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="w-full h-[117px] relative rounded-[12px] overflow-hidden">
              <Image
                src={aboutSectionData[2].imageSrc} // Right image
                alt={aboutSectionData[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
