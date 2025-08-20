"use client";

import { NormalBrowseFileInputFiled, NormalMultipleFixedInputFields } from "@/components";
import { useMemo } from "react";

const WhyChooseUsSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleTextEditorInputChange,
  onChangeImage,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedImageId = (id) => {
    if (id) {
      onChangeImage("about-us-section-3-image", id);
    } else {
      onChangeImage("about-us-section-3-image", "");
    }
  };

  return (
    <>
      {/* Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId={`about-us-section-3-image`}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImageId}
          selectedFileId={stateDetails?.[`about-us-section-3-image`] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      <NormalMultipleFixedInputFields
        stateDetails={stateDetails}
        isFetching={isFetching}
        labelText="Cards"
        fieldId="about-us-section-4-cards"
        handleTextInputChange={handleTextInputChange}
        // handleTextEditorInputChange={handleTextEditorInputChange}
        translateField={true}
        cards={[
          {
            card_id: "about-us-section-4-card-1",
            types: ["TEXT", "TEXT_AREA"],
            ids_name: ["text_field_id", "text_area_field_id"],
            placeholders_name: [
              "text_field_placeholder",
              "text_area_field_placeholder",
            ],
            is_hidden: [true, true],
            // IDs
            text_field_id: "about-us-section-4-card-heading-1",
            text_area_field_id: "about-us-section-4-card-description-1",
            // Placeholders
            text_field_placeholder: "Heading",
            text_area_field_placeholder: "Description",
          },
          {
            card_id: "about-us-section-4-card-2",
            types: ["TEXT", "TEXT_AREA"],
            ids_name: ["text_field_id", "text_area_field_id"],
            placeholders_name: [
              "text_field_placeholder",
              "text_area_field_placeholder",
            ],
            is_hidden: [true, true],
            // IDs
            text_field_id: "about-us-section-4-card-heading-2",
            text_area_field_id: "about-us-section-4-card-description-2",
            // Placeholders
            text_field_placeholder: "Heading",
            text_area_field_placeholder: "Description",
          },
        ]}
      />

      {/* Heading */}
      {/* <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="about-us-section-3-heading"
        fieldName="about-us-section-3-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["about-us-section-3-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      /> */}

      {/* Description */}
      {/* <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Description"
        fieldId="about-us-section-3-description"
        fieldName="about-us-section-3-description"
        placeholderText="Description"
        inputValue={stateDetails?.["about-us-section-3-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        translateField={true}
      /> */}
    </>
  );
};

export default WhyChooseUsSectionFormFields;
