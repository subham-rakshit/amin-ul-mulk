import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { BackgroundRevealButton } from "../..";

const AboutCompanySection = ({
  contentData = {},
  filesList = [],
  currentLanguage = "en",
}) => {
  const TEXT =
    "Dedicated\u00A0Experience\u00A0of\u00A05\u00A0Years\u00A0is\u00A0Industry\u00A0";
  const LETTERS = TEXT.split("");

  const radius = 100; // Circle radius
  const centerX = 150;
  const centerY = 100; // Push it down
  const angleStep = 180 / (LETTERS.length - 1);

  // Extract necessary data
  const subHeading =
    contentData?.["home-section-2-about-company-sub-heading"] || "";
  const heading = contentData?.["home-section-2-about-company-heading"] || "";

  const title = contentData?.["home-section-2-about-company-title"] || "";
  const description =
    contentData?.["home-section-2-about-company-description"] || "";

  const imageSrcId = contentData?.["home-section-2-about-company-image"] || "";
  const imageLeftText =
    contentData?.["home-section-2-about-company-image-left-text"] || "";
  const experienceNumber =
    contentData?.["home-section-2-about-company-experience"] || "";
  const imageRightText =
    contentData?.["home-section-2-about-company-image-right-text"] || "";

  const buttonLabel =
    contentData?.["home-section-2-about-company-button-label"] || "";

  // Extract necessary Stats data
  const statsHeading = contentData?.["home-section-3-wcu-heading"] || "";

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  // Handle Empty Data
  if (
    !subHeading &&
    !heading &&
    !title &&
    !description &&
    !imageSrcId &&
    !imageLeftText &&
    !experienceNumber &&
    !imageRightText &&
    !buttonLabel
  ) {
    return null;
  }

  return (
    <section
      id="home-page-about-company-section"
      className="w-full pt-[30px] md:pt-[50px] pb-[200px] bg-light-color relative"
    >
      <div className="w-full max-screen-width mx-auto px-2 md:px-5">
        {/* Section Header */}
        {subHeading || heading ? (
          <div className="flex flex-col items-center gap-2 pb-5 md:pb-10">
            {subHeading && (
              <h3 className="subtitle-2 md:subtitle-1 text-secondary test-font-family font-bold text-center">
                {subHeading}
              </h3>
            )}

            {heading && (
              <>
                <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold text-center">
                  {heading}
                </h2>
                <span className="w-[100px] border border-secondary mt-2 md:mt-5" />
              </>
            )}
          </div>
        ) : null}

        {/* Content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10">
          {/* Text Content */}
          {(title || description || buttonLabel) && (
            <div className="relative z-[99] flex flex-col justify-center">
              {title && (
                <h2 className="heading-0-3 md:heading-0-2 text-secondary primary-font-family font-bold mb-5 md:mb-8">
                  {title}
                </h2>
              )}
              {description && (
                <div
                  className="body2 lg:subtitle-2 text-dark-color secondary-font-family font-medium mb-6 whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTMLServer(description),
                  }}
                />
              )}

              {buttonLabel && (
                <BackgroundRevealButton
                  href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.ABOUT_US}`}
                  label={buttonLabel}
                  borderColor="border-dark-color"
                  textColor="text-dark-color"
                  textSize="body2"
                  hoverBgColor="group-hover:bg-secondary"
                  className="w-fit px-4 py-[12px]"
                  iconPosition="RIGHT"
                  icon={
                    <FaArrowRight size={15} className="rtl:rotate-[180deg]" />
                  }
                />
              )}
            </div>
          )}

          {/* Right Image */}
          {getImageURL(imageSrcId) && (
            <div className="hidden lg:flex">
              <div className="relative z-[99] w-full max-w-[500px] mx-auto bg-[#1b1b22] pb-[75px] rounded-t-[30px] rounded-b-[500px]">
                {/* <!-- Image --> */}
                <div className="w-full h-[500px] relative overflow-hidden rounded-t-[30px] rounded-b-[500px] flex items-center justify-center">
                  <Image
                    src={getImageURL(imageSrcId)}
                    alt="about"
                    fill
                    sizes="(max-width: 767px) 100vw, 100vw"
                    className="object-cover bg-end"
                  />
                </div>

                {/* <!-- Left Text --> */}
                {imageLeftText && (
                  <div
                    className="w-[195px] aspect-[13/15] absolute bottom-[30px] left-[10px] text-white"
                    dir="ltr"
                  >
                    <svg viewBox="0 0 195.5 225.5" className="w-full h-full">
                      <defs>
                        <path
                          id="curve1"
                          d="M0,0c0,108.9,109.9,215,195.5,221.4"
                        />
                      </defs>
                      <text className="fill-white text-[16px] font-bold primary-font-family tracking-wide">
                        <textPath
                          href="#curve1"
                          startOffset="97%"
                          textAnchor="end"
                        >
                          {imageLeftText}
                        </textPath>
                      </text>
                    </svg>
                  </div>
                )}

                {/* <!-- Right Text --> */}
                {imageRightText && (
                  <div
                    className="w-[195px] aspect-[13/15] absolute bottom-[30px] right-[5px] text-white"
                    dir="ltr"
                  >
                    <svg viewBox="0 0 195.5 225.7" className="w-full h-full">
                      <defs>
                        <path
                          id="curve2"
                          d="M0,221.4C85.5,215,195.5,108.9,195.5,0"
                        />
                      </defs>
                      <text className="fill-white text-[16px] font-bold primary-font-family tracking-wider">
                        <textPath
                          href="#curve2"
                          startOffset="2%"
                          textAnchor="start"
                        >
                          {imageRightText}
                        </textPath>
                      </text>
                    </svg>
                  </div>
                )}

                {/* <!-- Count --> */}
                {experienceNumber && (
                  <div className="w-[75px] h-[75px] rounded-full border border-secondary text-[52px] font-extrabold text-secondary test-font-family absolute bottom-0 left-1/2 -translate-x-1/2 flex items-start justify-center">
                    {experienceNumber}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-150px] lg:bottom-[-100px] z-[99] w-full max-screen-width rounded-[30px] md:rounded-[50px] px-2 py-3 md:px-5 md:py-[20px] overflow-hidden bg-secondary flex flex-col justify-center">
          {statsHeading ? (
            <h2 className="subtitle-2 md:heading-3 text-light-color primary-font-family font-bold text-center mb-5 lg:mb-10">
              {statsHeading}
            </h2>
          ) : null}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0">
            {Array(4)
              .fill(0)
              .map((_, index) => {
                const statsCount =
                  contentData?.[`stats-count-${index + 1}`] || "";
                const statsText =
                  contentData?.[`stats-text-${index + 1}`] || "";
                const logoId = contentData?.[`stats-logo-${index + 1}`] || "";

                return (
                  <div
                    key={index}
                    className="md:border-r md:border-r-[#ffffff1f] last:border-r-0 h-[100px] flex flex-col md:flex-row items-center justify-center gap-3 group"
                  >
                    {/* Logo */}
                    {getImageURL(logoId) ? (
                      <div className="relative overflow-hidden w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]">
                        <Image
                          src={getImageURL(logoId)}
                          alt={`${statsText || "Stats"}`}
                          fill
                          sizes="(max-width: 767px) 100vw, 100vw"
                          className="object-contain"
                        />
                      </div>
                    ) : null}

                    <div>
                      {/* Count */}
                      {statsCount ? (
                        <h2 className="subtitle-2 lg:heading-3-1 text-light-color secondary-font-family font-bold mb-1 text-center md:text-start">
                          <span>{statsCount}</span>
                        </h2>
                      ) : null}

                      {/* Text */}
                      {statsText ? (
                        <p className="body2 text-light-color secondary-font-family font-normal">
                          {statsText}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
