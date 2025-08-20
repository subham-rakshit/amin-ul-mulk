import { FrontEndBreadcrumb } from "../..";

const ServiceBannerSection = ({
  sectionId = "",
  bannerSrc = "",
  bannerTitle = "",
}) => {
  return (
    <section
      id={sectionId}
      className="w-full h-[70vh] bg-cover bg-center relative shadow-card-custom-small"
      style={{
        backgroundImage: `url(${bannerSrc})`,
      }}
    >
      <div className="absolute inset-0 bg-[#00000060]" />

      {bannerTitle && (
        <div className="max-screen-width mx-auto relative z-[99] w-full h-full px-2 md:px-5 flex flex-col justify-center items-center">
          <h1 className="w-full heading-3 md:heading-1-1 text-dark-white primary-font-family font-bold text-center whitespace-pre-line mb-8">
            {bannerTitle}
          </h1>

          <FrontEndBreadcrumb
            fields={[
              { label: "Home", link: "/" },
              {
                label: "Services",
                link: "/services",
              },
            ]}
            currentTabName={bannerTitle}
            navContainerClass="flex flex-wrap items-center gap-1"
          />
        </div>
      )}
    </section>
  );
};

export default ServiceBannerSection;
