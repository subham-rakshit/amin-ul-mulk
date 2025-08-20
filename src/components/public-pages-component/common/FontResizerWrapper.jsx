"use client";

import { useSelector } from "react-redux";

const FontResizerWrapper = ({
  children,
  as = "div",
  className = "",
  fontClasses = {
    0: "text-sm",
    1: "text-base",
    2: "text-lg",
  },
  ...rest
}) => {
  const { fontLevel } = useSelector((state) => state.level);
  const fontSizeClass = fontClasses[fontLevel] || fontClasses[1];

  const Component = as; // e.g., "div", "span", "p", etc.

  return (
    <Component
      {...rest}
      className={`${fontSizeClass} transition-transform duration-300 ${className}`}
    >
      {children}
    </Component>
  );
};

export default FontResizerWrapper;
