"use client";

import Image from "next/image";
import { useState } from "react";
import { GoLaw } from "react-icons/go";
import { BackgroundRevealButton } from "../..";

const FlipServiceCard = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[350px] rounded-[12px]"
      style={{
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front Card */}
        <div
          className="absolute w-full h-full rounded-[12px] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={service.content.featuredImageSrc}
            alt={service.content.serviceName}
            fill
            sizes="(max-width: 767px) 100vw, 100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#00000050]" />

          <div className="absolute inset-0 flex flex-col justify-center items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
              <GoLaw size={20} />
            </div>
            <h3 className="subtitle-1 text-dark-white secondary-font-family font-bold text-center">
              {service.content.serviceName}
            </h3>
          </div>
        </div>

        {/* Back Card */}
        <div
          className="absolute z-[99] w-full h-full rounded-[12px] overflow-hidden bg-secondary-blue-500"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          <div className="absolute inset-0 z-[99] flex flex-col items-center justify-center gap-4 p-5">
            <p className="body2 text-dark-white secondary-font-family font-light text-center">
              {service.content.shortDescription}
            </p>

            <BackgroundRevealButton
              href={service.content.hrefLink}
              label="Read More"
              className="w-fit px-1 md:px-5 py-[10px] relative z-[999]"
              borderColor="border-[#fff]"
              textColor="text-[#fff]"
              textSize="body4 sm:body3"
              hoverBgColor="bg-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipServiceCard;
