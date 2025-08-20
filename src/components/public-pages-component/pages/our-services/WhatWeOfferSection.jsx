import { ourServices } from "@/app/assets/data/pagesData/home-page-data";
import { SectionInfo, ServicesCard } from "../..";

const WhatWeOfferSection = () => {
  return (
    <div className="w-full mt-[32px]">
      <SectionInfo
        heading="What We Offer"
        headingColor="text-primary-400"
        subHeading="Fujairah Free Zone Authority is keen to achieve excellence in service provision that not only attains your satisfaction but also exceeds your expectation"
        className="mb-[60px]"
      />

      <ul className="grid grid-cols-3 gap-10 mb-[140px]">
        {ourServices.map((service, index) => {
          const delay = index === 0 ? 0 : 0.2 + (index - 1) * 0.2;

          return (
            <ServicesCard key={service._id} service={service} delay={delay} />
          );
        })}
      </ul>
    </div>
  );
};

export default WhatWeOfferSection;
