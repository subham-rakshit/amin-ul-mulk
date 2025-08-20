import { fetchPublicHeaderData } from "@/actions/frontEndPageDataActions";
import {
  useFormattedMenuTree,
  useSortedMenuListByOrderNumber,
} from "@/lib/hooks";
import { HeaderItems } from "..";

const PublicPageNavbar = async ({
  currentLanguage = "en",
  settingsData = [],
  filesList = [],
  languageList = [],
}) => {
  const { menuList } = await fetchPublicHeaderData();

  // Convert menu list to menu tree
  const menuTree = menuList.length > 0 ? useFormattedMenuTree(menuList) : [];
  const sortedMenu =
    menuTree.length > 0 ? useSortedMenuListByOrderNumber(menuTree) : [];

  return (
    <HeaderItems
      menuTree={sortedMenu}
      languageList={languageList}
      currentLanguage={currentLanguage}
      settingsData={settingsData}
      filesList={filesList}
    />
  );
};

export default PublicPageNavbar;
