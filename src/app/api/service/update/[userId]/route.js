import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import ServiceModel from "@/model/services/Service";
import ServiceTranslationModel from "@/model/services/ServiceTranslation";
import { ServiceValidationSchema } from "@/schemas/pagesSchema/serviceSchema";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function PUT(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { userId } = await params;
    const targetId = searchParams.get("targetId");

    const body = await request.json();

    const {
      service_name,
      slug,
      order_number,
      card_short_description,
      card_long_description,
      card_icon,
      card_image,
      banner_image,
      cover_image,
      detailed_description,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
      translateData = {},
    } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check validate requested IDs
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
      requiredPermissions: [PERMISSIONS.SERVICE.EDIT_SERVICE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
      const validatedFields = validateSchema(ServiceValidationSchema, {
        service_name,
        slug,
        order_number,
        card_short_description,
        card_long_description,
        card_icon,
        card_image,
        banner_image,
        cover_image,
        detailed_description,
        meta_title,
        meta_keywords,
        meta_image,
        meta_description,
      });
      if (!validatedFields.success) {
        return errorResponse({ status: 400, errors: validatedFields.errors });
      }

      // Check if service exists
      const existingService = await ServiceModel.findById(targetId).exec();
      if (!existingService) {
        return errorResponse({
          message: "Service not found.",
          status: 404,
        });
      }

      // Only check for duplicates if title or slug are changed
      let updatedServiceName = service_name;
      let updatedSlug = slug;
      if (
        service_name !== existingService.service_name ||
        slug !== existingService.slug
      ) {
        const existingServiceDetails = await ServiceModel.find({
          $or: [{ slug }, { service_name }],
          _id: { $ne: targetId },
        }).exec();

        // Handle Duplicate service name (Add Random Characters)
        if (
          existingServiceDetails &&
          existingServiceDetails.some(
            (service) => service.service_name === service_name
          )
        ) {
          updatedServiceName = `${service_name} ${useTitleNanoid()}`;
        }

        // Handle Duplicate service Slug (Add Random Characters)
        if (
          existingServiceDetails &&
          existingServiceDetails.some(
            (serviceData) => serviceData.slug === slug
          )
        ) {
          updatedSlug = `${slug}-${useSlugNanoid()}`;
        }
      }

      // Set service updated values object
      const updatedServiceObj = {
        service_name: updatedServiceName,
        slug: updatedSlug,
        order_number: order_number || existingService.order_number,
        card_short_description: card_short_description || "",
        card_long_description: card_long_description || "",
        card_icon: card_icon || null,
        card_image: card_image || null,
        banner_image: banner_image || null,
        cover_image: cover_image || null,
        detailed_description: detailed_description || "",
        meta_title: meta_title || "",
        meta_title: meta_keywords || "",
        meta_image: meta_image || null,
        meta_description: meta_description || "",
      };

      // Update the service data
      const updatedServiceData = await ServiceModel.findOneAndUpdate(
        { _id: existingService._id.toString() },
        { $set: updatedServiceObj },
        { new: true }
      ).exec();
      if (!updatedServiceData) {
        return errorResponse({
          message: "Falid to update the service. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation =
        await ServiceTranslationModel.findOneAndUpdate(
          {
            referenceId: updatedServiceData._id.toString(),
            lang: "en",
          },
          {
            $set: {
              service_name: updatedServiceData?.service_name || "",
              card_short_description:
                updatedServiceData?.card_short_description || "",
              card_long_description:
                updatedServiceData?.card_long_description || "",
              detailed_description:
                updatedServiceData?.detailed_description || "",
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
      if (!updateEnTranslation) {
        return errorResponse({
          message:
            "An unexpected error occurred while updating the english translation.",
          status: 400,
        });
      }

      return successResponse({
        message: "Service updated successfully. Refreshing the page...",
        status: 200,
      });
    }

    if (!translateData?.lang) {
      return errorResponse({
        message: "Invalid language. Please try again later.",
        status: 400,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations =
      await ServiceTranslationModel.findOneAndUpdate(
        {
          referenceId: targetId,
          lang: translateData.lang,
        },
        {
          $set: {
            service_name: translateData?.service_name || "",
            card_short_description: translateData?.card_short_description || "",
            card_long_description: translateData?.card_long_description || "",
            detailed_description: translateData?.detailed_description || [],
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    if (!updateOtherTranslations) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${translateData.lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `Service has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating service SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
