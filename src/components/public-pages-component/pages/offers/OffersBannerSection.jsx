import Image from "next/image";

const OffersBannerSection = () => {
  return (
    <div className="w-full px-[8px] md:px-[46px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {/* Banner 1 */}
      <div className="w-full">
        <Image
          src="/bin-yaber-assets/pages/offers/offer-banner-1.png"
          alt=" Offers Banner 1"
          quality={100}
          width={650}
          height={672}
          priority
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>
      {/* Banner 2 */}
      <div className="w-full">
        <Image
          src="/bin-yaber-assets/pages/offers/offer-banner-2.png"
          alt=" Offers Banner 2"
          quality={100}
          width={650}
          height={672}
          priority
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default OffersBannerSection;
