import Image from "next/image";

const WhyChooseUsSection = () => {
  return (
    <div className="w-full pb-[100px] md:pb-[130px] px-[8px] md:px-[48px] flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[24px] md:gap-[53px]">
      <div className="w-full h-[352px] lg:max-w-[617px] lg:h-[633px] rounded-[20px] lg:rounded-[24px] relative overflow-hidden group">
        <Image
          src="/bin-yaber-assets/pages/about-us/why-choose-us.png"
          alt="Why Choose Us"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover bg-center group-hover:scale-[1.1] transition-300"
        />
      </div>

      <div className="w-full lg:max-w-[650px] flex flex-col gap-[12px] lg:gap-[40px]">
        <h1 className="text-[28px] md:text-[50px] text-black-500 font-candara-rg font-bold">
          WHY CHOOSE US?
        </h1>
        <p className="text-[18px] md:text-[24px] text-black-500 font-candara-rg md:leading-[32px]">
          Bin Yaber is one of the largest and most advanced driving institutes
          in Dubai. Bin Yaber provides Driver License Acquisition Training
          Courses using its fleet of over 400+ vehicles in different categories
          – Light Motor Vehicle (Car), Heavy Bus, Light Bus, Heavy Truck,
          Forklift (Heavy/Light), and Motorcycles.
          <br />
          <br /> In addition, Bin Yaber conducts its trainings at E611, an open
          environment with no road traffic to ensure maximum learning to boost
          the students’ confidence. Our driving experts are multi-lingual with
          fluency in Arabic, English, Hindi, Urdu, Pashto, Malayalam, and
          Tagalog.
        </p>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
