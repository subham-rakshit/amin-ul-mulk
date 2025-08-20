"use client";

import { globalStyleObj } from "@/app/assets/styles";
import Image from "next/image";

const Tab = ({ langDetails, activeTab, setActiveTab, colorGrade }) => {
  return (
    <li
      className={`cursor-pointer px-3 py-1.5 md:px-5 md:py-3 flex-1 rounded-md transition-300 ${activeTab === langDetails.code ? `${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} dark:text-light-weight-800 hover:text-white` : "text-dark-weight-400 dark:text-light-weight-800"}`}
      onClick={() => setActiveTab(langDetails.code)}
    >
      <div className="flex items-center justify-center gap-1 text-[13px] md:text-[15px] font-poppins-md tracking-wide uppercase">
        <div className="w-[12px] h-[12px] relative overflow-hidden rounded-[2px]">
          <Image
            src={`/assets/flags/${langDetails.code}.svg`}
            alt={langDetails.name}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
        {langDetails.name}
      </div>
    </li>
  );
};

const SlideTabs = ({ languages, activeTab, setActiveTab, colorGrade }) => {
  return (
    <ul
      className={`flex border-b border-[#000]/20 dark:border-[#fff]/10 p-1 ${globalStyleObj.backgroundLight900Dark300}`}
    >
      {languages.map(
        (lang) =>
          lang.status && (
            <Tab
              key={lang._id}
              langDetails={lang}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              colorGrade={colorGrade}
            />
          )
      )}
    </ul>
  );
};

const LanguageTabs = ({ languages, activeTab, setActiveTab, colorGrade }) => {
  return (
    <SlideTabs
      languages={languages}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      colorGrade={colorGrade}
    />
  );
};

export default LanguageTabs;
