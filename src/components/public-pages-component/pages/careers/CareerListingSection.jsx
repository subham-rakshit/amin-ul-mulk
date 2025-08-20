import { careerLists } from "@/app/assets/data/pagesData/careers-page-data";
import Image from "next/image";
import { LightHoverRedirectionButton } from "../..";

const CareerListingSection = () => {
  return (
    <>
      {careerLists && careerLists.length > 0 ? (
        <ul className="w-full max-w-[1200px] mx-auto mt-[16px] md:mt-[40px] mb-[80px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerLists.map((career) => (
            <li
              key={career._id}
              className="w-full md:max-w-[588px] rounded-[24px] bg-white p-[32px] border border-[#E5E5E5] flex flex-col gap-[32px]"
            >
              <div className="size-[40px] rounded-[10px] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
                <div className="size-[20px] relative">
                  <Image
                    src="/bin-yaber-assets/icons/career-icon.png"
                    alt="Career Icon"
                    fill
                    sizes="(max-width: 768px) 20px, 20px"
                    // className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <h4 className="text-[28px] text-black-500 font-candara-rg font-bold leading-[100%]">
                  {career.title}
                </h4>

                <ol className="flex flex-col gap-[8px] list-disc ml-6">
                  {career.requirments && career.requirments.length > 0
                    ? career.requirments.map((requirement, index) => (
                        <li
                          key={`requirement-${index + 1}`}
                          className="text-[18px] text-black-300 font-candara-rg leading-[100%]"
                        >
                          {requirement}
                        </li>
                      ))
                    : null}
                </ol>
              </div>

              <LightHoverRedirectionButton
                redirectionLink={career.applyLink}
                btnText="Apply Now"
                icon={true}
                btnClasses="text-[16px] border border-black-100"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default CareerListingSection;
