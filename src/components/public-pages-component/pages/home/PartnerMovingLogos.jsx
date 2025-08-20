import Image from "next/image";
import Marquee from "react-fast-marquee";

const PartnerMovingLogos = ({ logos = [], rtlStatus = false }) => {
  if (logos.length === 0) return null;

  const renderLogos = (logo, index) => {
    const { src, alt } = logo;

    return (
      <div
        key={`logo-${index + 1}`}
        className="relative overflow-hidden w-full h-[100px] min-w-[200px]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-fill brightness-0 invert"
        />
      </div>
    );
  };

  return (
    <div className="w-full" dir="ltr">
      <Marquee pauseOnHover={true} autoFill={true} speed={30}>
        {logos.map((logo, index) => renderLogos(logo, index))}
      </Marquee>
    </div>
  );
};

export default PartnerMovingLogos;
