"use client";

import { NormalTextInputField } from "@/components";

const NewsAndBlogsListingSection = ({
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="news-and-blogs-section-2-category-sub-heading"
        fieldName="news-and-blogs-section-2-category-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["news-and-blogs-section-2-category-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="news-and-blogs-section-2-news-blogs-heading"
        fieldName="news-and-blogs-section-2-news-blogs-heading"
        placeholderText="Heading"
        inputValue={
          stateDetails?.["news-and-blogs-section-2-news-blogs-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default NewsAndBlogsListingSection;
