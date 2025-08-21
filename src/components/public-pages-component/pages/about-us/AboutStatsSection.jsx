import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const AboutStatsSection = ({ contentData = {}, filesList = [] }) => {
  // Extract necessary Stats data
  const statsHeading = contentData?.["home-section-3-wcu-heading"] || "";

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <div className="w-full px-2 py-3 md:px-5 md:py-[20px] overflow-hidden bg-secondary flex flex-col justify-center">
      {statsHeading ? (
        <h2 className="subtitle-2 md:heading-3 text-light-color primary-font-family font-bold text-center mb-5 lg:mb-10">
          {statsHeading}
        </h2>
      ) : null}

      <div className="grid grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => {
            const statsCount = contentData?.[`stats-count-${index + 1}`] || "";
            const statsText = contentData?.[`stats-text-${index + 1}`] || "";
            const logoId = contentData?.[`stats-logo-${index + 1}`] || "";

            return (
              <div
                key={index}
                className="md:border-r md:border-r-[#ffffff1f] last:border-r-0 h-[100px] flex flex-col md:flex-row items-center justify-center gap-3 group"
              >
                {/* Logo */}
                {getImageURL(logoId) ? (
                  <div className="relative overflow-hidden w-[20px] h-[20px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]">
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
                    <h2 className="body2 md:subtitle-2 lg:heading-3-1 text-light-color secondary-font-family font-bold mb-1 text-center md:text-start">
                      <span>{statsCount}</span>
                    </h2>
                  ) : null}

                  {/* Text */}
                  {statsText ? (
                    <p className="body-0-4 lg:body2 text-light-color secondary-font-family font-normal">
                      {statsText}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AboutStatsSection;
