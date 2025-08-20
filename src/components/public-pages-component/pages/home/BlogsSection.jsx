import {
  getAllPublicNewsArticles,
  getPublicPageCMSContent,
} from "@/actions/frontEndActions/action";
import { BlogSliderSection } from "../..";

const BlogsSection = async ({
  headingColor = "text-dark-color",
  sectionClasses = "",
  cardBgColor = "bg-light-color",
  textColor = "text-dark-color",
  sectionId = "",
  currentLanguage = "en",
}) => {
  const [blogResponse, contentResponse] = await Promise.all([
    getAllPublicNewsArticles(true),
    getPublicPageCMSContent("home", currentLanguage),
  ]);

  const heading =
    contentResponse?.contentDetails?.["home-section-10-news-heading"] || "";
  const subHeading =
    contentResponse?.contentDetails?.["home-section-10-news-sub-heading"] || "";
  const isActive =
    contentResponse?.contentDetails?.["home-section-10-news-show-status"] ===
      "1" || false;

  if (!isActive) return null;

  return (
    <section
      id={sectionId}
      className={`w-full relative overflow-hidden px-2 md:px-5 ${sectionClasses}`}
    >
      <div className="w-full max-screen-width mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 pb-5 md:pb-10">
          {subHeading && (
            <h3 className="subtitle-2 md:subtitle-1 text-light-color secondary-font-family font-bold">
              {subHeading}
            </h3>
          )}

          {heading && (
            <h2
              className={`heading-3 md:heading-2 ${headingColor} primary-font-family font-bold`}
            >
              {heading}
            </h2>
          )}
          <span className="w-[100px] border border-light-color mt-2 md:mt-5" />
        </div>

        {blogResponse?.fetchData && blogResponse?.fetchData.length > 0 && (
          <BlogSliderSection
            cardBgColor={cardBgColor}
            textColor={textColor}
            blogList={blogResponse?.fetchData || []}
            currentLanguage={currentLanguage}
          />
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
