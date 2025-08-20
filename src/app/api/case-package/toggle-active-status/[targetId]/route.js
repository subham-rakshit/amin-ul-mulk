import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CasePackageModel from "@/model/case-package/CasePackage";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { targetId } = await params;
    const userId = searchParams.get("userId");

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
      requiredPermissions: [
        PERMISSIONS.CASE_PACKAGE.TOGGLE_ACTIVE_CASE_PACKAGE,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the case package details
    const existingCasePackageDetails =
      await CasePackageModel.findById(targetId).exec();
    if (!existingCasePackageDetails) {
      return errorResponse({
        message: "New Article not found.",
        status: 404,
      });
    }

    // Toggle activeStatus
    const updatedCasePackage = await CasePackageModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          is_active: !existingCasePackageDetails.is_active,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCasePackage) {
      return errorResponse({
        message:
          "Failed to update the case package active status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated case package's active status is false and featured status is true, then make updated case package's isFeatured as false
    if (updatedCasePackage.is_featured && !updatedCasePackage.is_active) {
      await CasePackageModel.findByIdAndUpdate(updatedCasePackage._id, {
        $set: {
          is_featured: false,
        },
      });
    }

    return successResponse({
      message: updatedCasePackage.is_active
        ? `You've enabled the case package. Refreshing to apply changes...`
        : `You've disabled the case package. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing case package active status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
