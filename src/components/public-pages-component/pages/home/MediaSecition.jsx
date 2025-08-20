"use client";

import { mediaData } from "@/app/assets/data/pagesData/home-page-data";
import Image from "next/image";
import { useMemo, useState } from "react";
import Slider from "react-slick";
import { SectionInfo } from "../..";

const MediaSecition = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };
  }, []);

  return (
    <section id="home-page-media-section" className="w-full overflow-hidden">
      <div className="relative py-[80px]">
        <div className="absolute z-[9] top-[10px] w-full h-[140px] bg-[#F6FAFD] dark:bg-dark rounded-[150%] flex items-center justify-center">
          <SectionInfo heading="Media" />
        </div>

        <Slider ref={setSliderRef} {...settings}>
          {mediaData.map((item) => (
            <div key={item._id} className="px-2">
              <div className="h-[450px] w-full relative overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>

        <div className="absolute z-[9] bottom-[10px] w-full h-[140px] bg-[#F6FAFD] dark:bg-dark rounded-[150%]" />
      </div>
    </section>
  );
};

export default MediaSecition;
