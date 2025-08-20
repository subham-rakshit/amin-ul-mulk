"use client";

import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { formatISODateString } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowRight, FaLink } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import Slider from "react-slick";

const BlogSliderSection = ({
  cardBgColor = "",
  textColor = "",
  blogList = [],
  currentLanguage = "en",
}) => {
  if (blogList.length === 0) return null;

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

  const getImageData = (shortUrl) => {
    return getImageFullUrl();
  };

  return (
    <div className="relative overflow-hidden">
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

      {/* Slider */}
      <Slider ref={setSliderRef} {...settings}>
        {blogList.map((blog) => {
          return (
            <div key={blog._id} className="px-2 ">
              <div
                className={`border-[4px] border-b-[10px] border-[#ffffff1f] hover:border-secondary ${cardBgColor} px-4 py-3 md:py-5 rounded-[24px] group transition-all duration-500 ease-in-out h-[400px] md:h-[500px]`}
              >
                <div className="relative w-full h-[75%] overflow-hidden rounded-[24px] shadow-card-custom-small inline-block group">
                  {blog?.featured_image?.fileUrl && (
                    <Image
                      src={getImageFullUrl(blog.featured_image.fileUrl)}
                      alt={
                        blog?.title?.[currentLanguage] || "Default Blog Image"
                      }
                      fill
                      sizes="(max-width: 767px) 100vw, 100vw"
                      className="object-cover scale-[1.01] group-hover:scale-[1.05] transition-all duration-500 ease-in-out"
                    />
                  )}

                  {blog?.slug && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.NEWS}/${blog.slug}`}
                      className="absolute z-[9] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-0 group-hover:size-full bg-[#00000070] transition-all duration-500 ease-in-out flex items-center justify-center overflow-hidden rounded-[12px]"
                    >
                      <FaLink size={25} className="text-light-color" />
                    </Link>
                  )}
                </div>

                <div className="w-full h-[25%] mt-2 flex flex-col justify-center gap-2">
                  {blog?.updatedAt && (
                    <div className="flex items-center rtl:justify-end gap-3">
                      <SlCalender
                        size={15}
                        className="text-secondary rtl:order-2"
                      />
                      <span
                        className={`${textColor} body3 secondary-font-family font-light rtl:order-1`}
                      >
                        {formatISODateString(blog.updatedAt)}
                      </span>
                    </div>
                  )}

                  <div className="flex  justify-between gap-4">
                    {blog?.title?.[currentLanguage] && (
                      <Link
                        href={
                          blog?.slug
                            ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.NEWS}/${blog.slug}`
                            : "#"
                        }
                        className={`body1 md:subtitle-2 ${textColor} hover:text-secondary primary-font-family font-semibold transition-all duration-500 ease-in-out rtl:text-end rtl:order-2`}
                      >
                        {blog.title[currentLanguage]}
                      </Link>
                    )}

                    {blog?.slug && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.NEWS}/${blog.slug}`}
                        className={`border border-secondary size-[30px] flex-shrink-0 flex items-center justify-center rounded-full hover:bg-secondary ${textColor} hover:text-light-color transition-all duration-500 ease-in-out group`}
                      >
                        <FaArrowRight
                          size={20}
                          className="rtl:rotate-[180deg]"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BlogSliderSection;
