import { useTheme } from "next-themes";
import Image from "next/image";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { TransitionLink } from "@/components";
import ROUTES from "@/constants/routes";

const NavLogo = ({ topbarColorType }) => {
  const { theme } = useTheme();

  return (
    <TransitionLink href={ROUTES.ADMIN_DASHBOARD_ECOMMERCE}>
      <div className="w-[200px] h-[60px] relative overflow-hidden">
        <Image
          src={
            theme === "light" && topbarColorType === topbarColor.LIGHT_COLOR
              ? "/amin-ul-miulk-law-firm/website-logo/header-logo.svg"
              : "/amin-ul-miulk-law-firm/website-logo/footer-logo.svg"
          }
          alt="logo"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-contain mr-2 hidden md:inline"
        />
      </div>
    </TransitionLink>
  );
};

export default NavLogo;
