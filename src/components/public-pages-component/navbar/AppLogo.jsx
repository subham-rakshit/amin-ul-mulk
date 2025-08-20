import ROUTES from "@/constants/routes";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import Image from "next/image";
import Link from "next/link";

const AppLogo = ({ pathname, filesList, settingsData }) => {
  const settingFieldValues = getFESettingsFieldValues(settingsData, [
    "logo_white_image",
    "logo_dark_image",
  ]);

  const logoWhiteImage =
    getFileSettingsValue(filesList, settingFieldValues.logo_white_image)
      ?.fileUrl || "/bin-yaber-assets/website-logo-light.png";
  const logoDarkImage =
    getFileSettingsValue(filesList, settingFieldValues.logo_dark_image)
      ?.fileUrl || "/bin-yaber-assets/website-logo-dark.png";

  return (
    <Link href={ROUTES.HOME}>
      <div className="w-[113px] h-[34px] lg:w-[166px] lg:h-[50px] relative">
        <Image
          src={pathname === "/" ? logoDarkImage : logoWhiteImage}
          alt="website logo"
          fill
          sizes="(max-width: 768px) 113px, 166px"
          priority
          className="object-cover hidden lg:block"
        />
        <Image
          src={logoWhiteImage}
          alt="website logo"
          fill
          sizes="(max-width: 768px) 113px, 166px"
          priority
          className="object-cover lg:hidden"
        />
      </div>
    </Link>
  );
};

export default AppLogo;
