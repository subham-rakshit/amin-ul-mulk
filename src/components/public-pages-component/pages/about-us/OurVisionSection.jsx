import { getAboutUsSectionCardsData } from "@/app/assets/data/pagesData/about-us-page-data";
import Image from "next/image";

const OurVisionSection = () => {
  return (
    <ul className="w-full pb-[100px] md:pb-[130px] md:max-w-[1192px] mx-auto flex flex-col md:flex-row md:justify-between gap-4 md:gap-5">
      {getAboutUsSectionCardsData.map((card, index) => (
        <li
          key={`${card.title}`}
          className="w-full md:max-w-[384px] bg-[#fff] border border-black-100 rounded-[24px] flex flex-col gap-[32px] p-[32px]"
        >
          <div className="size-[44px] p-[6px] rounded-[10px] bg-black-500 flex items-center justify-center">
            <div className="relative size-[28px]">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 28px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <h5 className="text-[24px] text-black-500 font-candara-rg font-bold leading-[29.3px]">
              {card.title}
            </h5>
            <p className="text-[16px] leading-[19.53px] text-[#666D80] font-candara-rg">
              {card.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OurVisionSection;
