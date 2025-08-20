import { useTranslations } from "next-intl";
import Link from "next/link";
import { ToggleNavMenuItem } from "..";

const HeaderLinks = ({
  pathname = "",
  menuTree = [],
  currentLanguage = "en",
}) => {
  const translate = useTranslations();

  return (
    <>
      {menuTree.length > 0 &&
        menuTree.map((eachMenu) =>
          eachMenu.children && eachMenu.children.length > 0 ? (
            <ToggleNavMenuItem
              key={eachMenu._id}
              navItemDetails={eachMenu}
              pathname={pathname}
              currentLanguage={currentLanguage}
              navLinksParentColor="text-primary"
            />
          ) : eachMenu?.name?.[currentLanguage] ? (
            <li
              key={eachMenu._id}
              className={`h-full flex items-center text-primary secondary-font-family font-medium`}
            >
              <Link
                href={
                  eachMenu?.link
                    ? eachMenu?.link !== "/"
                      ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${eachMenu.link}`
                      : `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`
                    : "#"
                }
                className={`${
                  pathname === `/${currentLanguage}` && eachMenu.link === "/"
                    ? "border-b-2 border-primary"
                    : pathname.startsWith(
                          `/${currentLanguage}${eachMenu.link}`
                        ) && eachMenu.link !== "/"
                      ? "border-b-2 border-primary"
                      : ""
                }`}
              >
                <span className="inline-block body1">
                  {eachMenu.name[currentLanguage]}
                </span>
              </Link>
            </li>
          ) : null
        )}
    </>
  );
};

export default HeaderLinks;
