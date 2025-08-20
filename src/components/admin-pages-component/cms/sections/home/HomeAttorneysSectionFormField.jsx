import {
  NormalMultipleInputStackFilds,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const HomeAttorneysSectionFormField = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  addMultiValueRepeaterChange,
  removeMultiValueRepeaterChange,
  updateMultiValueRepeaterChange,
  stateDetails,
  adminRole,
  permissionsList,
  colorGrade,
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
        fieldId="home-section-7-attorneys-sub-heading"
        fieldName="home-section-7-attorneys-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["home-section-7-attorneys-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-7-attorneys-heading"
        fieldName="home-section-7-attorneys-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-7-attorneys-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="home-section-7-attorneys-button-label"
        fieldName="home-section-7-attorneys-button-label"
        placeholderText="Button Label"
        inputValue={
          stateDetails?.["home-section-7-attorneys-button-label"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Multi Attorneys Section */}
      <NormalMultipleInputStackFilds
        stateDetails={stateDetails}
        isFetching={isFetching}
        allFilesResponse={allFilesResponse}
        labelText="Attorneys"
        fieldId="home-section-7-attorneys-multi-attorneys"
        fieldKey="home-section-7-attorneys-multi-attorneys"
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
        addMultiValueRepeaterChange={addMultiValueRepeaterChange}
        removeMultiValueRepeaterChange={removeMultiValueRepeaterChange}
        updateMultiValueRepeaterChange={updateMultiValueRepeaterChange}
        translateField={true}
        extraContainerClasses="mt-5"
        filedStructure={["IMAGE", "TEXT", "TEXT"]}
        dataStructure={{ image: "", name: "", designation: "" }}
        placeholderTexts={["", "Name", "Designation"]}
        is_hidden={[isHideInOtherLanguages, true, true]}
        colorGrade={colorGrade}
      />
    </>
  );
};

export default HomeAttorneysSectionFormField;
