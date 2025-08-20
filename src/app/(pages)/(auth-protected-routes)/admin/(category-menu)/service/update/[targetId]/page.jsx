import {
  getPerticularService,
  updatePerticularService,
} from "@/actions/apiClientActions/services";
import { fetchUpdateServicePageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  ServiceForm,
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
  const { fetchData, message } = await getPerticularService(
    userId,
    slug,
    targetId
  );

  return {
    title: message
      ? `Update News Article ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : fetchData?.meta_title ||
        `Service Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Service Details details not found."
      : fetchData?.meta_description || "Service details form page.",
  };
};

const UpdateNewsArticlePage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the service
  const {
    filesResponse,
    languagesResponse,
    serviceResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateServicePageData(
    params,
    searchParams,
    PERMISSIONS.SERVICE.EDIT_SERVICE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Edit Service"
          mainParentTab="Serrvice Management"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Service does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when service data retrieval fails
  if (!serviceResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Edit Service"
          mainParentTab="Serrvice Management"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={serviceResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Edit Service"
        mainParentTab="Serrvice Management"
      />

      {/* Edit Service Form Component */}
      <ServiceForm
        userId={userId}
        // Service Details
        languages={languagesResponse?.fetchData || []}
        itemDetails={serviceResponse?.fetchData || {}}
        translationDetails={serviceResponse?.translationDetails || {}}
        // Files Details
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        // API fnc
        updateFnc={updatePerticularService}
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
