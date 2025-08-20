import dbConnect from "@/lib/db/dbConnect";
import AllContactsModel from "@/model/contacts/Contacts";
import ContactTranslationModel from "@/model/contacts/ContactTranslation";
import LanguagesModel from "@/model/Language";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const type = searchParams.get("type");

    // Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { branchName: { $regex: searchQuery, $options: "i" } },
          { branchAddress: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(type && {
        type,
      }),
    };

    // Get all contacts
    let queryBuilder = AllContactsModel.find(query).select(
      "-__v -metaTitle -metaImage -metaDescription"
    );

    if (page > 0 && pageSize > 0) {
      queryBuilder = queryBuilder.skip((page - 1) * pageSize).limit(pageSize);
    }

    const contactsList = await queryBuilder.exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const contactIds = contactsList.map((contact) => contact._id);
    const translations = await ContactTranslationModel.find({
      referenceId: { $in: contactIds },
    })
      .select("-__v -createdAt -updatedAt -_id")
      .exec();

    // Map translations by contact ID
    const translationMap = {};
    translations.forEach(
      ({ referenceId, lang, branchName, branchAddress, openingHours }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          branchName,
          branchAddress,
          openingHours,
        };
      }
    );

    // Process contacts and attach translations
    const formattedContactList = contactsList.map((eachContact) => {
      const contactData = eachContact.toObject();

      // Initialize branchName, branchAddress and openingHours as objects
      contactData.branchName = {};
      contactData.branchAddress = {};
      contactData.openingHours.labels = {};

      // Fetch translations for the current post
      const translations = translationMap[eachContact._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for branchName, branchAddress and openingHours
            contactData.branchName[lang] = translations[lang].branchName || "";
            contactData.branchAddress[lang] =
              translations[lang].branchAddress || "";
            contactData.openingHours.labels[lang] =
              translations[lang].openingHours?.labels || [];
          }
        }
      }

      return contactData;
    });

    const paginationTotalContacts =
      await AllContactsModel.countDocuments(query).exec();
    const totalItemsCount = await AllContactsModel.countDocuments().exec();

    // Pagination
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalContacts / pageSize),
      totalItemsPerQuery: paginationTotalContacts,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      contacts: formattedContactList,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all contacts SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
