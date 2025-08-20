import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import ServiceModel from "@/model/services/Service";
import ServiceTranslationModel from "@/model/services/ServiceTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const page =
      parseInt(searchParams.get("page")) === NaN
        ? 0
        : parseInt(searchParams.get("page"));
    const pageSize =
      parseInt(searchParams.get("pageSize")) === NaN
        ? 0
        : parseInt(searchParams.get("pageSize"));

    // All Service Query
    const serviceLists = await ServiceModel.find({
      is_active: true,
    })
      .populate({
        path: "card_icon",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .populate({
        path: "card_image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select(
        "_id slug order_number card_icon card_image is_active is_featured updatedAt"
      )
      .sort({ createdAt: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // console.log("Service Lists:", serviceLists);

    // ✅ Convert order_number to number & sort
    const sortedServices = serviceLists.sort(
      (a, b) => Number(b.order_number) - Number(a.order_number)
    );

    // console.log("Sorted Services:", sortedServices);

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const serviceIds = sortedServices.map((service) => service._id);
    const translations = await ServiceTranslationModel.find({
      referenceId: { $in: serviceIds },
    })
      .select("-__v -createdAt -updatedAt -_id -referenceType")
      .exec();

    // Map translations by article ID
    const translationMap = {};
    translations.forEach(
      ({
        referenceId,
        lang,
        service_name,
        card_short_description,
        card_long_description,
      }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          service_name,
          card_short_description,
          card_long_description,
        };
      }
    );

    // Process services and attach translations
    const formattedServicesLists = sortedServices.map((eachService) => {
      const serviceData = eachService.toObject();

      // Initialize translations data as objects
      serviceData.service_name = {};
      serviceData.card_short_description = {};
      serviceData.card_long_description = {};

      // Fetch translations for the current service
      const translations = translationMap[eachService._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for title and shortDescription
            serviceData.service_name[lang] =
              translations[lang].service_name || "";
            serviceData.card_short_description[lang] =
              translations[lang].card_short_description || "";
            serviceData.card_long_description[lang] =
              translations[lang].card_long_description || "";
          }
        }
      }

      return serviceData;
    });

    // console.log("Formatted Services Lists:", formattedServicesLists.length);

    // Pagination
    const paginationTotalServices = await ServiceModel.countDocuments().exec();
    const totalItemsCount = await ServiceModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize === 0 ? totalItemsCount : pageSize,
      totalPages: Math.ceil(paginationTotalServices / pageSize),
      totalItemsPerQuery: paginationTotalServices,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      services: formattedServicesLists,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all services SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
