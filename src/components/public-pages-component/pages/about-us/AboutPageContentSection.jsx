import { getImageFullUrl } from "@/utils/helper-functions";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const AboutPageContentSection = ({ contentData = {}, filesList = [] }) => {
  // About Section Data
  const subHeading = contentData?.["about-us-section-2-sub-heading"] || "";
  const heading = contentData?.["about-us-section-2-heading"] || "";
  const description = contentData?.["about-us-section-2-description"] || "";

  const iamge_1 = contentData?.["about-us-section-2-image"] || "";
  // const iamge_2 = contentData?.["about-us-section-2-image-2"] || "";
  // const iamge_3 = contentData?.["about-us-section-2-image-3"] || "";

  const about_details_section_image =
    contentData?.["about-us-section-3-image"] || "";
  const about_details_section_heading =
    contentData?.["about-us-section-3-heading"] || "";
  const about_details_section_description =
    contentData?.["about-us-section-3-description"] || "";

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <>
      {/* About Image and Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10">
        {/* Left Images */}
        {iamge_1 ? (
          <div className="w-full h-full min-h-[200px] max-h-[200px] lg:min-h-[300px] lg:max-h-[300px] relative rounded-[12px] hover:scale-[1.1] transition-all duration-500 ease-in-out lg:mt-[50px]">
            <Image
              src={getImageURL(iamge_1)}
              alt="about 1"
              fill
              sizes="(max-width: 767px) 100vw, 100vw"
              className="object-contain"
            />
          </div>
        ) : null}

        {/* Right Info */}
        {subHeading || heading || description ? (
          <div className="w-full h-full flex flex-col justify-center">
            {subHeading ? (
              <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold">
                {subHeading}
              </h3>
            ) : null}

            {heading ? (
              <h2 className="heading-3 md:heading-2-1 text-dark-color primary-font-family font-bold mt-3">
                {heading}
              </h2>
            ) : null}

            {description ? (
              <div
                className="body2 md:subtitle-2 text-dark-color secondary-font-family font-normal mt-3 md:mt-5 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTMLServer(description),
                }}
              />
            ) : null}

            {/* {about_details_section_heading ? (
              <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold mt-3 md:mt-5">
                {about_details_section_heading}
              </h2>
            ) : null}

            {about_details_section_description ? (
              <div
                className="w-full whitespace-pre-line body2 md:subtitle-2 text-dark-color secondary-font-family font-medium mt-3 md:mt-5"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTMLServer(about_details_section_description),
                }}
              />
            ) : null} */}
          </div>
        ) : null}
      </div>

      {/* Zig Zac Pattern Info */}
      {/* <div className="w-full mt-[30px] md:mt-[60px]">
        <div className="grid grid-cols-12 gap-5 md:gap-8">
          {about_details_section_heading ||
          about_details_section_description ? (
            <div className="col-span-12 md:col-span-6 order-2">
              {about_details_section_heading ? (
                <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold">
                  {about_details_section_heading}
                </h2>
              ) : null}

              {about_details_section_description ? (
                <div
                  className="w-full whitespace-pre-line body2 md:subtitle-2 text-dark-color secondary-font-family font-medium mt-3 md:mt-5"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTMLServer(
                      about_details_section_description
                    ),
                  }}
                />
              ) : null}
            </div>
          ) : null}

          {about_details_section_image ? (
            <div className="col-span-12 md:col-span-6 w-full h-[400px] md:h-full md:min-h-[400px] relative overflow-hidden rounded-[12px] shadow-card-custom">
              <Image
                src={getImageURL(about_details_section_image)}
                alt="about 4"
                fill
                sizes="(max-width: 767px) 100vw, 100vw"
                className="object-cover hover:scale-[1.1] transition-all duration-500 ease-in-out"
              />
            </div>
          ) : null}
        </div>
      </div> */}
    </>
  );
};

export default AboutPageContentSection;
