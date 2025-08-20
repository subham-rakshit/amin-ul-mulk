"use client";

import { getImageFullUrl } from "@/utils/helper-functions";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {
  BackgroundRevealButton,
  GetAQuoteForm,
  HeaderLinks,
  LanguageSwitcher,
  ToggleNavMenuItem,
} from "..";

const HeaderItems = ({
  menuTree = [],
  languageList = [],
  currentLanguage = "en",
  settingsData = [],
  filesList = [],
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpaque, setIsOpaque] = useState(false);
  const [rightSheetOpen, setRightSheetOpen] = useState(false);

  const pathname = usePathname();
  const translate = useTranslations();

  // Extract specific settings from settingsData using a helper function
  const { show_language_switcher, enable_sticky_header, logo_white_image } =
    getFESettingsFieldValues(settingsData, [
      "show_language_switcher",
      "enable_sticky_header",
      "logo_white_image",
    ]);

  // Extract Website logo url
  const logoWhiteImage = getImageFullUrl(
    getFileSettingsValue(filesList, logo_white_image)?.fileUrl ?? null
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Glass effect when scrolling past 100px
      setIsOpaque(currentScrollY > 100);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  useEffect(() => {
    if (rightSheetOpen) {
      // Freeze scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [rightSheetOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[100px] transition-transform duration-500 z-[999] px-2 md:px-5 ${isOpaque ? "bg-[#ffffff70] backdrop-blur-lg" : "bg-light-color"} ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="w-full max-screen-width mx-auto flex h-full items-center justify-between gap-5">
        {/* Logo */}
        {logoWhiteImage ? (
          <Link
            href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`}
          >
            <div className="relative w-[220px] h-[80px] overflow-hidden">
              <Image
                src={logoWhiteImage}
                alt="Logo"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-contain"
              />
            </div>
          </Link>
        ) : null}

        {/* Header Links */}
        <ul className="h-full hidden lg:flex items-center md:gap-2 lg:gap-4">
          <HeaderLinks
            pathname={pathname}
            menuTree={menuTree}
            currentLanguage={currentLanguage}
          />
        </ul>

        {/* Nav Buttons */}
        <div className="hidden xl:flex items-center gap-1">
          {show_language_switcher ? (
            <LanguageSwitcher
              pathname={pathname}
              languageList={languageList}
              currentLanguage={currentLanguage}
              textColor="text-primary"
            />
          ) : null}

          <GetAQuoteForm />

          <BackgroundRevealButton
            // href="/login"
            label={translate("Sign In")}
            className="px-3 py-[10px]"
            bgColor="bg-secondary"
            hoverBgColor="group-hover:bg-primary"
            hoverBorderColor="group-hover:border-secondary"
          />
        </div>

        {/* Right Sheet Open Button in MD to LG screen */}
        <button
          type="button"
          onClick={() => setRightSheetOpen((prev) => !prev)}
          className="xl:hidden size-[40px] border border-secondary rounded-sm flex flex-col items-center justify-center gap-1 bg-primary hover:bg-secondary transition-all duration-500 ease-in-out group"
        >
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className="w-[20px] h-[2px] bg-light-color inline-block rounded-[3px]"
              ></span>
            ))}
        </button>

        {/* Right Sheet Backdrop */}
        {rightSheetOpen && (
          <div
            onClick={() => setRightSheetOpen(false)}
            className="fixed inset-0 z-[9999] min-w-screen min-h-screen bg-[#00000080] backdrop-blur-sm transition-all"
          />
        )}

        {/* Right Side Sheet */}
        <div
          className={`fixed top-0 right-0 z-[9999] w-full max-w-[80vw] md:max-w-[50vw] min-h-screen bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            rightSheetOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-[100vh] p-5">
            {/* Logo */}
            <Link href="/">
              <div className="relative w-[220px] h-[80px] overflow-hidden">
                <Image
                  src="/amin-ul-miulk-law-firm/website-logo/header-logo.svg"
                  alt="logo"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Sheet Close Button */}
            <button
              onClick={() => setRightSheetOpen(false)}
              className={`absolute top-[20px] left-[-20px] ${rightSheetOpen ? "opacity-100" : "opacity-0"} size-[40px] bg-secondary text-light-color rounded-full flex justify-center items-center transition-all duration-500 ease-in-out`}
            >
              <MdClose size={20} color="#fff" />
            </button>

            {/* Right Side Nav Links */}
            <ul className="mt-5 max-h-[calc(100vh-300px)] overflow-y-auto flex flex-col gap-5">
              {menuTree.length > 0 &&
                menuTree.map((eachMenu) =>
                  eachMenu.children && eachMenu.children.length > 0 ? (
                    <ToggleNavMenuItem
                      key={eachMenu._id}
                      navItemDetails={eachMenu}
                      pathname={pathname}
                      currentLanguage={currentLanguage}
                      navLinksParentColor="text-dark-color"
                      toggleLinksContainerClass="bg-transparent"
                      itemContainerClass="flex flex-col justify-center"
                      isActiveShown={false}
                    />
                  ) : eachMenu?.name?.[currentLanguage] ? (
                    <li
                      key={eachMenu._id}
                      className={`flex items-center text-dark-color secondary-font-family font-medium`}
                    >
                      <Link
                        href={
                          eachMenu?.link
                            ? eachMenu?.link !== "/"
                              ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${eachMenu.link}`
                              : `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`
                            : "#"
                        }
                        className=""
                      >
                        <span className="inline-block body1">
                          {eachMenu.name[currentLanguage]}
                        </span>
                      </Link>
                    </li>
                  ) : null
                )}

              <LanguageSwitcher
                pathname={pathname}
                languageList={languageList}
                currentLanguage={currentLanguage}
                textColor="text-dark-color"
              />
            </ul>

            {/* Right Side Content Buttons */}
            <div className="w-full flex flex-col items-start gap-2 mt-5">
              <BackgroundRevealButton
                // href="/login"
                label={translate("Sign In")}
                textColor="text-light-color"
                hoverBgColor="bg-secondary"
                buttonWidth="w-[250px]"
              />

              <GetAQuoteForm
                textColor="text-light-color"
                hoverBgColor="bg-secondary"
                buttonWidth="min-w-[250px]"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderItems;
