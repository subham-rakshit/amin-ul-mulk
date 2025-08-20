import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import ServiceModel from "@/model/services/Service";
import ServiceTranslationModel from "@/model/services/ServiceTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request, context) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const { params } = context;

    const { userId } = await params;
    const targetId = searchParams.get("targetId");

    // Validate IDs
    if (
      !userId ||
      !targetId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(targetId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.SERVICE.EDIT_SERVICE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get common service details
    const serviceCommonDetails = await ServiceModel.findById(targetId)
      .select(
        "-__v -service_name -card_short_description -card_long_description -detailed_description -is_active -is_featured"
      )
      .populate([
        {
          path: "card_icon",
          model: FilesModel,
          select: "fileUrl fileName fileType",
          match: { _id: { $ne: null } },
        },
        {
          path: "card_image",
          model: FilesModel,
          select: "fileUrl fileName fileType",
          match: { _id: { $ne: null } },
        },
        {
          path: "banner_image",
          model: FilesModel,
          select: "fileUrl fileName fileType",
          match: { _id: { $ne: null } },
        },
        {
          path: "cover_image",
          model: FilesModel,
          select: "fileUrl fileName fileType",
          match: { _id: { $ne: null } },
        },
        {
          path: "meta_image",
          model: FilesModel,
          select: "fileUrl fileName fileType",
          match: { _id: { $ne: null } },
        },
      ])
      .lean()
      .exec();
    if (!serviceCommonDetails) {
      return errorResponse({
        message: "Service not found.",
        status: 404,
      });
    }

    // Get translations for the active language

    // Get all types of languages ["en", "ar", ...]
    const languagesList = await LanguagesModel.find({
      status: true,
    })
      .select("code")
      .exec();

    // Fetch translations and format them as { "en": { ...translationData }, "ar": {}, ... }
    const details = {};

    await Promise.all(
      languagesList.map(async (language) => {
        const translation = await ServiceTranslationModel.findOne({
          referenceId: serviceCommonDetails._id.toString(),
          lang: language.code,
        })
          .select("-referenceId -__v -createdAt -updatedAt")
          .exec();

        details[language.code] = translation || {}; // Empty object if null
      })
    );

    return successResponse({
      status: 200,
      serviceCommonDetails,
      translationData: details,
    });
  } catch (error) {
    console.log(`Error in getting service details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
