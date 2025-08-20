import {
  ourCommitmentsData,
  yourCommitmentsData,
} from "@/app/assets/data/pagesData/our-services-data";
import Image from "next/image";
import { FaRegCheckCircle } from "react-icons/fa";
import { FontResizerWrapper } from "../..";

const CommitmentsSection = () => {
  return (
    <div className="w-full mb-[250px]">
      <div className="max-screen-width bg-primary-400 relative rounded-[24px] overflow-hidden px-[50px] py-[50px]">
        <div className="absolute top-0 right-0 w-[600px] h-full">
          <Image
            src="/fujairah-freezone/overlay/our-services-commitments-overlay.svg"
            alt="overlay"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover opacity-20"
          />
        </div>

        <div className="relative z-[99] grid grid-cols-2 gap-10">
          <div>
            <FontResizerWrapper
              as="h1"
              fontClasses={{
                0: "heading-0-3",
                1: "heading-3",
                2: "heading-3-1",
              }}
              className="text-dark-white font-family-primary font-[600] uppercase mb-[12px]"
            >
              {ourCommitmentsData.heading}
            </FontResizerWrapper>

            <FontResizerWrapper
              as="p"
              fontClasses={{
                0: "subtitle-0-2",
                1: "subtitle-2",
                2: "subtitle-2-1",
              }}
              className="text-dark-white font-family-primary font-[500]"
            >
              {ourCommitmentsData.subHeading}
            </FontResizerWrapper>

            <ul className="flex flex-col gap-5 mt-[40px]">
              {ourCommitmentsData.commitmentsList.map((item, index) => (
                <li key={index} className="flex items-baseline gap-2">
                  <span>
                    <FaRegCheckCircle size={14} color="#fff" />
                  </span>

                  <FontResizerWrapper
                    as="p"
                    fontClasses={{
                      0: "body-0-3",
                      1: "body3",
                      2: "body-3-1",
                    }}
                    className="text-dark-white font-family-secondary font-[400] text-start leading-[24px]"
                  >
                    {item}
                  </FontResizerWrapper>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FontResizerWrapper
              as="h1"
              fontClasses={{
                0: "heading-0-3",
                1: "heading-3",
                2: "heading-3-1",
              }}
              className="text-dark-white font-family-primary font-[600] uppercase mb-[12px]"
            >
              {yourCommitmentsData.heading}
            </FontResizerWrapper>

            <FontResizerWrapper
              as="p"
              fontClasses={{
                0: "subtitle-0-2",
                1: "subtitle-2",
                2: "subtitle-2-1",
              }}
              className="text-dark-white font-family-primary font-[500]"
            >
              {yourCommitmentsData.subHeading}
            </FontResizerWrapper>

            <ul className="flex flex-col gap-5 mt-[40px]">
              {yourCommitmentsData.commitmentsList.map((item, index) => (
                <li key={index} className="flex items-baseline gap-2">
                  <span>
                    <FaRegCheckCircle size={14} color="#fff" />
                  </span>

                  <FontResizerWrapper
                    as="p"
                    fontClasses={{
                      0: "body-0-3",
                      1: "body3",
                      2: "body-3-1",
                    }}
                    className="text-dark-white font-family-secondary font-[400] text-start leading-[24px]"
                  >
                    {item}
                  </FontResizerWrapper>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentsSection;
