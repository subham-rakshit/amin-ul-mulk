"use client";

import { scrollToPosition } from "@/utils/scrollUtils";
import Link from "next/link";

const BackgroundRevealButton = ({
  href = "#",
  label = "",
  className,
  borderColor = "border-secondary",
  hoverBorderColor = "group-hover:border-light-color",
  textColor = "text-light-color",
  textHoverColor = "hover:text-light-color",
  textSize = "body3",
  bgColor = "",
  hoverBgColor = "group-hover:bg-transparent",
  iconPosition = "",
  icon = null,
  roundedStyle = "rounded-full",
  buttonWidth = "min-w-[150px]",
}) => {
  if (!label) return null;

  const handleSectionScroll = (e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToPosition(href, 2500); // scroll to section smoothly over 2.5 seconds
    }

    // Else, allow Link to behave normally (for internal or external routes)
  };

  return (
    <Link
      href={href}
      scroll={false}
      onClick={handleSectionScroll}
      className="inline-block"
    >
      <div
        className={`group relative px-8 py-[10px] ${roundedStyle} ${textColor} ${textHoverColor} secondary-font-family font-semibold ${textSize} z-10 inline-block transition-all duration-500 ease-in-out ${className} bg-transparent overflow-hidden ${buttonWidth} flex-shrink-0 flex items-center justify-center`}
      >
        <span className="relative z-[9] flex items-center gap-2">
          {iconPosition === "LEFT" && icon && icon}
          {label}
          {iconPosition === "RIGHT" && icon && icon}
        </span>

        {/* Animated Border (using ::before) */}
        <span className={`absolute inset-0 block z-[8]`}>
          <span className="absolute left-0 top-0 h-full w-full scale-95 opacity-100 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <span
              className={`absolute inset-0 border-2 ${borderColor} ${bgColor} ${hoverBgColor} ${hoverBorderColor} transition-all duration-500 ease-in-out ${roundedStyle}`}
            />
          </span>
        </span>
      </div>
    </Link>
  );
};

export default BackgroundRevealButton;
