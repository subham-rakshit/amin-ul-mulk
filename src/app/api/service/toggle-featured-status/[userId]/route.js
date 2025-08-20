import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import ServiceModel from "@/model/services/Service";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request, context) {
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
      requiredPermissions: [PERMISSIONS.SERVICE.TOGGLE_FEATURED_SERVICE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the service details based on the targetId
    const existingServiceDetails = await ServiceModel.findById(targetId).exec();
    if (!existingServiceDetails) {
      return errorResponse({
        message: "Service not found.",
        status: 404,
      });
    }

    // Toggle featured status
    const updatedServiceData = await ServiceModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          is_featured: !existingServiceDetails.is_featured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedServiceData) {
      return errorResponse({
        message:
          "Failed to update the service featured status. Try again later.",
        status: 500,
      });
    }

    // console.log("updatedServiceData: ", updatedServiceData);

    // Check if the updated service's featured status is true and active status is false, then make updated service's is_active as true
    if (updatedServiceData.is_featured && !updatedServiceData.is_active) {
      await ServiceModel.findByIdAndUpdate(
        updatedServiceData._id,
        {
          $set: {
            is_active: true,
          },
        },
        { new: true }
      );

      // console.log("updatedServiceData: ", updatedServiceData);
    }

    return successResponse({
      message: updatedServiceData.is_featured
        ? `You've enabled the service as a featured. Refreshing to apply changes...`
        : `You've disabled the service as a featured. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing service featured status SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
