"use client";

import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import { HeroAnimatedLogo } from "../..";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";

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
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      arrows: false,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Testimonial Left Image */}
            {testimonialImage || testimonialLogoImage || testimonialLogoText ? (
              <div className="relative w-full max-w-[500px] lg:max-w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden md:overflow-visible">
                {getImageURL(testimonialImage) && (
                  <div className="relative w-full h-full overflow-hidden rounded-[24px]">
                    <Image
                      src={getImageURL(testimonialImage)}
                      alt="testimonial"
                      fill
                      sizes="(max-width: 767px) 100vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="hidden md:flex absolute w-[85px] h-[250px] ltr:right-[-4px] rtl:left-[-4px] top-1/2 -translate-y-[46%]">
                  <Image
                    src="/amin-ul-miulk-law-firm/shapes/white_shape_no_bg.png"
                    alt="shape"
                    fill
                    sizes="(max-width: 767px) 100vw, 100vw"
                    className="object-cover rtl:scale-x-[-1]"
                  />
                </div>

                <HeroAnimatedLogo
                  positionClass="hidden md:flex absolute top-1/2 -translate-y-1/2 ltr:right-[-65px] rtl:left-[-65px] z-[99]"
                  textColor="text-dark-color"
                  logoImageUrl={getImageURL(testimonialLogoImage)}
                  logoText={testimonialLogoText}
                />
              </div>
            ) : null}

            {/* Testimonial Right Carousel */}
            <div className="w-full lg:px-10 flex flex-col justify-center md:gap-5">
              {/* Section Header */}
              {subHeading || heading ? (
                <div className="flex flex-col gap-3 mb-5 md:mb-10">
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
                <Slider ref={setSliderRef} {...settings}>
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="relative min-h-[200px]"
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
                        <div className="relative z-[99] flex items-center ltr:justify-start rtl:justify-end gap-3 mt-10">
                          <h3 className="subtitle-1 text-dark-color primary-font-family font-medium">
                            {testimonial.name[currentLanguage]}
                          </h3>
                        </div>
                      )}
                    </div>
                  ))}
                </Slider>
                <div className="absolute z-[99] bottom-0 ltr:right-0 rtl:left-0 w-fit flex items-center justify-between gap-5">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
