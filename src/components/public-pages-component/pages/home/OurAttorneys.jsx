"use client";

import Slider from "react-slick";

import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useMemo, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const OurAttorneys = ({
  sectionId = "",
  contentData = {},
  data = [],
  filesList = [],
}) => {
  const [sliderRef, setSliderRef] = useState(null);

  const sub_heading =
    contentData?.["home-section-7-attorneys-sub-heading"] || "";
  const heading = contentData?.["home-section-7-attorneys-heading"] || "";

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

  // Handle Empty Data
  if (!heading && !sub_heading && !data.length) return null;

  return (
    <section
      id={sectionId}
      className="w-full py-[50px] bg-light-color relative px-2 md:px-5"
    >
      <div className="w-full max-screen-width mx-auto">
        {/* Section Info */}
        {(sub_heading || heading) && (
          <div className="flex flex-col justify-center gap-2 md:gap-5 lg:px-10">
            {sub_heading && (
              <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold text-center">
                {sub_heading}
              </h3>
            )}

            {heading && (
              <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold text-center">
                {heading}
              </h2>
            )}
          </div>
        )}

        {/* Attorneys Slider */}
        {data.length > 0 && (
          <div className="w-full flex">
            {/* Pev Arrow Button */}
            <div className="flex items-center ltr:order-1 rtl:order-3">
              <button
                type="button"
                onClick={() => sliderRef?.slickPrev()}
                className="bg-dark-color hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center"
              >
                <IoIosArrowBack size={20} />
              </button>
            </div>

            {/* Slider */}
            <div className="w-full overflow-hidden order-2">
              {data && data.length > 0 && (
                <Slider ref={setSliderRef} {...settings}>
                  {data.map((member, index) => {
                    const imageId = member?.image || "";
                    const name = member?.name || "";
                    const designation = member?.designation || "";
                    const descripiton = member?.description || "";

                    return (
                      <div key={`member-${index + 1}`} className={`px-2 group`}>
                        <div className="relative w-full h-full flex flex-col items-center">
                          <div className="relative z-[99] top-[50px] w-[100px] h-[100px] overflow-hidden rounded-full border-[3px] group-hover:border-[5px] bg-light-color border-gold flex items-center justify-center transition-all duration-300 ease-in-out">
                            <FaRegUser className="text-dark-color text-[40px]" />
                          </div>

                          <div className="w-full border min-h-[320px] flex flex-col gap-4 bg-transparent border-t border-r border-l border-b-[5px] group-hover:border-b-[10px] border-gold rounded-[50px] group px-5 py-5 transition-all duration-300 ease-in-out pt-[70px]">
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

                                {descripiton && (
                                  <p className="body3 text-dark-color secondary-font-family font-normal text-center mt-3">
                                    {descripiton}
                                  </p>
                                )}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>

            {/* Next Arrow Button */}
            <div className="flex items-center ltr:order-3 rtl:order-1">
              <button
                type="button"
                onClick={() => sliderRef?.slickNext()}
                className="bg-dark-color hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurAttorneys;
