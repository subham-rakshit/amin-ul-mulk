import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import ServiceModel from "@/model/services/Service";
import ServiceTranslationModel from "@/model/services/ServiceTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

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
      requiredPermissions: [PERMISSIONS.SERVICE.DELETE_SERVICE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the perticular service
    const deletedService =
      await ServiceModel.findByIdAndDelete(targetId).exec();
    if (!deletedService) {
      return errorResponse({
        message: "Failed to delete the service. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted service _id
    await ServiceTranslationModel.deleteMany({
      referenceId: deletedService._id.toString(),
    }).exec();

    return successResponse({
      message: `${deletedService?.service_name || "Unknown"} service has been deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting service SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
