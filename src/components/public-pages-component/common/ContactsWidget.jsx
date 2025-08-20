"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { scrollToPosition } from "@/utils/scrollUtils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RiArrowUpLine } from "react-icons/ri";
import { EnQuiryForm } from "..";

const ContactsWidget = ({ settingsData, currentLanguage = "en" }) => {
  const [isScrollTop, setIsScrollTop] = useState(false);
  const handleScrolled = useRef(false);

  // const settingsFields = getFESettingsFieldValues(
  //   settingsData,
  //   ["contact_number"],
  //   currentLanguage
  // );
  const contactNumber = `+15273948612`;

  // Track Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !handleScrolled.current) {
        setIsScrollTop(true);
        handleScrolled.current = true;
      } else if (window.scrollY <= 200 && handleScrolled.current) {
        setIsScrollTop(false);
        handleScrolled.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle Scroll to Top
  const handleScrollToTop = () => {
    scrollToPosition(0, 500); // scroll to top over 2 seconds
  };

  return (
    <>
      <div className="fixed top-[35vh] left-0 z-[999] w-fit h-fit">
        <Link
          href={contactNumber ? `https://wa.me/${contactNumber}` : "#"}
          target={contactNumber ? "_blank" : "_self"}
        >
          <DotLottieReact
            src="https://lottie.host/ca11685a-ecee-49ff-bca3-230978e63a61/erJ0SJXUid.lottie"
            loop
            autoplay
            style={{ width: "60px", height: "60px" }}
          />
        </Link>
      </div>

      <div className="fixed bottom-[35vh] left-0 z-[999] w-fit h-fit">
        <Link href={contactNumber ? `tel:${contactNumber}` : "#"}>
          <DotLottieReact
            src="https://lottie.host/e2ded3d9-f50f-4210-a3d8-ad4f56d08015/LlpXuV7FQA.lottie"
            loop
            autoplay
            style={{ width: "60px", height: "60px" }}
          />
        </Link>
      </div>

      <EnQuiryForm />

      <div
        className={`fixed bottom-[20px] right-[20px] z-[999] ${isScrollTop ? "-translate-y-[5%]" : "-translate-y-[-100%]"} transition-all duration-500 ease-in-out size-fit`}
      >
        <button
          type="button"
          onClick={handleScrollToTop}
          className={`${isScrollTop ? `size-[50px] rounded-sm bg-secondary ${globalStyleObj.flexCenter}` : "hidden"}`}
        >
          <RiArrowUpLine size={25} color="#fff" />
        </button>
      </div>
    </>
  );
};

export default ContactsWidget;
