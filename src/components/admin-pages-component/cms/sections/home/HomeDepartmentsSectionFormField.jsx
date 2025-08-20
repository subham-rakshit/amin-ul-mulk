import {
  NormalMultipleInputStackFilds,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const HomeDepartmentsSectionFormField = ({
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
        fieldId="home-section-8-departments-sub-heading"
        fieldName="home-section-8-departments-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["home-section-8-departments-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-8-departments-heading"
        fieldName="home-section-8-departments-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-8-departments-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Multi Departments Section */}
      <NormalMultipleInputStackFilds
        stateDetails={stateDetails}
        isFetching={isFetching}
        allFilesResponse={allFilesResponse}
        labelText="Departments"
        fieldId="home-section-8-multi-departments"
        fieldKey="home-section-8-multi-departments"
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
        addMultiValueRepeaterChange={addMultiValueRepeaterChange}
        removeMultiValueRepeaterChange={removeMultiValueRepeaterChange}
        updateMultiValueRepeaterChange={updateMultiValueRepeaterChange}
        translateField={true}
        extraContainerClasses="mt-5"
        filedStructure={["TEXT", "TEXT_EDITOR"]}
        dataStructure={{ name: "", designation: "" }}
        placeholderTexts={["Name", "Description"]}
        is_hidden={[true, true]}
        colorGrade={colorGrade}
      />
    </>
  );
};

export default HomeDepartmentsSectionFormField;
