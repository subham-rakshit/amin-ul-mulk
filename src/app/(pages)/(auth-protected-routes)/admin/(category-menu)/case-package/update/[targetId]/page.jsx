import {
  getPerticularCasePackage,
  updatePerticularCasePackage,
} from "@/actions/apiClientActions/case-package";
import { fetchUpdateCasePackagePageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CasePackageForm,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params, searchParams }) => {
  const { targetId } = await params;
  const { slug } = await searchParams;

  // const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (
    !userId ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Service Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Service details not found.",
    };
  }

  // Fetch the post details using the postId and userId
  const { fetchData, message } = await getPerticularCasePackage(
    userId,
    slug,
    targetId
  );

  return {
    title: message
      ? `Update Case Package ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : fetchData?.meta_title ||
        `Case Package Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Case Package Details not found."
      : fetchData?.meta_description || "Case Package details form page.",
  };
};

const UpdateNewsArticlePage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the service
  const {
    filesResponse,
    languagesResponse,
    casePackageResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateCasePackagePageData(
    params,
    searchParams,
    PERMISSIONS.CASE_PACKAGE.EDIT_CASE_PACKAGE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Edit Package" mainParentTab="Package Hub" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Package does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when service data retrieval fails
  if (!casePackageResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Edit Package" mainParentTab="Package Hub" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={casePackageResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Edit Package" mainParentTab="Package Hub" />

      {/* Edit Service Form Component */}
      <CasePackageForm
        userId={userId}
        // Details
        languages={languagesResponse?.fetchData || []}
        itemDetails={casePackageResponse?.packageDetails || {}}
        translationDetails={casePackageResponse?.translationDetails || {}}
        // Files Details
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        // API fnc
        updateFnc={updatePerticularCasePackage}
        // Search Params
        searchValue={searchName}
        selectedFileType={selectedFileType}
        // RBAC
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default UpdateNewsArticlePage;
