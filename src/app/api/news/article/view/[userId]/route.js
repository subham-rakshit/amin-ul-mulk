import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { userId } = await params;
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page"));
    const pageSize = parseInt(searchParams.get("pageSize"));
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    // Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.NEWS.VIEW_ALL_NEWS_ARTICLES],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(status && {
        is_active: status === "true", // Convert to boolean
      }),
      ...(featured && {
        is_featured: featured === "true", // Convert to boolean
      }),
    };

    const articleLists = await AllNewsArticleModel.find(query)
      .populate({
        path: "banner_image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select("-__v -meta_title -meta_keywords -meta_image -meta_description")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // // Fetch all active languages
    // const languages = await LanguagesModel.find({
    //   status: true,
    // }).exec();

    // // Fetch translations in one query
    // const articleIds = articleLists.map((article) => article._id);
    // const translations = await NewsTranslationModel.find({
    //   referenceId: { $in: articleIds },
    // })
    //   .select("-__v -createdAt -updatedAt -_id -referenceType")
    //   .exec();

    // // Map translations by article ID
    // const translationMap = {};
    // translations.forEach(({ referenceId, lang, title, description }) => {
    //   if (!translationMap[referenceId]) {
    //     translationMap[referenceId] = {};
    //   }
    //   translationMap[referenceId][lang] = {
    //     title,
    //     description,
    //   };
    // });

    // // Process articles and attach translations
    // const formattedArticleLists = articleLists.map((eachArticle) => {
    //   const articleData = eachArticle.toObject();

    //   // Initialize title and shortDescription as objects
    //   articleData.title = {};
    //   articleData.description = {};

    //   // Fetch translations for the current article
    //   const translations = translationMap[eachArticle._id];

    //   // If translations exist, populate the fields
    //   if (translations) {
    //     // Loop through all available languages
    //     for (const lang in translations) {
    //       if (translations[lang]) {
    //         // Assign translations for title and shortDescription
    //         articleData.title[lang] = translations[lang].title || "";
    //         articleData.shortDescription[lang] =
    //           translations[lang].shortDescription || "";
    //         articleData.tags[lang] = translations[lang].tags || [];
    //       }
    //     }
    //   }

    //   return articleData;
    // });

    // Pagination
    const paginationTotalArticles =
      await AllNewsArticleModel.countDocuments(query).exec();
    const totalItemsCount = await AllNewsArticleModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalArticles / pageSize),
      totalItemsPerQuery: paginationTotalArticles,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      newsArticles: articleLists,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all news articles SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
