"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Slider from "react-slick";

import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useMemo, useState } from "react";
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
      <div className="w-full max-screen-width mx-auto">
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
        <div className="relative w-full mt-[50px] overflow-hidden">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 z-[9] w-full flex items-center justify-between">
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
                  <li key={`member-${index + 1}`} className={`px-3`}>
                    <div className="relative w-full h-[400px] bg-primary border-b-[10px] border-gold rounded-[50px] overflow-hidden group">
                      {/* <div className="w-full h-full flex flex-col items-center justify-center gap-2 absolute top-[-100%] left-0 group-hover:top-0 z-[99] bg-[#D99E0C50] transition-all duration-500 ease-in-out overflow-hidden">
                <h4 className="body1 text-dark-white primary-font-family font-medium">
                  {translate(member.name)}
                </h4>
                <p className="body3 text-dark-white secondary-font-family font-normal">
                  {translate(member.designation)}
                </p>

                <div className="flex items-center gap-2">
                  <Link href={member.socials.facebook} target="_blank">
                    <FaFacebookF size={15} color="white" />
                  </Link>
                  <Link href={member.socials.twitter} target="_blank">
                    <FaTwitter size={15} color="white" />
                  </Link>
                  <Link href={member.socials.instagram} target="_blank">
                    <FaInstagram size={15} color="white" />
                  </Link>
                  <Link href={member.socials.linkedin} target="_blank">
                    <FaLinkedinIn size={15} color="white" />
                  </Link>
                </div>
              </div> */}

                      {imageId && (
                        <div className="relative w-full h-[80%] group-hover:h-[100%] overflow-hidden rounded-b-[50px] transition-all duration-500 ease-in-out">
                          {getImageURL(imageId) && (
                            <Image
                              src={getImageURL(imageId)}
                              alt={name || "Member"}
                              fill
                              priority
                              sizes="(max-width: 767px) 100vw, 100vw"
                              className="object-cover bg-cover bg-center"
                            />
                          )}
                        </div>
                      )}

                      {name || designation ? (
                        <div className="w-full h-[20%] flex flex-col justify-center items-center gap-1 px-3">
                          {name && (
                            <h4 className="body1 text-light-color primary-font-family font-medium">
                              {name}
                            </h4>
                          )}
                          {designation && (
                            <p className="body3 text-light-color secondary-font-family font-normal">
                              {designation}
                            </p>
                          )}
                        </div>
                      ) : null}
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
