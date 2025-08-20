import {
  getPerticularTestimonial,
  updatePerticularTestimonial,
} from "@/actions/apiClientActions/testimonila";
import { fetchUpdateTestimonialPageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  TestimonialForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params }) => {
  const { targetId } = await params;

  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (
    !userId ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update Testimonial ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Testimonial details not found.",
    };
  }

  // Fetch the post details using the postId and userId
  const { translationDetails, message } = await getPerticularTestimonial(
    userId,
    targetId
  );

  return {
    title: message
      ? `Update Testimonial ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${translationDetails?.en?.name || "Anonymous"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Testimonial details not found."
      : `${translationDetails?.en?.name || "Anonymous"} testimonial details form page.`,
  };
};

const UpdateTestimonialPage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating testimonial
  const { languagesResponse, testimonialDetailsResponse, userId, error } =
    await fetchUpdateTestimonialPageData(
      params,
      searchParams,
      PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL
    );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Edit Feedback" mainParentTab="Testimonial" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Testimonial does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when testimonial retrieval fails
  if (!testimonialDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Edit Feedback" mainParentTab="Testimonial" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={testimonialDetailsResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Edit Feedback" mainParentTab="Testimonial" />

      {/* Edit Testimonial Form Component */}
      <TestimonialForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        testimonialDetails={testimonialDetailsResponse?.testimonialData || {}}
        translationDetails={
          testimonialDetailsResponse?.translationDetails || {}
        }
        updateFnc={updatePerticularTestimonial}
      />
    </div>
  );
};

export default UpdateTestimonialPage;
