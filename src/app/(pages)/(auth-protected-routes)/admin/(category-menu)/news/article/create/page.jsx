import { createNewNewsArticle } from "@/actions/apiClientActions/news/articles";
import { fetchCreateNewsArticlePageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  BlogPostForm,
  Breadcrumb,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data info
export const metadata = {
  title: titlesObject.createNewsArticle.title,
};

const CreateNewsArticlePage = async ({ searchParams }) => {
  // Fetch necessary data for creating a blog post
  const {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchCreateNewsArticlePageData(
    searchParams,
    PERMISSIONS.NEWS.ADD_NEWS_ARTICLE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Create News & Blog" mainParentTab="Blog Corner" />

      {/* Create Post Form Component */}
      <BlogPostForm
        userId={userId}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewNewsArticle}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default CreateNewsArticlePage;
