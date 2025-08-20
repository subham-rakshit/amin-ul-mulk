"use client";

import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BackgroundRevealButton } from "../..";

const HeroSection = ({
  contentData = {},
  filesList = [],
  currentLanguage = "en",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const translate = useTranslations();

  // Auto-change the active carousel item
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex + 1) % contentData?.banner_image_ids?.length ?? 0
      );
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to render the heading with last two words in different color
  const renderHeadingText = (text) => {
    const words = text.trim().split(" ");
    // console.log(words);
    const lastTwo = words.slice(-2).join(" ");
    // console.log(lastTwo);
    const rest = words.slice(0, -2).join(" ");
    // console.log(rest);
    return (
      <>
        {rest} <span className="text-secondary">{lastTwo}</span>
      </>
    );
  };

  // Get Iamge Full URL Utility Function
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  // Handle Empty Data
  if (
    !contentData?.banner_image_ids.length &&
    !contentData?.banner_headings.length
  )
    return null;

  return (
    <>
      <section
        id="home-page-hero-section"
        className="w-full flex justify-center items-center min-h-[80vh] md:min-h-[100vh] relative pt-[180px] px-2 md:px-5"
      >
        {/* <div className="absolute inset-0 z-[9] bg-[#00000099] size-full overflow-hidden" /> */}
        {/* Overlay */}
        <div className="absolute inset-0 z-[9] size-full overflow-hidden">
          <Image
            src="/amin-ul-miulk-law-firm/bg/hero1-overlay-dark-option-2.png"
            alt="hero overlay"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 100vw"
            className="object-cover scale-[1.3] brightness-0"
          />
        </div>

        {/* Multiple Background Images */}
        {contentData?.banner_image_ids?.length > 0 ? (
          <div className="absolute inset-0 w-full h-full">
            {contentData.banner_image_ids.map((bgImageId, index) =>
              getImageURL(bgImageId) ? (
                <motion.div
                  key={`hero-bg-image-${index + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={getImageURL(bgImageId)}
                    alt={
                      contentData?.banner_headings?.[index] ||
                      `Banner ${index + 1}`
                    }
                    fill
                    priority={activeIndex === index}
                    sizes="(max-width: 767px) 100vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 100px" }}
                  />
                </motion.div>
              ) : null
            )}
          </div>
        ) : null}

        <div className="max-screen-width mx-auto relative z-[99] w-full h-full">
          <div className="grid grid-cols-12 gap-5">
            {/* Hero Text Content */}
            <div className="col-span-12 flex flex-col justify-center items-center overflow-hidden">
              {/* Motion container Comes form bottom to its original position */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-text-content-${activeIndex + 1}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                >
                  {contentData?.banner_headings?.[activeIndex] && (
                    <h1 className="w-full max-w-[800px] heading-3 md:heading-1 md:text-[70px] primary-font-family text-light-color font-bold tracking-wide text-center whitespace-pre-line">
                      <span className="leading-[1.02]">
                        {renderHeadingText(
                          contentData.banner_headings[activeIndex]
                        )}
                      </span>
                    </h1>
                  )}

                  {contentData?.banner_btn_label &&
                  contentData?.banner_btn_link ? (
                    <div className="flex justify-center">
                      <BackgroundRevealButton
                        href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.CONTACT_US}`}
                        label={contentData.banner_btn_label}
                        className="px-4 py-[12px] mt-5"
                        hoverBgColor="group-hover:bg-secondary"
                      />
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
