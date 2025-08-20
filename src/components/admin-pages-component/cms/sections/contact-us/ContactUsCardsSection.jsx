import { NormalMultipleFixedInputFields } from "@/components";
import { useMemo } from "react";

const ContactUsCardsSection = ({
  activeLang,
  isFetching,
  labelText,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedLogoImageId = (id) => {
    if (id) {
      onChangeImage("contact-us-section-2-card-logo", id);
    } else {
      onChangeImage("contact-us-section-2-card-logo", "");
    }
  };

  return (
    <>
      {/* 4 Stats Fields */}
      <NormalMultipleFixedInputFields
        stateDetails={stateDetails}
        isFetching={isFetching}
        allFilesResponse={allFilesResponse}
        labelText="Contact Cards"
        fieldId="contact-us-section-2-cards"
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
        handleImageChange={onChangeImage}
        handleTextInputChange={handleTextInputChange}
        // handleTextEditorInputChange={handleTextEditorInputChange}
        translateField={true}
        cards={[
          {
            card_id: "contact-us-card-1",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, isHideInOtherLanguages],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            extra_info: [
              "",
              "text_filed_extra_info_1",
              "text_filed_extra_info_2",
            ],
            // IDs
            logo_field_id: "contact-us-card-logo-1",
            text_filed_id_1: "contact-us-card-label-1",
            text_filed_id_2: "contact-us-card-value-1",
            // Placeholders
            text_filed_placeholder_1: "Label Name",
            text_filed_placeholder_2: "Label Value",
            // Extra Info
            text_filed_extra_info_1: "Name of the contact card",
            text_filed_extra_info_2: "Value of the contact card link",
          },
          {
            card_id: "contact-us-card-2",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, isHideInOtherLanguages],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            extra_info: [
              "",
              "text_filed_extra_info_1",
              "text_filed_extra_info_2",
            ],
            // IDs
            logo_field_id: "contact-us-card-logo-2",
            text_filed_id_1: "contact-us-card-label-2",
            text_filed_id_2: "contact-us-card-value-2",
            // Placeholders
            text_filed_placeholder_1: "Label Name",
            text_filed_placeholder_2: "Label Value",
            // Extra Info
            text_filed_extra_info_1: "Name of the contact card",
            text_filed_extra_info_2: "Value of the contact card link",
          },
          {
            card_id: "contact-us-card-3",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, isHideInOtherLanguages],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            extra_info: [
              "",
              "text_filed_extra_info_1",
              "text_filed_extra_info_2",
            ],
            // IDs
            logo_field_id: "contact-us-card-logo-3",
            text_filed_id_1: "contact-us-card-label-3",
            text_filed_id_2: "contact-us-card-value-3",
            // Placeholders
            text_filed_placeholder_1: "Label Name",
            text_filed_placeholder_2: "Label Value",
            // Extra Info
            text_filed_extra_info_1: "Name of the contact card",
            text_filed_extra_info_2: "Value of the contact card link",
          },
        ]}
      />
    </>
  );
};

export default ContactUsCardsSection;
