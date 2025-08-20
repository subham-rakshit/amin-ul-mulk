"use client";

import { newsSectionData } from "@/app/assets/data/pagesData/home-page-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  CarouselButtons,
  DarkButton,
  DrawOutlineLinkButton,
  PageNavigationButton,
} from "../..";

const NewsSection = () => {
  const [news, setNews] = useState(newsSectionData);

  // OnClick Next Slide Function
  const nextSlide = () => {
    setNews((prev) => {
      const updatedNews = [...prev];
      const firstItem = updatedNews.shift();
      updatedNews.push(firstItem);
      return updatedNews;
    });
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    setNews((prev) => {
      const updatedNews = [...prev];
      const lastItem = updatedNews.pop();
      updatedNews.unshift(lastItem);
      return updatedNews;
    });
  };

  return (
    <>
      <section
        id="home-page-news-section"
        className="w-full pt-[80px] md:pt-[100px]"
      >
        <div className="md:px-[72px] flex flex-col items-center md:items-start gap-[24px]">
          <PageNavigationButton btnText="News" />
          <h1 className="text-[28px] md:text-[56px] font-candara-rg font-bold text-black-500 leading-[34.18px] md:leading-[68.36px]">
            Latest News & Updates
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-[18px] md:gap-[20px] lg:gap-[50px] xl:gap-[69px] mt-[20px] md:mt-[35px]">
          <motion.div
            key={`${news[0]._id}-active-image`} // Ensures animation triggers on change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-[629px] h-[353px] md:h-[775px] relative rounded-[16px] md:rounded-[20px] overflow-hidden md:flex-1 group"
          >
            <Image
              src={news[0].newsImage}
              alt="News Image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover group-hover:scale-[1.1] transition-300"
            />
          </motion.div>

          <div className="flex flex-col md:justify-between gap-5 flex-1">
            <div className="hidden md:flex gap-5">
              <CarouselButtons
                previousSlideFnc={prevSlide}
                nextSlideFnc={nextSlide}
              />
            </div>

            <div>
              <motion.h3
                key={`${news[0]._id}-title`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-[24px] md:text-[30px] font-candara-rg font-bold text-black-500 leading-[29.3px] md:leading-[36.62px] mb-[8px] md:mb-[20px]"
              >
                {news[0].title}
              </motion.h3>

              <motion.p
                key={`${news[0]._id}-description`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-[14px] md:text-[20px] font-candara-rg text-[#161922] leading-[17.09px] md:leading-[24.41px] mb-[14px] md:mb-[35px]"
              >
                {news[0].description}
              </motion.p>

              <motion.div
                key={`${news[0]._id}-tags-cta`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex items-center justify-between gap-5"
              >
                {news[0].tags.length > 0 && (
                  <ul className="w-full md:max-w-[250px] flex flex-wrap gap-[8px]">
                    {news[0].tags.map((tag, index) => (
                      <li
                        key={index}
                        className="text-[12px] md:text-[14px] font-candara-rg text-black-500 leading-[14.65px] md:leading-[17.09px] py-[8px] px-[14px] border border-black-100 rounded-[12px]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <DrawOutlineLinkButton
                  redirectionLink={news[0].newsDetailsLink}
                  extraClasses="hidden md:flex"
                  btnClasses="p-[12px]"
                >
                  <span className="text-[16px] md:text-[20px] text-black-500 font-candara-rg flex items-center gap-2">
                    <span>Read more</span>
                    <ArrowRight className="size-[20px] md:size-[24px] text-black-300" />
                  </span>
                </DrawOutlineLinkButton>
              </motion.div>
            </div>

            <ul className="hidden md:flex gap-[15px]">
              {news.slice(1).map((eachNews) => (
                <li
                  key={eachNews._id}
                  className="w-full max-w-[228px] h-[177px] relative rounded-[20px] overflow-hidden"
                >
                  <Image
                    src={eachNews.newsImage}
                    alt="News Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>

          <DarkButton
            btnText="Reade more"
            containerClasses="md:hidden mt-[14px]"
            extraClasses="flex items-center justify-center gap-[8px]"
            icon={true}
          />
        </div>
      </section>
    </>
  );
};

export default NewsSection;
