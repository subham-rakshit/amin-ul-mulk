"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselButtons = ({ previousSlideFnc, nextSlideFnc }) => {
  return (
    <>
      <button
        type="button"
        onClick={previousSlideFnc}
        className="size-[64px] rounded-full flex items-center justify-center bg-white hover:bg-black-500 transition-300 group border border-black-100"
      >
        <ChevronLeft
          size={32}
          className="text-black-300 group-hover:text-white transition-300"
        />
      </button>

      <button
        type="button"
        onClick={nextSlideFnc}
        className="size-[64px] rounded-full flex items-center justify-center bg-white hover:bg-black-500 transition-300 group border border-black-100"
      >
        <ChevronRight
          size={32}
          className="text-black-300 group-hover:text-white transition-300"
        />
      </button>
    </>
  );
};

export default CarouselButtons;
