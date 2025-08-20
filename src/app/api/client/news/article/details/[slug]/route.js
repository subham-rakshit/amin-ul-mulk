import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { isValidSlug } from "@/utils/helpers";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { slug } = await params;
    const lang = searchParams.get("lang") || "en";

    // Validate Category and User IDs
    if (!slug && !typeof slug === "string") {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Slug Validation
    const validSlug = isValidSlug(slug);
    if (!validSlug) {
      return errorResponse({
        message: "Invalid request.",
        status: 400,
      });
    }

    // Get common news article details
    const newsArticleCommonDetails = await AllNewsArticleModel.findOne({
      slug,
    })
      .select("-__v -title -description -is_active -is_featured -order_number")
      .populate({
        path: "banner_image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .populate({
        path: "featured_image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .populate({
        path: "small_image_option_1",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .populate({
        path: "small_image_option_2",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .populate({
        path: "meta_image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!newsArticleCommonDetails) {
      return errorResponse({
        message: "News Article not found.",
        status: 404,
      });
    }

    const translation = await NewsTranslationModel.findOne({
      referenceId: newsArticleCommonDetails._id.toString(),
      lang,
    })
      .select("-referenceType -referenceId -__v -createdAt -updatedAt")
      .exec();

    newsArticleCommonDetails.title = translation?.title || "";
    newsArticleCommonDetails.description = translation?.description || "";

    return successResponse({
      status: 200,
      newsArticleDetails: newsArticleCommonDetails,
    });
  } catch (error) {
    console.log(`Error in getting news article details FE SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
