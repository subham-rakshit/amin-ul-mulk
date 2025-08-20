"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = ({
  pathname,
  languageList = [],
  currentLanguage = "en",
  textColor = "text-dark-white",
}) => {
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLangChange = (value) => {
    // setLanguageAction(value);

    const parts = currentPathname.split("/");
    const hasLocale = routing.locales.includes(parts[1]);

    if (hasLocale) {
      parts[1] = value;
    } else {
      parts.splice(1, 0, value);
    }

    const newPath = parts.join("/") || "/";
    // window.history.replaceState(null, "", newPath);
    // router.push(newPath);
    router.replace(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Lang Logo */}
      <div className="size-[25px] rounded-full border border-grey relative overflow-hidden">
        <Image
          src={`/assets/flags/${currentLanguage || "en"}.svg`}
          alt={currentLanguage || "en"}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
      {/* Lang Select */}
      {languageList.length > 0 && (
        <Select
          key="language-selection"
          // defaultOpen={false}
          // open={false}
          // disabled={true}
          value={currentLanguage || "en"}
          onValueChange={(value) => handleLangChange(value)}
        >
          <SelectTrigger
            className={`size-fit p-0 body2 ${textColor} font-poppins-rg font-[500] border-none outline-none focus:ring-0 focus:outline-none gap-1 shadow-none`}
          >
            <SelectValue placeholder="Lanugage" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="body2 text-gray-400 secondary-font-family font-normal bg-white z-[999]"
          >
            {languageList.map(
              (eachLang) =>
                eachLang.status && (
                  <SelectItem key={eachLang._id} value={eachLang.code}>
                    {eachLang.name}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default LanguageSwitcher;
