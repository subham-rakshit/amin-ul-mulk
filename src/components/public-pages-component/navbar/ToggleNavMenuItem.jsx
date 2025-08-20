"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ToggleNavMenuItem = ({
  navItemDetails,
  pathname = "",
  currentLanguage = "en",
  isSmallDevice = false,
  navLinksParentColor = "text-dark-white",
  toggleLinksContainerClass = "absolute top-full left-0 bg-[#fff]",
  itemContainerClass = "h-full flex flex-col justify-center",
  isActiveShown = true,
}) => {
  const { children, link, name, _id } = navItemDetails;
  const [isToggle, setIsToggle] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const translate = useTranslations();

  if (!name?.[currentLanguage]) return null;

  return (
    <>
      <li
        key={_id}
        onMouseEnter={() => setIsToggle(true)}
        onMouseLeave={() => setIsToggle(false)}
        onClick={() => setIsToggle((prev) => !prev)}
        className={`${navLinksParentColor} secondary-font-family font-medium relative z-[999] cursor-pointer ${itemContainerClass}`}
      >
        <Link
          href={link}
          className={`flex items-center gap-1 ${
            pathname.startsWith(`/${currentLanguage}${link}`) && isActiveShown
              ? "border-b-2 border-primary"
              : ""
          }`}
        >
          <span className="inline-block body1">{name[currentLanguage]}</span>
          <IoIosArrowDown size={14} className={`${navLinksParentColor}`} />
        </Link>

        {/* Dropdown Animation */}
        <AnimatePresence>
          {isToggle && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "fit-content" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={toggleLinksContainerClass}
            >
              {/* Dropdown Content Goes Here */}
              {children && children.length > 0
                ? children.map((eachChild, index) =>
                    eachChild?.name?.[currentLanguage] ? (
                      <li
                        key={eachChild._id}
                        className={`body3 font-poppins-rg transition-300 lg:whitespace-nowrap ${
                          pathname.startsWith(
                            `/${currentLanguage}${eachChild.link}`
                          )
                            ? "bg-primary text-light-color"
                            : "text-primary hover:bg-primary hover:text-light-color"
                        }`}
                      >
                        <Link
                          href={eachChild.link}
                          className="inline-block w-full h-full px-4 py-2"
                        >
                          <span className="secondary-font-family font-medium">
                            {eachChild.name[currentLanguage]}
                          </span>
                        </Link>
                      </li>
                    ) : null
                  )
                : null}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    </>
  );
};

export default ToggleNavMenuItem;
