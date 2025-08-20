import { useTranslations } from "next-intl";
import { CommonPackageLisitng } from "../..";

const PricesSection = ({
  contentData = {},
  filesList = [],
  currentLanguage = "en",
}) => {
  const translate = useTranslations();

  // Extract Prices Section Data
  const subHeading = contentData?.["home-section-4-pricing-sub-heading"] || "";
  const heading = contentData?.["home-section-4-pricing-heading"] || "";

  return (
    <>
      <section
        id="home-page-prices-section"
        className="w-full pt-[100px] lg:pt-[120px] pb-[50px] bg-primary relative px-2 md:px-5"
      >
        <div className="w-full max-screen-width mx-auto">
          {/* Section Header */}
          {subHeading || heading ? (
            <div className="relative z-[99] flex flex-col items-center gap-2">
              {subHeading && (
                <h3 className="subtitle-2 md:subtitle-1 text-light-color secondary-font-family font-bold">
                  {subHeading}
                </h3>
              )}

              {heading && (
                <>
                  <h2 className="heading-3 md:heading-2 text-light-color primary-font-family font-bold text-center">
                    {heading}
                  </h2>
                  <span className="w-[100px] border border-light-color mt-2 md:mt-5" />
                </>
              )}
            </div>
          ) : null}

          {/* Prices */}
          <CommonPackageLisitng
            filesList={filesList}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* <BackgroundBeams /> */}
      </section>
    </>
  );
};

export default PricesSection;
