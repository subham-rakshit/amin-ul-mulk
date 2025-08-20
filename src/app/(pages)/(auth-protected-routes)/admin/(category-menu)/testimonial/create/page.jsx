import { createNewTestimonial } from "@/actions/apiClientActions/testimonila";
import { fetchCreateTestimonialPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  Error403,
  HandleSessionEnd,
  TestimonialForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data info
export const metadata = {
  title: titlesObject.createTestimonial.title,
};

const CreateTestimonialPage = async () => {
  // Fetch necessary data for creating a blog post
  const { userId, error } = await fetchCreateTestimonialPageData(
    PERMISSIONS.TESTIMONIAL.ADD_TESTIMONIAL
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="New Feedback" mainParentTab="Testimonial" />

      {/* Create Testimonial Form Component */}
      <TestimonialForm userId={userId} createFnc={createNewTestimonial} />
    </div>
  );
};

export default CreateTestimonialPage;
