"use client";

import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const MessageSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  onChangeImage,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedImageId = (id) => {
    if (id) {
      onChangeImage("about-us-section-4-ceo-image", id);
    } else {
      onChangeImage("about-us-section-4-ceo-image", "");
    }
  };

  return (
    <>
      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="about-us-section-4-heading"
        fieldName="about-us-section-4-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["about-us-section-4-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Message */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Message"
        fieldId="about-us-section-4-message"
        fieldName="about-us-section-4-message"
        placeholderText="Message"
        inputValue={stateDetails?.["about-us-section-4-message"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="CEO Name"
        fieldId="about-us-section-4-ceo-name"
        fieldName="about-us-section-4-ceo-name"
        placeholderText="CEO Name"
        inputValue={stateDetails?.["about-us-section-4-ceo-name"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="CEO Image"
          fieldId={`about-us-section-4-ceo-image`}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImageId}
          selectedFileId={stateDetails?.[`about-us-section-4-ceo-image`] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default MessageSectionFormFields;
