import Image from "next/image";
import { DarkButton, PageNavigationButton } from "../..";

const GetInTouchSection = () => {
  return (
    <>
      <section
        id="home-page-get-in-touch-section"
        className="w-full py-[80px] md:py-[100px]"
      >
        <div className="w-full rounded-[20px] md:rounded-[26px] bg-white p-[16px] md:px-[20px] md:py-[50px] flex flex-col md:flex-row md:items-center md:justify-between gap-[40px]">
          <div className="w-full max-w-[580px] flex flex-col gap-[14px] md:gap-[16px]">
            <PageNavigationButton
              btnText="Drive"
              extraClasses="md:hidden mx-auto w-fit"
            />
            <h1 className="text-[28px] md:text-[50px] font-candara-rg font-bold text-black-500 leading-[34.18px] md:leading-[61.04px]">
              Ready to Hit the Road? Book Your Lessons Today!
            </h1>
            <p className="text-[14px] md:text-[18px] text-black-500 font-candara-rg leading-[17.09px] md:leading-[21.97px]">
              Start your journey to safe driving! Book your lessons with Bin
              Yaber today and drive with confidence.
            </p>

            <DarkButton
              btnText="Get in touch"
              containerClasses="mt-[10px] md:mt-[12px]"
              extraClasses="md:max-w-[225px]"
            />
          </div>

          <div className="w-full max-w-[693px] h-[255px] md:h-[623px] rounded-[20px] md:rounded-[26px] overflow-hidden relative group">
            <Image
              src="/bin-yaber-assets/pages/home-page/about-section/model-image.png"
              alt="Get in touch"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover group-hover:scale-[1.1] transition-300"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default GetInTouchSection;
