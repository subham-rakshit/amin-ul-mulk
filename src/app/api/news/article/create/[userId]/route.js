import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { AllNewsArticleSchema } from "@/schemas/pagesSchema/newsArticleSchema";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { userId } = await params;

    const body = await request.json();
    const {
      title,
      slug,
      order_number,
      banner_image,
      featured_image,
      description,
      small_image_option_1,
      small_image_option_2,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
    } = body;

    // NOTE Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.NEWS.ADD_NEWS_ARTICLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(AllNewsArticleSchema, {
      title,
      slug,
      order_number,
      banner_image,
      featured_image,
      description,
      small_image_option_1,
      small_image_option_2,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Extract excisting blogs related to title and slug
    let updatedTitle = title;
    let updatedSlug = slug;

    const existingNewsArticles = await AllNewsArticleModel.find({
      $or: [{ slug }, { title }],
    });

    // Handle Duplicate news article Title (Add Random Characters)
    if (
      existingNewsArticles &&
      existingNewsArticles.some((article) => article.title === title)
    ) {
      updatedTitle = `${title} ${useTitleNanoid()}`;
    }

    // Handle Duplicate news article Slug (Add Random Characters)
    if (
      existingNewsArticles &&
      existingNewsArticles.some((article) => article.slug === slug)
    ) {
      updatedSlug = `${slug}-${useSlugNanoid()}`;
    }

    // Create a new news article and save into DB
    const newNewsArticle = new AllNewsArticleModel({
      title: updatedTitle,
      slug: updatedSlug,
      order_number: order_number || "1",
      banner_image: banner_image || null,
      featured_image: featured_image || null,
      description,
      small_image_option_1: small_image_option_1 || null,
      small_image_option_2: small_image_option_2 || null,
      meta_title: meta_title || "",
      meta_keywords: meta_keywords || "",
      meta_image: meta_image || null,
      meta_description: meta_description || "",
    });
    const savedNewsArticle = await newNewsArticle.save();

    // Store title, shortDescription, description, tags in the LanguageTranslation collection with lang = "en" default
    const createEnTranslation = await NewsTranslationModel.findOneAndUpdate(
      {
        referenceId: savedNewsArticle._id.toString(),
        lang: "en",
      },
      {
        $set: {
          title,
          description,
        },
      },
      { new: true, upsert: true }
    );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving news data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: "News Article created successfully.",
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating news article SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
