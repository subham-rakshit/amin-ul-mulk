import { NormalTextInputField } from "@/components";

const PackagesListingSectionFormFields = ({
  isFetching,
  handleTextInputChange,
  stateDetails,
}) => {
  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="packages-listing-section-2-sub-heading"
        fieldName="packages-listing-section-2-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["packages-listing-section-2-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="packages-listing-section-2-heading"
        fieldName="packages-listing-section-2-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["packages-listing-section-2-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default PackagesListingSectionFormFields;
