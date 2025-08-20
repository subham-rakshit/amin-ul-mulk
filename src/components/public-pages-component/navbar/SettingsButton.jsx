"use client";

import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  decreaseLevel,
  increaseLevel,
} from "@/store/features/layoutCustomizer/fontResizingSlice";
import { useTheme } from "next-themes";
import { BiUserVoice } from "react-icons/bi";
import { MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { RxAccessibility } from "react-icons/rx";
import { VscColorMode } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const SettingsButton = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { fontLevel } = useSelector((state) => state.level);
  const dispatch = useDispatch();

  // Handle theme change
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="rounded-full border border-white p-[6px] bg-primary-400"
        >
          <RxAccessibility size={24} color="#fff" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-fit bg-[#fff] dark:bg-[#fff] flex flex-col gap-3 border border-[#00587E] p-2 z-[999]">
        <BiUserVoice
          size={fontLevel === 1 ? 20 : fontLevel === 2 ? 22 : 18}
          className={`text-[#000] hover:text-[#00587E] transition-300 cursor-pointer`}
        />

        <MdOutlineTextIncrease
          size={fontLevel === 1 ? 20 : fontLevel === 2 ? 22 : 18}
          className={`text-[#000] hover:text-[#00587E] transition-300 cursor-pointer`}
          onClick={() => fontLevel < 2 && dispatch(increaseLevel())}
        />

        <MdOutlineTextDecrease
          size={fontLevel === 1 ? 18 : fontLevel === 2 ? 20 : 16}
          className={`text-[#000] hover:text-[#00587E] transition-300 cursor-pointer`}
          onClick={() => fontLevel > 0 && dispatch(decreaseLevel())}
        />

        <VscColorMode
          size={fontLevel === 1 ? 20 : fontLevel === 2 ? 22 : 18}
          className={`text-[#000] rotate-[180deg] hover:text-[#00587E] transition-300 cursor-pointer`}
          onClick={handleThemeChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SettingsButton;
