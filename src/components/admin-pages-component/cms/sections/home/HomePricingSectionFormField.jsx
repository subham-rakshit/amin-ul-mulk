import { NormalTextInputField } from "@/components";

const HomePricingSectionFormField = ({
  activeLang,
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
        fieldId="home-section-4-pricing-sub-heading"
        fieldName="home-section-4-pricing-sub-heading"
        placeholderText="Sub Heading"
        inputValue={stateDetails?.["home-section-4-pricing-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-4-pricing-heading"
        fieldName="home-section-4-pricing-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-4-pricing-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomePricingSectionFormField;
