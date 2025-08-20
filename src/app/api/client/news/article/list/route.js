import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const feature = searchParams.get("feature");

    // ✅ Build query dynamically
    let query = { is_active: true };
    if (feature === "true") {
      query.is_featured = true;
    }

    const articleLists = await AllNewsArticleModel.find(query)
      .populate({
        path: "featured_image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
      })
      .select("_id title slug order_number featured_image updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    if (articleLists.length > 0) {
      // ✅ Sort in JS by casting order_number to integer
      articleLists.sort(
        (a, b) =>
          parseInt(a?.order_number || "1", 10) -
          parseInt(b?.order_number || "1", 10)
      );
    }

    // console.log(articleLists);

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const articleIds = articleLists.map((article) => article._id);
    const translations = await NewsTranslationModel.find({
      referenceId: { $in: articleIds },
    })
      .select("-__v -createdAt -updatedAt -description -_id -referenceType")
      .exec();

    // Map translations by article ID
    const translationMap = {};
    translations.forEach(({ referenceId, lang, title }) => {
      if (!translationMap[referenceId]) {
        translationMap[referenceId] = {};
      }
      translationMap[referenceId][lang] = {
        title,
      };
    });

    // Process articles and attach translations
    const formattedArticleLists = articleLists.map((eachArticle) => {
      const articleData = { ...eachArticle, title: {} };

      // Fetch translations for the current article
      const translations = translationMap[eachArticle._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for title and shortDescription
            articleData.title[lang] = translations[lang].title || "";
          }
        }
      }

      return articleData;
    });

    return successResponse({
      status: 200,
      newsArticles: formattedArticleLists,
    });
  } catch (error) {
    console.log(
      `Error in getting all news articles FE SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
