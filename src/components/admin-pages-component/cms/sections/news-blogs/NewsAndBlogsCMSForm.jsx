"use client";

import {
  NewsAndBlogsHeroSection,
  NewsAndBlogsListingSection,
} from "@/components";

const NewsAndBlogsCMSForm = ({
  activeTab,
  isFetching,
  formData,
  selectedTab,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
}) => {
  return (
    <>
      {selectedTab === "section-1" && (
        <NewsAndBlogsHeroSection
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {selectedTab === "section-2" && (
        <NewsAndBlogsListingSection
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}
    </>
  );
};

export default NewsAndBlogsCMSForm;
