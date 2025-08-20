import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CasePackageModel from "@/model/case-package/CasePackage";
import CasePackageTranslationModel from "@/model/case-package/CasePackageTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { targetId } = await params;
    const userId = searchParams.get("userId");

    // Handle not getting request data
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
      requiredPermissions: [PERMISSIONS.CASE_PACKAGE.DELETE_CASE_PACKAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the case package
    const deletedCasePackage =
      await CasePackageModel.findByIdAndDelete(targetId).exec();
    if (!deletedCasePackage) {
      return errorResponse({
        message: "Failed to delete the case package. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted case package _id
    await CasePackageTranslationModel.deleteMany({
      referenceId: deletedCasePackage._id.toString(),
    }).exec();

    return successResponse({
      message: "Case Package has been deleted successfully. Refreshing...",
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting case package SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
