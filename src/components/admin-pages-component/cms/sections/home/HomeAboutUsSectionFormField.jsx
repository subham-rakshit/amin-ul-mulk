import {
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const HomeAboutUsSectionFormField = ({
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

  const getSelectedBannerImageId = (keyname, id) => {
    if (id) {
      onChangeImage(keyname, id);
    } else {
      onChangeImage(keyname, "");
    }
  };

  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="home-section-2-about-company-sub-heading"
        fieldName="home-section-2-about-company-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["home-section-2-about-company-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-2-about-company-heading"
        fieldName="home-section-2-about-company-heading"
        placeholderText="Heading"
        inputValue={
          stateDetails?.["home-section-2-about-company-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Title */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId="home-section-2-about-company-title"
        fieldName="home-section-2-about-company-title"
        placeholderText="Title"
        inputValue={stateDetails?.["home-section-2-about-company-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Description"
        fieldId="home-section-2-about-company-description"
        fieldName="home-section-2-about-company-description"
        placeholderText="Description"
        inputValue={
          stateDetails?.["home-section-2-about-company-description"] || ""
        }
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* About Company Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId="home-section-2-about-company-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={(id) =>
            getSelectedBannerImageId("home-section-2-about-company-image", id)
          }
          selectedFileId={
            stateDetails?.["home-section-2-about-company-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      {/* Iamge Left Text */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Image Left Text"
        fieldId="home-section-2-about-company-image-left-text"
        fieldName="home-section-2-about-company-image-left-text"
        placeholderText="Image Left Text"
        inputValue={
          stateDetails?.["home-section-2-about-company-image-left-text"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Experience Number */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Experience"
        fieldId="home-section-2-about-company-experience"
        fieldName="home-section-2-about-company-experience"
        placeholderText="Experience"
        inputValue={
          stateDetails?.["home-section-2-about-company-experience"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Iamge Right Text */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Image Right Text"
        fieldId="home-section-2-about-company-image-right-text"
        fieldName="home-section-2-about-company-image-right-text"
        placeholderText="Image Right Text"
        inputValue={
          stateDetails?.["home-section-2-about-company-image-right-text"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="home-section-2-about-company-button-label"
        fieldName="home-section-2-about-company-button-label"
        placeholderText="Button Label"
        inputValue={
          stateDetails?.["home-section-2-about-company-button-label"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />
    </>
  );
};

export default HomeAboutUsSectionFormField;
