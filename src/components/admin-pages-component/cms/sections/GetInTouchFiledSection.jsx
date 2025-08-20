import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const GetInTouchFiledSection = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  stateDetails,
  adminRole,
  permissionsList,
  imageKey = "",
  titleKey = "",
  headingKey = "",
  subHeadingKey = "",
  buttonLabelKey = "",
  buttonLinkKey = "",
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedImageId = (id) => {
    if (id) {
      onChangeImage(imageKey, id);
    } else {
      onChangeImage(imageKey, "");
    }
  };

  return (
    <>
      {/* Image 1 */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId={imageKey}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImageId}
          selectedFileId={stateDetails?.[imageKey] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId={headingKey}
        fieldName={headingKey}
        placeholderText="Heading"
        inputValue={stateDetails?.[headingKey] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default GetInTouchFiledSection;
