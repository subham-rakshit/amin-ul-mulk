import { businessSetup } from "@/app/assets/data/pagesData/home-page-data";
import Image from "next/image";
import { FontResizerWrapper, RevealOnView } from "../..";

const BusinessSetup = () => {
  return (
    <section
      id="home-page-business-setup-section"
      className="w-full py-[80px] relative"
    >
      <div className="absolute inset-0 bg-home-overlay-1 bg-cover opacity-80" />

      <div className="relative z-[99] max-screen-width px-5">
        <div className="flex items-center justify-between gap-[50px]">
          <RevealOnView as="div" yOffset={-100}>
            <FontResizerWrapper
              as="h1"
              fontClasses={{
                0: "heading-0-2",
                1: "heading-2",
                2: "heading-2-1",
              }}
              className="text-gray-400 dark:text-dark-white font-family-primary font-[600]"
            >
              Business setup in the UAE <br />
              made easy
            </FontResizerWrapper>
          </RevealOnView>

          <RevealOnView as="div" yOffset={100}>
            <FontResizerWrapper
              as="p"
              fontClasses={{
                0: "subtitle-0-1",
                1: "subtitle-1",
                2: "subtitle-1-1",
              }}
              className="w-full max-w-[700px] 2xl:max-w-[898px] text-gray-400 dark:text-dark-white font-family-secondary font-[500]"
            >
              Fujairah's strategic & unique location, as the UAE's only Emirate
              on East Coast, plays a key role in its development. Under the
              leadership and vision of Sheikh Hamed Bin Mohammed Al Sharqi, the
              Ruler of Fujairah, the Emirates continues to grow.
            </FontResizerWrapper>
          </RevealOnView>
        </div>

        <div className="grid grid-cols-3 gap-10 mt-[56px]">
          {businessSetup.map((item, index) => {
            const delay = index === 0 ? 0 : 0.2 + (index - 1) * 0.2;

            return (
              <RevealOnView
                key={item._id}
                as="div"
                yOffset={50}
                delay={delay}
                className="h-[300px] rounded-[24px] border border-[#00000024] bg-white relative overflow-hidden group hover:shadow-card-custom-small hover:translate-y-[-20px] transition-all duration-500 ease-in-out flex flex-col justify-center p-[24px]"
              >
                <div className="absolute top-[-40px] left-[-20px] size-[110px] overflow-hidden rounded-full">
                  <Image
                    src="/fujairah-freezone/overlay/dotted-circle.svg"
                    alt="overlay"
                    fill
                    priority={false}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <FontResizerWrapper
                  as="h2"
                  fontClasses={{
                    0: "subtitle-0-1",
                    1: "subtitle-1",
                    2: "subtitle-1-1",
                  }}
                  className="text-gray-400 font-family-secondary font-[500]"
                >
                  {`${index + 1}. ${item.title}`}
                </FontResizerWrapper>

                <FontResizerWrapper
                  as="p"
                  fontClasses={{
                    0: "subtitle-0-2",
                    1: "subtitle-2",
                    2: "subtitle-2-1",
                  }}
                  className="text-gray-400 font-family-secondary font-[500]"
                >
                  {item.description}
                </FontResizerWrapper>

                <div className="absolute left-full -translate-x-[80%] top-full -translate-y-[70%] bg-[#9CB2BB40] group-hover:bg-primary-400 size-[200px] flex items-center justify-center rounded-full overflow-hidden transition-all duration-500 ease-in-out"></div>
                <div className="absolute right-0 top-full -translate-y-full size-[120px] overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover group-hover:brightness-0 group-hover:invert transition-all duration-500 ease-in-out"
                  />
                </div>
              </RevealOnView>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessSetup;
