"use client";

import { getImageFullUrl } from "@/utils/helper-functions";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";

const TestimonialSection = ({
  contentData = {},
  filesList = [],
  currentLanguage = "en",
  testimonials = [],
}) => {
  const [sliderRef, setSliderRef] = useState(null);

  // Slider settings
  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      // speed: 500,
      slidesToShow: testimonials.length > 3 ? 3 : testimonials.length,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1279, // < xl
          settings: {
            slidesToShow: testimonials.length > 2 ? 2 : testimonials.length, // lg
          },
        },
        // {
        //   breakpoint: 1023, // < lg
        //   settings: {
        //     slidesToShow: 2, // sm
        //   },
        // },
        {
          breakpoint: 639, // < sm
          settings: {
            slidesToShow: 1, // xs
          },
        },
      ],
    };
  }, []);

  // Extract Testimonial Section Data
  const subHeading =
    contentData?.["home-section-9-testimonial-sub-heading"] || "";
  const heading = contentData?.["home-section-9-testimonial-heading"] || "";
  const testimonialImage =
    contentData?.["home-section-9-testimonial-image"] || "";
  const testimonialLogoImage =
    contentData?.["home-section-9-testimonial-logo-image"] || "";
  const testimonialLogoText =
    contentData?.["home-section-9-testimonial-logo-text"] || "";

  // Get Image Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  // Handle Empty Data
  if (
    !subHeading &&
    !heading &&
    !testimonialImage &&
    !testimonialLogoImage &&
    !testimonialLogoText &&
    !testimonials.length
  )
    return null;

  return (
    <>
      <section
        id="home-page-testimonial-section"
        className="w-full py-[50px] bg-light-color relative px-2 md:px-5"
      >
        <div className="w-full max-screen-width mx-auto">
          <div className="grid grid-cols-1">
            {/* Testimonial Right Carousel */}
            <div className="w-full lg:px-10 flex flex-col justify-center md:gap-5">
              {/* Section Header */}
              {subHeading || heading ? (
                <div className="flex flex-col items-center gap-3 mb-5 md:mb-10">
                  {subHeading && (
                    <h3 className="subtitle-2 md:subtitle-1 text-secondary secondary-font-family font-bold">
                      {subHeading}
                    </h3>
                  )}

                  {heading && (
                    <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold">
                      {heading}
                    </h2>
                  )}
                </div>
              ) : null}

              {/* Testimonial Slider */}
              <div className="relative overflow-hidden">
                {/* Navigation Buttons */}
                <div className="absolute top-[50%] -translate-y-[50%] z-[9] w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => sliderRef?.slickPrev()}
                    className="bg-[#00000080] hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center ltr:order-1 rtl:order-2"
                  >
                    <IoIosArrowBack size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => sliderRef?.slickNext()}
                    className="bg-[#00000080] hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center ltr:order-2 rtl:order-1"
                  >
                    <IoIosArrowForward size={20} />
                  </button>
                </div>

                {testimonials.length > 0 && (
                  <Slider ref={setSliderRef} {...settings}>
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial._id}
                        className="relative min-h-[300px] p-2 group"
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[200px] overflow-hidden">
                          <Image
                            src="/amin-ul-miulk-law-firm/shapes/testi-3-bg-icon.png"
                            alt="shape"
                            fill
                            sizes="(max-width: 767px) 100vw, 100vw"
                            className="object-contain"
                          />
                        </div>

                        <div className="min-h-[250px] border-[2px] border-secondary group-hover:shadow-custom-three-sides px-2 py-5 rounded-md transition-all duration-500 ease-in-out flex flex-col justify-between">
                          {testimonial?.message?.[currentLanguage] && (
                            <div
                              className="relative z-[99] body2 text-dark-color secondary-font-family font-normal rtl:text-right"
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHTMLServer(
                                  testimonial.message[currentLanguage]
                                ),
                              }}
                            />
                          )}

                          {testimonial?.name?.[currentLanguage] && (
                            <div className="relative z-[99] flex items-center ltr:justify-start rtl:justify-end gap-3">
                              <h3 className="subtitle-1 text-dark-color primary-font-family font-medium">
                                {testimonial.name[currentLanguage]}
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}

                {/* <div className="absolute z-[99] bottom-0 ltr:right-0 rtl:left-0 w-fit flex items-center justify-between gap-5">
                  <button
                    type="button"
                    onClick={() => sliderRef?.slickPrev()}
                    className="bg-dark-color hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center rtl:order-2"
                  >
                    <IoIosArrowBack size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => sliderRef?.slickNext()}
                    className="bg-dark-color hover:bg-secondary transition-all duration-500 ease-in-out size-[40px] rounded-full text-light-color flex items-center justify-center"
                  >
                    <IoIosArrowForward size={20} />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
