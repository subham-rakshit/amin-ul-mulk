"use client";

import { NormalMultipleFixedInputFields } from "@/components";

const MessageSectionFormFields = ({
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  return (
    <>
      <NormalMultipleFixedInputFields
        stateDetails={stateDetails}
        isFetching={isFetching}
        labelText="Cards"
        fieldId="about-us-section-4-cards"
        handleTextInputChange={handleTextInputChange}
        // handleTextEditorInputChange={handleTextEditorInputChange}
        translateField={true}
        cards={[
          {
            card_id: "about-us-section-4-card-1",
            types: ["TEXT", "TEXT_AREA"],
            ids_name: ["text_field_id", "text_area_field_id"],
            placeholders_name: [
              "text_field_placeholder",
              "text_area_field_placeholder",
            ],
            is_hidden: [true, true],
            // IDs
            text_field_id: "about-us-section-4-card-heading-1",
            text_area_field_id: "about-us-section-4-card-description-1",
            // Placeholders
            text_field_placeholder: "Heading",
            text_area_field_placeholder: "Description",
          },
          {
            card_id: "about-us-section-4-card-2",
            types: ["TEXT", "TEXT_AREA"],
            ids_name: ["text_field_id", "text_area_field_id"],
            placeholders_name: [
              "text_field_placeholder",
              "text_area_field_placeholder",
            ],
            is_hidden: [true, true],
            // IDs
            text_field_id: "about-us-section-4-card-heading-2",
            text_area_field_id: "about-us-section-4-card-description-2",
            // Placeholders
            text_field_placeholder: "Heading",
            text_area_field_placeholder: "Description",
          },
        ]}
      />
    </>
  );
};

export default MessageSectionFormFields;
