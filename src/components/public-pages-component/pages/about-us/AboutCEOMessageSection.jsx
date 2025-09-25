import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const AboutCEOMessageSection = ({ contentData = {}, filesList = [] }) => {
  const heading = contentData?.["about-us-section-4-heading"] || "";
  const message = contentData?.["about-us-section-4-message"] || "";
  const ceo_name = contentData?.["about-us-section-4-ceo-name"] || "";
  const ceo_image = contentData?.["about-us-section-4-ceo-image"] || "";

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  if (!heading && !message && !ceo_name && !ceo_image) return null;

  return (
    <div className="grid grid-cols-12 gap-5 md:gap-10 py-[50px]">
      {/* Message */}
      <div className="col-span-12 md:col-span-7">
        {heading && (
          <h2 className="heading-3 md:heading-2-1 text-dark-color primary-font-family font-bold">
            {heading}
          </h2>
        )}

        {message && (
          <p className="w-full body2 md:subtitle-2 text-dark-color secondary-font-family font-medium mt-5 md:mt-8">
            {message}
          </p>
        )}

        {ceo_name && (
          <p className="w-full body2 md:subtitle-2 text-dark-color secondary-font-family font-medium mt-3">
            {`- ${ceo_name}`}
          </p>
        )}
      </div>

      {/* CEO Image */}
      {ceo_image && (
        <div className="col-span-12 md:col-span-5 w-full max-w-[400px] h-[400px] relative overflow-hidden rounded-[12px] mx-auto md:mx-0 md:ltr:ml-auto md:rtl:mr-auto">
          {getImageURL(ceo_image) && (
            <Image
              src={getImageURL(ceo_image)}
              alt="CEO"
              fill
              sizes="(max-width: 767px) 100vw, 100vw"
              className="object-cover ltr:scale-x-[-1] bg-center"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AboutCEOMessageSection;
