import { DarkButton, PageNavigationButton } from "../..";

const OffersContentSection = () => {
  return (
    <div className="w-full my-[60px] px-[8px] md:px-[46px] flex flex-col lg:flex-row lg:justify-between gap-5">
      <div className="w-full md:max-w-[328px] flex flex-col gap-5">
        <PageNavigationButton btnText="Offers" extraClasses="w-fit h-fit" />

        <h1 className="text-[32px] md:text-[50px] text-black-500 font-candara-rg font-bold leading-[100%]">
          Offers in Dubai
        </h1>
      </div>
      <div className="w-full md:max-w-[847px] flex flex-col gap-[40px]">
        <p className="text-[18px] md:text-[24px] text-black-500 font-candara-rg leading-[100%] md:leading-[30px]">
          Looking to kickstart your journey on the road in Dubai? Look no
          further! Bin Yaber Driving School is your gateway to hassle-free and
          affordable driving license acquisition with our exclusive offers. Our
          driving school is renowned for providing top-notch training that not
          only ensures you pass your driving test with flying colors but also
          equips you with the skills needed to navigate Dubai’s bustling roads
          confidently.
          <br />
          <br /> Contact us for exclusive driving school offers in Dubai
        </p>

        <DarkButton
          btnText="Get in touch"
          targetLink="#"
          extraClasses="md:max-w-[343px]"
        />
      </div>
    </div>
  );
};

export default OffersContentSection;
