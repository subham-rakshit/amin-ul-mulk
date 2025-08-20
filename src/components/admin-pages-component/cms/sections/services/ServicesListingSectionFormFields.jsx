import { NormalTextInputField } from "@/components";

const ServicesListingSectionFormFields = ({
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
        fieldId="services-listing-section-2-sub-heading"
        fieldName="services-listing-section-2-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["services-listing-section-2-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="services-listing-section-2-heading"
        fieldName="services-listing-section-2-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["services-listing-section-2-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default ServicesListingSectionFormFields;
