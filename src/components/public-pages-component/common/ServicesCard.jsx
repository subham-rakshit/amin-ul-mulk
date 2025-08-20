import Image from "next/image";
import { BackgroundRevealButton, FontResizerWrapper, RevealOnView } from "..";

const ServicesCard = ({ service = {}, delay = 0 }) => {
  if (Object.keys(service).length === 0) return null;

  return (
    <RevealOnView
      key={service._id}
      as="div"
      yOffset={100}
      delay={delay}
      className="h-[450px] rounded-[24px] overflow-hidden shadow-card-custom-small bg-white"
    >
      <div className="relative w-full h-1/2 overflow-hidden">
        <Image
          src={service.imageSrc}
          alt={service.alt}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover hover:scale-[1.05] transition-all duration-500 ease-in-out"
        />
      </div>

      <div className="relative w-full h-1/2 flex flex-col justify-center px-[24px] py-[20px]">
        <div>
          <FontResizerWrapper
            as="h2"
            fontClasses={{
              0: "subtitle-0-1",
              1: "subtitle-1",
              2: "subtitle-1-1",
            }}
            className="text-gray-400 font-family-secondary font-[500]"
          >
            {service.title}
          </FontResizerWrapper>

          <FontResizerWrapper
            as="p"
            fontClasses={{
              0: "body-0-2",
              1: "body2",
              2: "body-2-1",
            }}
            className="text-gray-400 font-family-secondary font-[500] my-[10px]"
          >
            {service.description}
          </FontResizerWrapper>

          <BackgroundRevealButton
            btnLabel="Apply Now"
            textColor="text-gray-400 dark:text-gray-400"
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
      </div>
    </RevealOnView>
  );
};

export default ServicesCard;
