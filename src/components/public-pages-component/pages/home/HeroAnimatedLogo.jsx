"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo } from "react";

const HeroAnimatedLogo = ({
  positionClass = "absolute top-1/2 -translate-y-1/2 -left-[95px] z-[99] bg-[#00008B90]",
  textColor = "text-light-color",
  isRotate = false,
  logoImageUrl = "/amin-ul-miulk-law-firm/website-logo/rounded-logo.svg",
  logoText = "Amin\u00A0Ul\u00A0Mulk\u00A0•\u00A0Law\u00A0Firm\u00A0•\u00A0",
}) => {
  if (!logoImageUrl && !logoText) return null;

  const controls = useAnimation();
  const letters = useMemo(() => {
    // const TEXT =
    //   "Amin\u00A0Ul\u00A0Mulk\u00A0•\u00A0Law\u00A0Firm\u00A0•\u00A0";

    const TEXT = logoText + " ";
    const LETTERS = TEXT.split("");

    return LETTERS;
  }, []);

  useEffect(() => {
    let mounted = true;
    let rotateClockwise = true;

    const rotate = async () => {
      while (mounted) {
        await controls.start({
          rotate: rotateClockwise ? 360 : 0,
          transition: { duration: 8, ease: "easeInOut" },
        });
        rotateClockwise = !rotateClockwise;
      }
    };

    if (isRotate) {
      rotate();
    }

    return () => {
      mounted = false;
    };
  }, [controls]);

  const radius = 50; // Circle radius
  const center = 65; // Center position in px (half of container)
  const angleStep = 360 / letters.length;

  return (
    <div
      className={`${positionClass} w-[130px] h-[130px] rounded-full flex items-center justify-center backdrop-blur-lg overflow-hidden border border-[#99A4A3]`}
      animate={controls}
    >
      <div className="rounded-full border border-[#99A4A3] p-1.5">
        <div className="relative w-[55px] h-[55px] overflow-hidden rounded-full">
          <Image
            src={logoImageUrl}
            alt="Amin Ul Mulk Law Firm"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Rotating letter circle */}
      <motion.div animate={controls} className="absolute w-full h-full p-5">
        {letters.map((char, index) => {
          const angle = angleStep * index - 170; // start from top
          const rad = (angle * Math.PI) / 180;
          const x = center + radius * Math.cos(rad) - 11;
          const y = center + radius * Math.sin(rad) - 11;

          return (
            <span
              key={index}
              className={`body3 ${textColor} primary-font-family rounded-[50%]`}
              style={{
                position: "absolute",
                left: `${Math.round(x * 1000) / 1000}px`,
                top: `${Math.round(y * 1000) / 1000}px`,
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                transform: `rotate(${Math.round((angle + 90) * 1000) / 1000}deg)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HeroAnimatedLogo;
