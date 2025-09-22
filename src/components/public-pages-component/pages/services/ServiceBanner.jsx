import Image from "next/image";
import { FrontEndBreadcrumb } from "../..";

const ServiceBanner = ({
  sectionId = "",
  bannerSrc = "",
  bannerTitle = "",
  breadcrumbsFields = [],
  breadcrumbsCurrentTabName = "",
  filesList = [],
}) => {
  return (
    <section
      id={sectionId}
      className="w-full h-[70vh] bg-black relative shadow-card-custom-small flex flex-col items-center justify-center p-5"
      // style={{
      //   backgroundImage: `url(${bannerIamge || bannerSrc})`,
      // }}
    >
      <div className="max-screen-width mx-auto relative z-[99] w-full h-full px-2 md:px-5 flex flex-col justify-center items-center">
        {bannerSrc && (
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-[40%] w-[120px] h-[120px] overflow-hidden flex justify-center items-center">
            <Image
              src={bannerSrc}
              alt="icon"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 100vw"
              className="object-contain invert brightness-0"
            />
          </div>
        )}

        {bannerTitle && (
          <div className="mt-auto">
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
      </div>
    </section>
  );
};

export default ServiceBanner;
