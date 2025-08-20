"use client";

import {
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const AboutSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleTextEditorInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="about-us-section-2-sub-heading"
        fieldName="about-us-section-2-sub-heading"
        placeholderText="Sub Heading"
        inputValue={stateDetails?.["about-us-section-2-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="about-us-section-2-heading"
        fieldName="about-us-section-2-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["about-us-section-2-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Description"
        fieldId="about-us-section-2-description"
        fieldName="about-us-section-2-description"
        placeholderText="Description"
        inputValue={stateDetails?.["about-us-section-2-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId="about-us-section-2-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={(id) =>
            id
              ? handleImageChange("about-us-section-2-image", id)
              : handleImageChange("about-us-section-2-image", "")
          }
          selectedFileId={stateDetails?.["about-us-section-2-image"] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default AboutSectionFormFields;
