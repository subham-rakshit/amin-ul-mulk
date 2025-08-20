import {
  getAllPublicNewsArticles,
  getPublicNewsArticleDetails,
} from "@/actions/frontEndActions/action";
import {
  CommonBannerSection,
  NewsDetailsSection,
} from "@/components/public-pages-component";
import { getImageFullUrl } from "@/utils/helper-functions";
import { isValidSlug } from "@/utils/helpers";
import { notFound } from "next/navigation";

// TODO Generate Meta Data Need to be ADD here SEO

const BlogDetailsPage = async ({ params }) => {
  const { locale, slug } = await params;
  if (!slug) return notFound();
  const validSlug = isValidSlug(slug);
  if (!validSlug) return notFound();

  const currentLanguage = locale || "en";

  // Fetch nessesary data
  const [blogDetailsResponse, blogsResponse] = await Promise.all([
    getPublicNewsArticleDetails(slug, currentLanguage),
    getAllPublicNewsArticles(),
  ]);

  // Get the blog details
  const blogDetails = blogDetailsResponse?.newsArticleData || {};
  if (Object.keys(blogDetails).length === 0) return null;

  const nonActiveBlogs =
    blogsResponse?.fetchData?.filter((blog) => blog?.slug !== slug) || [];

  return (
    <>
      <CommonBannerSection
        sectionId={`blog-details-banner-section-${blogDetails?._id || "none"}`}
        bannerSrc={getImageFullUrl(blogDetails?.banner_image?.fileUrl ?? null)}
        bannerTitle={blogDetails?.title || ""}
        breadcrumbsFields={[
          {
            label: "Home",
            link: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}`,
          },
        ]}
        breadcrumbsCurrentTabName={blogDetails?.title || ""}
      />

      <NewsDetailsSection
        sectionId={`blog-details-content-section-${blogDetails?.slug || "none"}`}
        content={blogDetails}
        otherBlogs={nonActiveBlogs}
        slug={slug}
        currentLanguage={currentLanguage}
      />
    </>
  );
};

export default BlogDetailsPage;
