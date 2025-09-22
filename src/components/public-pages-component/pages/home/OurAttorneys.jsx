"use client";

import { useTranslations } from "next-intl";
import Slider from "react-slick";

import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useMemo, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const OurAttorneys = ({ sectionId = "", data = [], filesList = [] }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const translate = useTranslations();

  // Slider settings
  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1279, // < xl
          settings: {
            slidesToShow: 3, // lg
          },
        },
        {
          breakpoint: 1023, // < lg
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

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <section
      id={sectionId}
      className="w-full py-[50px] bg-light-color relative px-2 md:px-5"
    >
      <div className="w-full max-screen-width mx-auto overflow-hidden">
        {/* Section Info */}
        <div className=" flex flex-col items-center md:flex-row md:items-end justify-between gap-5">
          <div className="flex flex-col justify-center gap-2 md:gap-5 lg:px-10">
            <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold text-center md:text-left">
              {translate("attorney_subheading")}
            </h3>
            <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold text-center md:text-left">
              {translate("attorney_heading")}
            </h2>
          </div>

          {/* <BackgroundRevealButton
            href="#"
            label={translate("attorney_btn_label")}
            borderColor="border-dark-color"
            textColor="text-dark-color"
            textSize="body2"
            hoverBgColor="group-hover:bg-secondary"
            className="w-fit px-5 py-[12px]"
          /> */}
        </div>

        {/* Attorneys */}
        <div className="relative w-full pt-[30px]">
          {/* Navigation Buttons */}
          <div className="absolute top-[60%] -translate-y-[60%] z-[9] w-full flex items-center justify-between">
            <button
              type="button"
              onClick={() => sliderRef?.slickPrev()}
              className="bg-dark-color hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center ltr:order-1 rtl:order-2"
            >
              <IoIosArrowBack size={20} />
            </button>

            <button
              type="button"
              onClick={() => sliderRef?.slickNext()}
              className="bg-dark-color hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center ltr:order-2 rtl:order-1"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>

          {data && data.length > 0 && (
            <Slider ref={setSliderRef} {...settings}>
              {data.map((member, index) => {
                const imageId = member?.image || "";
                const name = member?.name || "";
                const designation = member?.designation || "";

                return (
                  <li key={`member-${index + 1}`} className={`px-3 group`}>
                    <div className="relative w-full h-full flex flex-col items-center">
                      <div className="relative z-[99] top-[50px] w-[100px] h-[100px] overflow-hidden rounded-full border-[3px] group-hover:border-[5px] bg-light-color border-gold flex items-center justify-center transition-all duration-300 ease-in-out">
                        <FaRegUser className="text-dark-color text-[40px]" />
                      </div>

                      <div className="w-full border min-h-[320px] flex flex-col justify-between bg-transparent border-t border-r border-l border-b-[5px] group-hover:border-b-[10px] border-gold rounded-[50px] group px-5 py-5 transition-all duration-300 ease-in-out pt-[70px]">
                        {name || designation ? (
                          <>
                            <div>
                              {name && (
                                <h3 className="subtitle-1-1 text-secondary primary-font-family font-[600] text-center">
                                  {name}
                                </h3>
                              )}

                              {designation && (
                                <p className="body-2-1 text-dark-color secondary-font-family font-normal text-center mt-3">
                                  {designation}
                                </p>
                              )}
                            </div>

                            <p className="body3 text-dark-color secondary-font-family font-normal text-center mt-3">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Tempora iste qui pariatur
                              aliquam, veritatis aperiam vero!
                            </p>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurAttorneys;
