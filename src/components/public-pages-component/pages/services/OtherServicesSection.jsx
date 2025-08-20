"use client";

import { servicesDetailsData } from "@/app/assets/data/pagesData/service-details-page-data";
import { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import { FlipServiceCard } from "../..";

const OtherServicesSection = () => {
  const [sliderRef, setSliderRef] = useState(null);

  // Slider settings
  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024, // < lg
          settings: {
            slidesToShow: 2, // sm
          },
        },
        {
          breakpoint: 639, // < sm
          settings: {
            slidesToShow: 1, // xs
          },
        },
      ],
    };
  }, []);

  return (
    <section
      id="other-services-list"
      className="w-full h-full py-[50px] bg-primary-blue-500"
    >
      <div className="w-full max-screen-width mx-auto px-5">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 pb-10 mb-5">
          <h2
            className={`heading-3 md:heading-2 text-gold-400 primary-font-family font-bold`}
          >
            Other Services
          </h2>
          <span className="w-[100px] border border-gold mt-5" />
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 z-[9] w-full flex items-center justify-between">
            <button
              type="button"
              onClick={() => sliderRef?.slickPrev()}
              className="bg-gray hover:bg-gold transition-all duration-500 ease-in-out size-[40px] rounded-full text-dark-white flex items-center justify-center ltr:order-1 rtl:order-2"
            >
              <IoIosArrowBack size={20} />
            </button>

            <button
              type="button"
              onClick={() => sliderRef?.slickNext()}
              className="bg-gray hover:bg-gold transition-all duration-500 ease-in-out size-[40px] rounded-full text-dark-white flex items-center justify-center ltr:order-2 rtl:order-1"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>

          <Slider ref={setSliderRef} {...settings}>
            {servicesDetailsData.map((service, index) => (
              <div key={index} className="px-2">
                <FlipServiceCard service={service} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default OtherServicesSection;
