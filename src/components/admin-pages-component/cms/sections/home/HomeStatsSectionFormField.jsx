import {
  NormalMultipleFixedInputFields,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const HomeStatsSectionFormField = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  handleTextEditorInputChange,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  return (
    <>
      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-3-wcu-heading"
        fieldName="home-section-3-wcu-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-3-wcu-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* 4 Stats Fields */}
      <NormalMultipleFixedInputFields
        stateDetails={stateDetails}
        isFetching={isFetching}
        allFilesResponse={allFilesResponse}
        labelText="Stats"
        fieldId="home-page-stats-section"
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
        handleImageChange={onChangeImage}
        handleTextInputChange={handleTextInputChange}
        // handleTextEditorInputChange={handleTextEditorInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
        cards={[
          {
            card_id: "stats-card-1",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, true],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            // IDs
            logo_field_id: "stats-logo-1",
            text_filed_id_1: "stats-count-1",
            text_filed_id_2: "stats-text-1",
            // Placeholders
            text_filed_placeholder_1: "Stats Count",
            text_filed_placeholder_2: "Stats Text",
          },
          {
            card_id: "stats-card-2",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, true],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            // IDs
            logo_field_id: "stats-logo-2",
            text_filed_id_1: "stats-count-2",
            text_filed_id_2: "stats-text-2",
            // Placeholders
            text_filed_placeholder_1: "Stats Count",
            text_filed_placeholder_2: "Stats Text",
          },
          {
            card_id: "stats-card-3",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, true],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            // IDs
            logo_field_id: "stats-logo-3",
            text_filed_id_1: "stats-count-3",
            text_filed_id_2: "stats-text-3",
            // Placeholders
            text_filed_placeholder_1: "Stats Count",
            text_filed_placeholder_2: "Stats Text",
          },
          {
            card_id: "stats-card-4",
            types: ["IMAGE", "TEXT", "TEXT"],
            is_hidden: [isHideInOtherLanguages, true, true],
            ids_name: ["logo_field_id", "text_filed_id_1", "text_filed_id_2"],
            placeholders_name: [
              "",
              "text_filed_placeholder_1",
              "text_filed_placeholder_2",
            ],
            // IDs
            logo_field_id: "stats-logo-4",
            text_filed_id_1: "stats-count-4",
            text_filed_id_2: "stats-text-4",
            // Placeholders
            text_filed_placeholder_1: "Stats Count",
            text_filed_placeholder_2: "Stats Text",
          },
        ]}
      />
    </>
  );
};

export default HomeStatsSectionFormField;
