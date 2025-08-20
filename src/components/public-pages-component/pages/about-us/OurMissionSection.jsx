import { PageNavigationButton } from "../..";

const OurMissionSection = () => {
  return (
    <div className="w-full px-[8px] py-[48px] md:px-[46px] md:py-[120px] flex flex-col lg:flex-row lg:justify-between gap-5">
      <div className="min-w-[258px] flex flex-col gap-[14px] md:gap-[28px]">
        <PageNavigationButton btnText="About us" extraClasses="w-fit h-fit" />
        <h1 className="text-[40px] md:text-[50px] text-black-500 font-candara-rg font-bold leading-[48.83px] md:leading-[61.04px]">
          Our Mission
        </h1>
      </div>

      <p
        className="w-full md:max-w-[847px] text-[18px] md:text-[24px] leading-[21.
      97px] md:leading-[30px] text-black-500 font-candara-rg"
      >
        Bin Yaber Driving Institute is a spacious and modern facility. We
        complement this with brand new furniture, equipment, and vehicles for
        you to use. Since you will be spending a minimum of 30 days with us
        learning how to drive a Car, we want the experience to be pleasant.
        <br />
        <br /> What our students enjoy the most is that we are not crowded as
        compared to other driving schools. This means you get to learn in
        smaller groups with individualized attention from our patient
        instructors.
      </p>
    </div>
  );
};

export default OurMissionSection;
