import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { FrontEndBreadcrumb } from "..";

const CommonBannerSection = ({
  sectionId = "",
  bannerSrc = "",
  bannerTitle = "",
  breadcrumbsFields = [],
  breadcrumbsCurrentTabName = "",
  filesList = [],
}) => {
  const bannerIamge = bannerSrc
    ? getImageFullUrl(
        getFileSettingsValue(filesList, bannerSrc)?.fileUrl ?? null
      )
    : null;

  return (
    <section
      id={sectionId}
      className="w-full h-[70vh] bg-cover bg-center relative shadow-card-custom-small"
      style={{
        backgroundImage: `url(${bannerIamge || bannerSrc})`,
      }}
    >
      {/* <div className="absolute inset-0 bg-[#00000099]" /> */}
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[9] size-full overflow-hidden">
        <Image
          src="/amin-ul-miulk-law-firm/bg/hero1-overlay-dark-option-2.png"
          alt="hero overlay"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 100vw"
          className="object-cover scale-[1.3] brightness-0"
        />
      </div>

      {bannerTitle && (
        <div className="max-screen-width mx-auto relative z-[99] w-full h-full px-2 md:px-5 flex flex-col justify-center items-center pt-[100px]">
          <h1 className="w-full heading-3 md:heading-1-1 text-light-color primary-font-family font-bold text-center whitespace-pre-line mb-8 capitalize">
            {bannerTitle}
          </h1>

          <FrontEndBreadcrumb
            fields={breadcrumbsFields}
            currentTabName={breadcrumbsCurrentTabName}
            navContainerClass="flex flex-wrap justify-center items-center gap-1"
          />
        </div>
      )}
    </section>
  );
};

export default CommonBannerSection;
