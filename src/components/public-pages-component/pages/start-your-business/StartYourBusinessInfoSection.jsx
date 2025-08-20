import Image from "next/image";
import { FontResizerWrapper, RevealOnView } from "../..";

const StartYourBusinessInfoSection = () => {
  return (
    <div className="grid grid-cols-2 gap-10 mt-[32px]">
      <RevealOnView
        as="div"
        yOffset={100}
        className="relative overflow-hidden w-full h-[500px] rounded-[24px]"
      >
        <Image
          src="/fujairah-freezone/pages/start-your-business/start-ur-business-info.png"
          alt="Start Your Business"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-hero-section-gradient" />
      </RevealOnView>

      <RevealOnView
        as="div"
        yOffset={100}
        delay={0.6}
        className="w-full h-full flex flex-col justify-center gap-6"
      >
        <FontResizerWrapper
          as="h1"
          fontClasses={{
            0: "heading-0-1",
            1: "heading-1",
            2: "heading-1-1",
          }}
          className="text-primary-400 dark:text-dark-white font-family-primary font-[600]"
        >
          Start Your Business
        </FontResizerWrapper>

        <FontResizerWrapper
          as="p"
          fontClasses={{
            0: "body-0-1",
            1: "body1",
            2: "body-1-1",
          }}
          className="text-gray-400 dark:text-dark-white font-family-secondary font-[400]"
        >
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis.
          <br />
          <br />
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis.
        </FontResizerWrapper>
      </RevealOnView>
    </div>
  );
};

export default StartYourBusinessInfoSection;
