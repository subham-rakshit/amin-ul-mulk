"use client";

import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const NewsAndBlogsHeroSection = ({
  activeLang,
  isFetching,
  stateDetails,
  handleTextInputChange,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedBannerImageId = (id) => {
    if (id) {
      onChangeImage("news-and-blogs-section-1-banner-image", id);
    } else {
      onChangeImage("news-and-blogs-section-1-banner-image", "");
    }
  };

  return (
    <>
      {/* Banner Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Banner Image"
          fieldId="news-and-blogs-section-1-banner-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedBannerImageId}
          selectedFileId={
            stateDetails?.["news-and-blogs-section-1-banner-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Recommended size: 1300 x 650px"
          extraContainerClasses="mb-5"
        />
      )}

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="news-and-blogs-section-1-heading"
        fieldName="news-and-blogs-section-1-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["news-and-blogs-section-1-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />
    </>
  );
};

export default NewsAndBlogsHeroSection;
