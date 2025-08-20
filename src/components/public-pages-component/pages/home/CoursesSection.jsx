"use client";

import { coursesSectionImageData } from "@/app/assets/data/pagesData/home-page-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CarouselButtons, DarkButton, PageNavigationButton } from "../..";

const CoursesSection = () => {
  const [index, setIndex] = useState(0);
  const [coursesList, setCoursesList] = useState(coursesSectionImageData);
  const [itemsPerSlide, setItemsPerSlide] = useState(0);

  // Update Items Per Slide Function
  const updateItemsPerSlide = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setItemsPerSlide(3);
      setCoursesList(coursesSectionImageData);
    } else if (window.innerWidth >= 768) {
      setItemsPerSlide(2);
      setCoursesList(coursesSectionImageData);
    } else {
      setItemsPerSlide(1);
      setCoursesList(coursesSectionImageData.slice(0, 3));
    }
  }, []);

  // Use Effect Function to update items per slide on window resize
  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => {
      window.removeEventListener("resize", updateItemsPerSlide);
    };
  }, [updateItemsPerSlide]);

  // Totla Slides
  const totalSlides = useMemo(
    () => Math.ceil(coursesSectionImageData.length / itemsPerSlide),
    [itemsPerSlide]
  );

  // OnClick Next Slide Function
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <section
        id="home-page-courses-section"
        className="w-full pt-[80px] md:pt-[100px]"
      >
        <div className="flex flex-col items-center gap-3 md:gap-5">
          <PageNavigationButton btnText="Courses" />

          <h1 className="w-full max-w-[889px] text-[28px] md:text-[64px] leading-[34.18px] md:leading-[78.13px] font-candara-rg font-bold text-black-500 text-center">
            Comprehensive Driving Courses for Every Skill Level and Need
          </h1>
        </div>

        <div className="flex items-center justify-between gap-3 md:gap-5 md:px-[60px] mt-5 md:mt-[79px]">
          <p className="w-full max-w-[525px] text-[16px] md:text-[20px] text-black-500 font-candara-rg leading-[19.53px] md:leading-[24.41px]">
            Bin Yaber Driving Institute offers courses for beginners and
            professionals. Choose Light Motor Vehicle, Motorcycle, Bus,
            Forklift, or VIP Training to drive confidently and safely.
          </p>

          <div className="hidden md:flex gap-5">
            <CarouselButtons
              previousSlideFnc={prevSlide}
              nextSlideFnc={nextSlide}
            />
          </div>
        </div>

        <div className="overflow-hidden w-full mt-5 md:mt-[79px]">
          <motion.ul
            initial={{ x: "100%" }}
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col md:flex-row gap-[16px] lg:gap-[15px] xl:gap-[18px]"
          >
            {(coursesList || []).map((eachCourse, index) => (
              <li
                key={eachCourse._id}
                className="w-full md:w-[48%] lg:w-[32%] flex-shrink-0"
              >
                <div className="relative rounded-[20px] md:rounded-[24px] overflow-hidden w-full h-[295px] md:h-[392px]">
                  <Image
                    src={eachCourse.imageSrc}
                    alt={eachCourse.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover hover:scale-[1.05] transition-300"
                  />
                </div>

                <div className="mt-[8px] md:mt-[12px]">
                  <div className="flex items-center justify-between gap-5">
                    <h5 className="text-[24px] font-candara-rg leading-[29.3px] text-black-500 font-[700]">
                      {eachCourse.title}
                    </h5>
                    <Link
                      href={eachCourse.targetLink}
                      className="size-[40px] md:size-[48px] bg-white hover:bg-black-500 transition-300 border border-black-100 rounded-full flex justify-center items-center group"
                    >
                      <ArrowRight
                        size={24}
                        className="rotate-[-25.5deg] text-black-300 group-hover:text-white group-hover:rotate-0 transition-300"
                      />
                    </Link>
                  </div>

                  <div className="text-[14px] xl:text-[18px] leading-[17.09px] xl:leading-[21.97px] text-[#666D80] font-candara-rg mt-[4px]">
                    {eachCourse.description}
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>

        <DarkButton
          btnText="See more courses"
          containerClasses="w-full flex md:hidden mt-[32px]"
        />
      </section>
    </>
  );
};

export default CoursesSection;
