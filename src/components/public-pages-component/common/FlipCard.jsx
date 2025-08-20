"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FontResizerWrapper } from "..";

const FlipCard = ({
  imgSrc = "",
  altText = "",
  title = "",
  className = "",
  priority = false,
}) => {
  return (
    <motion.div
      className={`relative rounded-[24px] overflow-hidden shadow-card-custom ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ perspective: 1000 }}
    >
      {/* Front of the card (image) */}
      <motion.div
        className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden"
        variants={{
          rest: { rotateY: 0, opacity: 1 },
          hover: { rotateY: 180, opacity: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={imgSrc}
          alt={altText}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#00000040]" />
      </motion.div>

      {/* Back of the card (content) */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-[#00587E80] flex items-center justify-center p-5 rounded-[24px]"
        variants={{
          rest: { rotateY: 180, opacity: 0 },
          hover: { rotateY: 0, opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <motion.div
          className="w-full"
          variants={{
            rest: { y: "100%", opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <FontResizerWrapper
            as="h2"
            fontClasses={{
              0: "subtitle-0-2",
              1: "subtitle-2",
              2: "subtitle-2-1",
            }}
            className="text-dark-white font-family-secondary font-[500] text-center"
          >
            {title}
          </FontResizerWrapper>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
