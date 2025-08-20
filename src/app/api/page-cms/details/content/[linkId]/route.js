import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import PageCMSTranslationModel from "@/model/cms/PageCMSTranslation";
import FilesModel from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { linkId } = await params;
    const userId = searchParams.get("userId");
    const lang = searchParams.get("lang");

    // Check invalid inputs
    if (
      !userId ||
      !linkId ||
      !lang ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get cms page details
    const cmsPageDetails = await PageCMSModel.findOne({ linkId })
      .select("_id metaTitle metaImage metaKeywords metaDescription")
      .populate({
        path: "metaImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!cmsPageDetails) {
      return errorResponse({
        message: "CMS Page not found.",
        status: 404,
      });
    }

    // Fetch language content data
    const cmsContentData = await PageCMSTranslationModel.findOne({
      referenceId: cmsPageDetails._id.toString(),
      lang,
    })
      .select("pageName description content updatedAt")
      .exec();
    if (!cmsContentData) {
      return errorResponse({
        message: `Translation for the requested language '${lang}' not found.`,
        status: 404,
      });
    }

    // Parse content
    const langContent = cmsContentData?.content
      ? JSON.parse(cmsContentData.content)
      : {};

    return successResponse({
      status: 200,
      contentData: langContent,
      otherInfo: {
        pageName: cmsContentData?.pageName || "",
        pageDescription: cmsContentData?.description || "",
        pageLastUpdatedAt: cmsContentData?.updatedAt || "",
        pageMetaTitle: cmsPageDetails?.metaTitle || "",
        pageMetaImage: cmsPageDetails?.metaImage || {},
        pageMetaKeywords: cmsPageDetails?.metaKeywords || "",
        pageMetaDescription: cmsPageDetails?.metaDescription || "",
      },
    });
  } catch (error) {
    console.log(`Error in getting cms page content details SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
