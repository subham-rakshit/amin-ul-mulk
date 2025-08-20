import Image from "next/image";
import { CountUpNumber, FontResizerWrapper, RevealOnView } from "../..";

const ContentSection = () => {
  return (
    <>
      <RevealOnView as="div" yOffset={100}>
        <FontResizerWrapper
          as="p"
          fontClasses={{
            0: "subtitle-0-2",
            1: "subtitle-2",
            2: "subtitle-2-1",
          }}
          className="text-gray-400 dark:text-dark-white font-family-secondary font-[500] mt-[16px]"
        >
          Fujairah Free Zone is adjacent to the Port of Fujairah. Companies
          established here have easy access to all Arabian Gulf ports, the Red
          Sea, Iran, India and Pakistan on weekly feeder vessels. Mainline
          services arrive from Northern Europe, the Mediterranean, Far East and
          North America on a weekly basis, and services leave twice weekly to
          the Far East and once a week to North America. Fujairah Free Zone is
          also close to Fujairah International Airport which is the only airport
          serving the UAE East Coast as well as northern Oman.
          <br />
          <br />A fortunate combination of geographic location, with access to
          world's major shipping routes, a fine port & airport, and streamlined
          procedures, make the Free Zone of Fujairah an ideal place for
          business.
        </FontResizerWrapper>
      </RevealOnView>

      {/* Investors benefit */}
      <div className="grid grid-cols-2 gap-10 my-[80px] overflow-hidden">
        <RevealOnView
          as="div"
          yOffset={100}
          className="relative w-full h-[666px] rounded-[24px] overflow-hidden"
        >
          <Image
            src="/fujairah-freezone/pages/about/about-fujairah-1.png"
            alt="Investors Benefit"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </RevealOnView>

        <RevealOnView
          as="div"
          yOffset={100}
          delay={0.6}
          className="w-full h-full flex flex-col justify-center gap-8"
        >
          <FontResizerWrapper
            as="h1"
            fontClasses={{
              0: "heading-0-2",
              1: "heading-2",
              2: "heading-2-1",
            }}
            className="text-primary-400 dark:text-dark-white font-family-primary font-[600]"
          >
            Investors benefit from the triple Fujairah Free Zone advantage,
            namely the ACE-Accessibility, Connectivity & Economy.
          </FontResizerWrapper>

          <FontResizerWrapper
            as="p"
            fontClasses={{
              0: "subtitle-0-2",
              1: "subtitle-2",
              2: "subtitle-2-1",
            }}
            className="text-gray-400 dark:text-dark-white font-family-primary font-[400]"
          >
            Accessibility & personal touch of the staff, and management.
            Fujairah Free Zone offers a unique Connectivity - logistic link to
            the world; by air through Fujairah International Airport, by sea
            through Fujairah Sea Port, and by road to Middle East & beyond.
            Investors benefit by way of faster transaction, accruing due to
            shorter delivery times. Fujairah Free Zone (FFZ) offers an unmatched
            Economy - cheaper tariffs, and minimum start up time.
          </FontResizerWrapper>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <FontResizerWrapper
                as="h1"
                fontClasses={{
                  0: "heading-0-1",
                  1: "heading-1",
                  2: "heading-1-1",
                }}
                className="text-primary-400 dark:text-dark-white font-family-primary font-[600]"
              >
                <CountUpNumber number="200+" />
              </FontResizerWrapper>

              <FontResizerWrapper
                as="span"
                fontClasses={{
                  0: "body-0-2",
                  1: "body2",
                  2: "body-2-1",
                }}
                className="text-gray-400 dark:text-dark-white font-family-secondary font-[400]"
              >
                Number Of Users
              </FontResizerWrapper>
            </div>

            <div>
              <FontResizerWrapper
                as="h1"
                fontClasses={{
                  0: "heading-0-1",
                  1: "heading-1",
                  2: "heading-1-1",
                }}
                className="text-primary-400 dark:text-dark-white font-family-primary font-[600]"
              >
                <CountUpNumber number="10k" />
              </FontResizerWrapper>

              <FontResizerWrapper
                as="span"
                fontClasses={{
                  0: "body-0-2",
                  1: "body2",
                  2: "body-2-1",
                }}
                className="text-gray-400 dark:text-dark-white font-family-secondary font-[400]"
              >
                Number Of Visitors
              </FontResizerWrapper>
            </div>

            <div>
              <FontResizerWrapper
                as="h1"
                fontClasses={{
                  0: "heading-0-1",
                  1: "heading-1",
                  2: "heading-1-1",
                }}
                className="text-primary-400 dark:text-dark-white font-family-primary font-[600]"
              >
                <CountUpNumber number="40+" />
              </FontResizerWrapper>

              <FontResizerWrapper
                as="span"
                fontClasses={{
                  0: "body-0-2",
                  1: "body2",
                  2: "body-2-1",
                }}
                className="text-gray-400 dark:text-dark-white font-family-secondary font-[400]"
              >
                Number Of Companies
              </FontResizerWrapper>
            </div>
          </div>
        </RevealOnView>
      </div>

      {/* Our History */}
      <div className="mb-[250px]">
        <div className="flex items-center justify-between gap-5 mb-[24px]">
          <FontResizerWrapper
            as="h1"
            fontClasses={{
              0: "heading-0-2",
              1: "heading-2",
              2: "heading-2-1",
            }}
            className="text-gray-400 dark:text-dark-white font-family-primary font-[600]"
          >
            Our History
          </FontResizerWrapper>

          <FontResizerWrapper
            as="p"
            fontClasses={{
              0: "subtitle-0-2",
              1: "subtitle-2",
              2: "subtitle-2-1",
            }}
            className="max-w-[626px] text-gray-400 dark:text-dark-white font-family-secondary font-[500]"
          >
            Iconic moments in the history of Fujairah Free Zone Establishment of
            modern office complexes
          </FontResizerWrapper>
        </div>

        <div className="grid grid-cols-2 gap-10 bg-[linear-gradient(to_right,_#E7F8FF,_#FFFFFF)] border border-[#00587E20] shadow-card-custom-small rounded-[24px] px-[26px] py-[50px] overflow-hidden">
          <div className="w-full h-full flex flex-col justify-center gap-8">
            <RevealOnView as="div" xOffset={-100}>
              <FontResizerWrapper
                as="h1"
                fontClasses={{
                  0: "heading-0-2",
                  1: "heading-2",
                  2: "heading-2-1",
                }}
                className="text-primary-400 font-family-primary font-[600]"
              >
                Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </FontResizerWrapper>
            </RevealOnView>

            <RevealOnView as="div" yOffset={100}>
              <FontResizerWrapper
                as="p"
                fontClasses={{
                  0: "subtitle-0-2",
                  1: "subtitle-2",
                  2: "subtitle-2-1",
                }}
                className="text-gray-400 font-family-primary font-[400]"
              >
                Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </FontResizerWrapper>
            </RevealOnView>
          </div>

          <RevealOnView
            as="div"
            yOffset={100}
            delay={0.6}
            className="relative w-full h-[500px] rounded-[24px] overflow-hidden"
          >
            <Image
              src="/fujairah-freezone/pages/about/about-our-history.png"
              alt="Our History"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
            />
          </RevealOnView>
        </div>
      </div>
    </>
  );
};

export default ContentSection;
