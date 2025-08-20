import {
  NewsArticleListingSection,
  NewsCategoryListingSection,
  PaginationSection,
} from "../..";

const NewsListingSection = ({
  currentLanguage,
  newsArticleResponse,
  newsCategoriesResponse,
  search,
  selectedCategoryId,
  selectedPage,
}) => {
  const totalItemsCount =
    newsArticleResponse?.paginationData?.totalItemsCount || 0;
  const currentLimit = newsArticleResponse?.currentLimit || 0;

  return (
    <div className="w-full pt-[24px] md:pt-[80px] pb-[80px] md:pb-[100px] px-[8px] md:px-[106px]">
      <div className="flex justify-between xl:gap-[80px]">
        <NewsCategoryListingSection
          currentLanguage={currentLanguage}
          newsCategoriesResponse={newsCategoriesResponse}
          selectedCategoryId={selectedCategoryId}
        />

        <NewsArticleListingSection
          currentLanguage={currentLanguage}
          newsArticleResponse={newsArticleResponse}
          search={search}
        />
      </div>

      {totalItemsCount > currentLimit && (
        <div className="w-full flex justify-center items-center gap-[12px] mt-[52px]">
          <PaginationSection
            paginationDetails={newsArticleResponse.paginationData}
            selectedPage={selectedPage}
          />
        </div>
      )}
    </div>
  );
};

export default NewsListingSection;
