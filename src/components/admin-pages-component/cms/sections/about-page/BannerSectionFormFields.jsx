"use client";

import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const BannerSectionFormFields = ({
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

  const getSelectedBannerImageId = (id) => {
    if (id) {
      onChangeImage("about-us-section-1-banner-image", id);
    } else {
      onChangeImage("about-us-section-1-banner-image", "");
    }
  };

  return (
    <>
      {/* Banner Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Banner Image"
          fieldId="about-us-section-1-banner-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedBannerImageId}
          selectedFileId={
            stateDetails?.["about-us-section-1-banner-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Recommended size: 1300 x 650px"
        />
      )}

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="about-us-section-1-banner-heading"
        fieldName="about-us-section-1-banner-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["about-us-section-1-banner-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default BannerSectionFormFields;
