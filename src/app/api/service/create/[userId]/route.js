import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid } from "@/lib/hooks";
import ServiceModel from "@/model/services/Service";
import ServiceTranslationModel from "@/model/services/ServiceTranslation";
import { ServiceValidationSchema } from "@/schemas/pagesSchema/serviceSchema";
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

    const {
      service_name,
      slug,
      order_number,
      card_short_description,
      card_long_description,
      card_icon,
      card_image,
      banner_image,
      cover_image,
      detailed_description,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
    } = body;

    // NOTE Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.SERVICE.ADD_SERVICE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(ServiceValidationSchema, {
      service_name,
      slug,
      order_number,
      card_short_description,
      card_long_description,
      card_icon,
      card_image,
      banner_image,
      cover_image,
      detailed_description,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Extract excisting slug
    const existingService = await ServiceModel.findOne({ slug });
    let updatedSlug = slug;

    // If the slug already exists, append a random string to the end of the slug
    if (existingService) {
      updatedSlug = `${slug}-${useSlugNanoid()}`;
    }

    // Create a new service and save into DB
    const newServiceObj = new ServiceModel({
      service_name,
      slug: updatedSlug,
      order_number: order_number || "1",
      card_short_description: card_short_description || "",
      card_long_description: card_long_description || "",
      card_icon: card_icon || null,
      card_image: card_image || null,
      banner_image: banner_image || null,
      cover_image: cover_image || null,
      detailed_description: detailed_description || "",
      meta_title: meta_title || "",
      meta_keywords: meta_keywords || "",
      meta_image: meta_image || null,
      meta_description: meta_description || "",
    });
    const savedServiceData = await newServiceObj.save();

    // Store service_name, card_short_description, card_long_description, detailed_description in the ServiceTranslationModel collection with lang = "en" default
    const createEnTranslation = await ServiceTranslationModel.findOneAndUpdate(
      {
        referenceId: savedServiceData._id.toString(),
        lang: "en",
      },
      {
        $set: {
          service_name: service_name || "",
          card_short_description: card_short_description || "",
          card_long_description: card_long_description || "",
          detailed_description: detailed_description || "",
        },
      },
      { new: true, upsert: true }
    );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving news data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `${savedServiceData?.service_name || "Unknown"} service stored successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating service SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
