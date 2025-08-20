"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const RevealOnView = forwardRef(
  (
    {
      as: Component = "div",
      className,
      children,
      delay = 0.1,
      duration = 1,
      yOffset = 20,
      xOffset = 0,
      rotate = 0,
      scale = 1,
      once = false,
      amount = 0.5,
      easing = [0.34, 1.56, 0.64, 1],
      viewport = {},
      ...props
    },
    ref
  ) => {
    const MotionComponent = motion(Component);

    return (
      <MotionComponent
        ref={ref}
        initial={{ opacity: 0, y: yOffset, x: xOffset, rotate, scale }}
        whileInView={{
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
        }}
        viewport={{
          once,
          amount,
          margin: "20%",
          ...viewport,
        }}
        transition={{
          duration,
          delay,
          ease: easing,
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

RevealOnView.displayName = "RevealOnView";

export default RevealOnView;
