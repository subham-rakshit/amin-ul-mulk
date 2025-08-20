import Image from "next/image";

const BannerSection = () => {
  return (
    <>
      <div className="w-full h-[378px] md:h-[608px] rounded-[20px] md:rounded-[24px] relative overflow-hidden">
        <Image
          src="/bin-yaber-assets/pages/about-us/about-us-banner.png"
          alt="Bin Yaber Banner"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
    </>
  );
};

export default BannerSection;
