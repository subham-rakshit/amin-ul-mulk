"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AnimatedShape = ({
  src,
  alt = "Animated Image",
  width = 200,
  height = 200,
  animationRange = 20,
  duration = 2,
  containerClass = "",
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -animationRange, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`${containerClass}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: "auto",
          height: "auto",
        }}
      />
    </motion.div>
  );
};

export default AnimatedShape;
