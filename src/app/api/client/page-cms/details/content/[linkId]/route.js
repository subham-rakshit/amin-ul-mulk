import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import PageCMSTranslationModel from "@/model/cms/PageCMSTranslation";
import FilesModel from "@/model/Files";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { linkId } = await params;
    const lang = searchParams.get("lang");

    // Check invalid inputs
    if (!linkId || !typeof linkId === "string" || !lang) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Get cms page details
    const cmsPageDetails = await PageCMSModel.findOne({ linkId })
      .select("_id slug metaTitle metaImage metaKeywords metaDescription")
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

    // Fetch English ('en') content as the base reference
    const cmsContentEn = await PageCMSTranslationModel.findOne({
      referenceId: cmsPageDetails._id.toString(),
      lang: "en",
    })
      .select("pageName description content updatedAt")
      .exec();

    // Parse English content
    const enContent = cmsContentEn?.content
      ? JSON.parse(cmsContentEn.content)
      : {};

    // If lang is "en", return content directly
    if (lang === "en") {
      return successResponse({
        status: 200,
        contentData: enContent,
        otherInfo: {
          pageName: cmsContentEn?.pageName || "",
          pageSlug: cmsPageDetails?.slug || "",
          pageDescription: cmsContentEn?.description || "",
          pageLastUpdatedAt: cmsContentEn?.updatedAt || "",
          pageMetaTitle: cmsPageDetails?.metaTitle || "",
          pageMetaImage: cmsPageDetails?.metaImage || {},
          pageMetaKeywords: cmsPageDetails?.metaKeywords || "",
          pageMetaDescription: cmsPageDetails?.metaDescription || "",
        },
      });
    }

    // Fetch current requested language content
    const cmsContentData = await PageCMSTranslationModel.findOne({
      referenceId: cmsPageDetails._id.toString(),
      lang,
    })
      .select("pageName description content updatedAt")
      .exec();

    // Parse the requested language content
    const langContent = cmsContentData?.content
      ? JSON.parse(cmsContentData.content)
      : {};

    // Merge content: Keep langContent values, but fill missing ones from enContent
    function deepMerge(base, override) {
      if (Array.isArray(base) && Array.isArray(override)) {
        // Merge arrays by index
        return base.map((item, index) => {
          const overrideItem = override[index] || {};
          return deepMerge(item, overrideItem);
        });
      } else if (
        base !== null &&
        typeof base === "object" &&
        override !== null &&
        typeof override === "object"
      ) {
        // Merge objects
        const merged = { ...base };
        for (const key in base) {
          merged[key] =
            override.hasOwnProperty(key) && override[key] !== ""
              ? deepMerge(base[key], override[key])
              : base[key];
        }
        return merged;
      } else {
        // For primitives, pick override if exists, otherwise base
        return override !== undefined && override !== "" ? override : base;
      }
    }

    // Merge content: Keep langContent values, but fill missing ones from enContent
    // const mergedContent = Object.keys(enContent).reduce((acc, key) => {
    //   acc[key] = langContent.hasOwnProperty(key)
    //     ? langContent[key]
    //     : enContent[key];
    //   return acc;
    // }, {});
    const mergedContent = deepMerge(enContent, langContent);

    return successResponse({
      status: 200,
      contentData: mergedContent,
      otherInfo: {
        pageName: cmsContentData?.pageName || "",
        pageSlug: cmsPageDetails?.slug || "",
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
