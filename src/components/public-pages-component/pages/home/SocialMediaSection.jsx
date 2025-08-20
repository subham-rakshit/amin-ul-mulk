"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import { FontResizerWrapper, RevealOnView } from "../..";

const SocialMediaSection = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      // speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      // autoplay: true,
      // autoplaySpeed: 2000,
      // pauseOnHover: true,
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //     },
      //   },
      //   {
      //     breakpoint: 767,
      //     settings: {
      //       slidesToShow: 2,
      //     },
      //   },
      // ],
    };
  }, []);

  return (
    <section
      id="home-page-social-media-section"
      className="w-full py-[100px] bg-[linear-gradient(to_bottom,_#E7F8FF,_#FFFFFF)] dark:bg-[linear-gradient(to_bottom,_#E7F8FF,_#FFFFFF)] relative"
    >
      <div className="max-screen-width px-5 overflow-hidden">
        <div className="flex items-center justify-between gap-5 mb-[24px]">
          <FontResizerWrapper
            as="h1"
            fontClasses={{
              0: "heading-0-2",
              1: "heading-2",
              2: "heading-2-1",
            }}
            className="text-gray-400 font-family-primary font-[600]"
          >
            Social Media
          </FontResizerWrapper>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => sliderRef?.slickPrev()}
              className="bg-primary-400 size-[40px] rounded-full text-white flex items-center justify-center"
            >
              <IoIosArrowBack size={20} />
            </button>

            <button
              type="button"
              onClick={() => sliderRef?.slickNext()}
              className="bg-primary-400 size-[40px] rounded-full text-white flex items-center justify-center"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>

        {/* Social Media Slider */}
        <Slider ref={setSliderRef} {...settings}>
          {Array(4)
            .fill(0)
            .map((_, index) => {
              const delay = index === 0 ? 0 : 0.2 + (index - 1) * 0.2;

              return (
                <RevealOnView
                  key={index}
                  as="div"
                  yOffset={50}
                  delay={delay}
                  className="pr-5"
                >
                  <div className="h-[655px] bg-white rounded-[12px] border border-[#00587E80] shadow-card-custom-small overflow-hidden p-[24px]">
                    <div className="relative size-full">
                      <div className="relative w-full h-[418px] overflow-hidden rounded-[12px] shadow-[0px_4px_4px_0px_#00587E80]">
                        <Image
                          src="/fujairah-freezone/pages/home/social-img-1.png"
                          alt="Social Media"
                          fill
                          sizes="(max-width: 768px) 100vw, 100vw"
                          className="object-cover shadow-[0px_4px_4px_0px_#00587E80]"
                        />
                      </div>

                      <div className="absolute bottom-0">
                        <div className="flex items-end gap-6 pl-3">
                          <div className="size-[80px] px-[23px] py-[18px] rounded-[18px] border-4 border-[#ffffff] bg-[#E9E9E9] flex items-center justify-center">
                            <div className="relative overflow-hidden size-[40px]">
                              <Image
                                src="/fujairah-freezone/website-logo/website-logo-light.png"
                                alt="logo"
                                fill
                                sizes="(max-width: 768px) 100vw, 100vw"
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div className="">
                            <FontResizerWrapper
                              as="h3"
                              fontClasses={{
                                0: "body-0-1",
                                1: "body1",
                                2: "body-1-1",
                              }}
                              className="text-[#000] font-family-secondary font-[600]"
                            >
                              Dorem ipsum dolor sit
                            </FontResizerWrapper>

                            <FontResizerWrapper
                              as="span"
                              fontClasses={{
                                0: "body-0-4",
                                1: "body4",
                                2: "body-4-1",
                              }}
                              className="text-[#9CA0AC] font-family-secondary font-[600] mt-[5px]"
                            >
                              on 15 Oct 2019
                            </FontResizerWrapper>
                          </div>
                        </div>

                        <FontResizerWrapper
                          as="p"
                          fontClasses={{
                            0: "body-0-2",
                            1: "body2",
                            2: "body-2-1",
                          }}
                          className="text-gray-400 font-family-secondary font-[400] mt-5"
                        >
                          Norem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc vulputate libero et velit interdum, ac
                          aliquet odio mattis.
                        </FontResizerWrapper>

                        <FaTwitter size={18} color="#1DA1F2" className="mt-5" />
                      </div>
                    </div>
                  </div>
                </RevealOnView>
              );
            })}
        </Slider>
      </div>
    </section>
  );
};

export default SocialMediaSection;
