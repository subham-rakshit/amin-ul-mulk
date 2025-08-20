"use client";

import { useParams } from "next/navigation";

const ServiceDetailsPage = () => {
  const params = useParams();
  const { slug } = params;
  // const pathname = usePathname();
  // const pathSegments = pathname.split("/").filter(Boolean); // removes empty strings
  // const currentSlug = pathSegments[pathSegments.length - 1];

  // const activeServiceContent = servicesDetailsData.find(
  //   (service) => service.serviceSlug === currentSlug
  // );

  return (
    <>
      {/* <ServiceBannerSection
      sectionId={`${currentSlug}-service-details-section`}
      bannerSrc={activeServiceContent.content.bannerImageSrc}
      /> */}
      <div></div>
    </>
  );
};

export default ServiceDetailsPage;
