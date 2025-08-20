import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { IoCall } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";
import { BackgroundRevealButton } from "../..";

const PartnersSection = ({
  contentData = {},
  filesList = [],
  currentLanguage = "en",
}) => {
  const translate = useTranslations();
  const logos = useMemo(
    () => [
      {
        src: "/amin-ul-miulk-law-firm/brand/brand_2_1.svg",
        alt: "brand 1",
      },
      {
        src: "/amin-ul-miulk-law-firm/brand/brand_2_2.svg",
        alt: "brand 2",
      },
      {
        src: "/amin-ul-miulk-law-firm/brand/brand_2_3.svg",
        alt: "brand 3",
      },
      {
        src: "/amin-ul-miulk-law-firm/brand/brand_2_4.svg",
        alt: "brand 4",
      },
      {
        src: "/amin-ul-miulk-law-firm/brand/brand_2_5.svg",
        alt: "brand 5",
      },
      {
        src: "/amin-ul-miulk-law-firm/brand/brand_2_6.svg",
        alt: "brand 6",
      },
    ],
    []
  );

  // Extract Partners Section Data
  const subHeading =
    contentData?.["home-section-6-consultation-sub-heading"] || "";
  const heading = contentData?.["home-section-6-consultation-heading"] || "";
  const description =
    contentData?.["home-section-6-consultation-description"] || "";
  const bgImage = contentData?.["home-section-6-consultation-image"] || "";

  const buttonOneLabel =
    contentData?.["home-section-6-consultation-button-one-label"] || "";
  const buttonTwoLabel =
    contentData?.["home-section-6-consultation-button-two-label"] || "";
  const buttonTwoLink =
    contentData?.["home-section-6-consultation-button-two-link"] || "#";

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
    !description &&
    !bgImage &&
    !buttonOneLabel &&
    !buttonTwoLabel &&
    !buttonTwoLink
  )
    return null;

  return (
    <section
      id="home-page-partners-section"
      className="w-full relative bg-cover bg-center"
      style={{
        backgroundImage: getImageURL(bgImage)
          ? `url(${getImageURL(bgImage)})`
          : "",
      }}
    >
      <div className="relative z-[99] w-full max-screen-width mx-auto flex items-center justify-end py-[25px] px-2 md:px-5">
        <div className="w-full max-w-[600px] lg:max-w-[700px] xl:max-w-full md:w-fit ltr-lg:pr-10 ltr-xl:pr-20 rtl:ml-auto">
          {subHeading && (
            <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold">
              {subHeading}
            </h3>
          )}

          {heading && (
            <h2 className="max-w-[750px] heading-3 text-light-color primary-font-family font-bold mt-2">
              {translate("marquee_heading")}
            </h2>
          )}

          {description && (
            <p className="max-w-[750px] body2 md:body1 text-light-color secondary-font-family font-medium mt-3 md:mt-5">
              {translate("marquee_desc")}
            </p>
          )}

          {(buttonOneLabel || buttonTwoLabel) && (
            <div className="flex items-center gap-1 md:gap-3 mt-5">
              {buttonOneLabel && (
                <BackgroundRevealButton
                  href={"#home-page-get-in-touch-section"}
                  label={buttonOneLabel}
                  className="w-fit px-1 md:px-5 py-[10px]"
                  borderColor="border-light-color"
                  textColor="text-light-color"
                  textSize="body4 sm:body3"
                  hoverBgColor="group-hover:bg-secondary"
                  iconPosition="LEFT"
                  icon={
                    <MdPermContactCalendar className="text-[10px] md:text-[16px]" />
                  }
                />
              )}

              {buttonTwoLabel && buttonTwoLink && (
                <BackgroundRevealButton
                  href={
                    buttonTwoLink && buttonTwoLink.startsWith("+")
                      ? `tel:${buttonTwoLink}`
                      : "#"
                  }
                  label={buttonTwoLabel}
                  className="w-fit px-1 md:px-5 py-[10px]"
                  borderColor="border-light-color"
                  textColor="text-light-color"
                  textSize="body4 sm:body3"
                  hoverBgColor="group-hover:bg-secondary"
                  iconPosition="LEFT"
                  icon={<IoCall className="text-[10px] md:text-[16px]" />}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
