import Image from "next/image";

const ChairmanMessageSection = () => {
  return (
    <div className="w-full pb-[100px] md:pb-[130px] px-[8px] md:px-[48px] flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[24px] md:gap-[53px]">
      <div className="w-full h-[352px] lg:max-w-[650px] lg:h-[633px] rounded-[20px] lg:rounded-[24px] relative overflow-hidden order-1 lg:order-2 group">
        <Image
          src="/bin-yaber-assets/pages/about-us/chairman-msg.jpg"
          alt="Chairman"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover bg-center group-hover:scale-[1.1] transition-300"
        />
      </div>

      <div className="w-full lg:max-w-[650px] flex flex-col gap-[12px] lg:gap-[40px] order-1">
        <h1 className="text-[28px] md:text-[50px] text-black-500 font-candara-rg font-bold">
          Message from the Chairman
        </h1>
        <p className="text-[18px] md:text-[24px] text-black-500 font-candara-rg md:leading-[32px]">
          Bin Yaber Driving Institute established itself in one of the world’s
          fastest-growing economies, characterized by an increasingly diverse
          community of citizens and residents.
          <br />
          <br /> BYDI intends to contribute significantly to the growth of this
          nation and move towards the next 50 years, doing our best to ensure
          that every student is a responsible driver – educated on the
          importance of safety and cautious driving.
          <br />
          <br /> As a diversified group of businesses with experience in various
          sectors for over three generations, we maintain a solid commitment to
          building excellent customer relationships.
        </p>
      </div>
    </div>
  );
};

export default ChairmanMessageSection;
