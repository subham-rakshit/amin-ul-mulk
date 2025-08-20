import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BackgroundRevealButton, FontResizerWrapper } from "..";

const PageHeroSection = ({
  sectionId = "",
  bgImageClass = "",
  subHeading = "",
  heading = "",
  description = "",
  btnLabel = "",
}) => {
  if (!heading && !subHeading && !description && !btnLabel) return null;

  return (
    <section
      id={sectionId ? sectionId : ""}
      className={`w-full flex min-h-[100vh] bg-cover bg-end relative overflow-hidden ${bgImageClass}`}
    >
      <div className="absolute inset-0 bg-hero-section-gradient" />

      <div className="mt-auto max-screen-width relative z-[99] px-5 pb-[40px] 2xl:pb-[100px]">
        <div className="w-full max-w-[800px]">
          {subHeading && (
            <FontResizerWrapper
              as="h3"
              fontClasses={{ 0: "body-0-1", 1: "body1", 2: "body-1-0" }}
              className="text-dark-white font-family-secondary font-[500] uppercase"
            >
              {subHeading}
            </FontResizerWrapper>
          )}
          {heading && (
            <TypingAnimation loop={true} duration={150}>
              <FontResizerWrapper
                as="h1"
                fontClasses={{
                  0: "heading-0-1",
                  1: "heading-1",
                  2: "heading-1-1",
                }}
                className="text-dark-white font-family-primary capitalize mb-[24px]"
              >
                {heading}
              </FontResizerWrapper>
            </TypingAnimation>
          )}
          {description && (
            <FontResizerWrapper
              as="p"
              fontClasses={{
                0: "subtitle-0-2",
                1: "subtitle-2",
                2: "subtitle-2-1",
              }}
              className="text-dark-white font-family-secondary mb-[24px]"
            >
              {description}
            </FontResizerWrapper>
          )}

          {btnLabel && <BackgroundRevealButton btnLabel={btnLabel} />}
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
