import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TestimonialModel from "@/model/testimonial/Testimonial";
import TestimonialTranslationModel from "@/model/testimonial/TestimonialTranslation";
import { TestimonialSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { userId } = await params;

    const body = await request.json();
    const { name, message, order_number } = body;

    // Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.TESTIMONIAL.ADD_TESTIMONIAL],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(TestimonialSchema, {
      name,
      message,
      order_number,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Create a new testimonial and save into DB
    const newTestimonial = new TestimonialModel({
      name,
      message,
      order_number: order_number || "1",
    });
    const savdTestimonial = await newTestimonial.save();

    // Store name, designation, message in the Translation collection with lang = "en" default
    const createEnTranslation =
      await TestimonialTranslationModel.findOneAndUpdate(
        {
          referenceId: savdTestimonial._id.toString(),
          lang: "en",
        },
        {
          $set: {
            name,
            message: message || "",
          },
        },
        { new: true, upsert: true }
      );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving testimonial data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `${savdTestimonial?.name || "Anonymous"} testimonial created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating testimonial SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
