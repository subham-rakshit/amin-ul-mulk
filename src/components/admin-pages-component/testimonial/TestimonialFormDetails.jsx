"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { CommonTextInputField, LabelText, SubmitButton } from "@/components";
import dynamic from "next/dynamic";
// import JoditEditor from "jodit-react";
import { MdFeedback } from "react-icons/md";

const JoditEditor = dynamic(
  () => import("jodit-react"),
  { ssr: false } // This is key
);

const TestimonialFormDetails = ({
  userId,
  isTestimonialDetailsExist,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  watchMessage,
  setValue,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Name */}
      <CommonTextInputField
        fieldName="name"
        fieldType="text"
        fieldId={`${isTestimonialDetailsExist ? "update-testimonial-name" : "testimonial-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.name}
        placeholderText="Name"
        labelName="Name"
        labelStatus={true}
        translateField={isTestimonialDetailsExist}
      />

      {/* Message */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Message"
          htmlForId={`${isTestimonialDetailsExist ? "update-testimonial-message" : "testimonial-message"}`}
          star={true}
          translateField={isTestimonialDetailsExist}
        />

        <div
          className={`w-full max-w-[800px] rounded-sm border ${
            errors && errors.message
              ? "border-red-500"
              : "border-[#000]/20 dark:border-[#fff]/10"
          }`}
        >
          <JoditEditor
            config={{
              placeholder: "",
              showCharsCounter: false,
              showWordsCounter: false,
              showXPathInStatusbar: false,
              height: 300,
              style: {
                backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                color: theme === "light" ? "#495057" : "#ced4da",
              },
              toolbarAdaptive: true,
              toolbarButtonSize: "middle",
              toolbar: true,
            }}
            id={`${isTestimonialDetailsExist ? "update-testimonial-message" : "testimonial-message"}`}
            value={watchMessage}
            name="message"
            onBlur={(newContent) => {
              setValue("message", newContent);
            }}
          />
        </div>
      </div>

      {/* Order Number */}
      <CommonTextInputField
        fieldName="order_number"
        fieldType="text"
        fieldId={`${isTestimonialDetailsExist ? "update-testimonial-order-number" : "testimonial-order-number"}`}
        control={control}
        errors={errors}
        errorsType={errors?.order_number}
        placeholderText="Order Number"
        labelName="Order No."
        extraClass="mt-5"
        extraInformationText="Enter higher number for the testimonial to be shown on top OR default is 1"
      />

      {/* Submit Button */}
      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isTestimonialDetailsExist}
        colorGrade={colorGrade}
        label={
          isTestimonialDetailsExist
            ? "Update Testimonial"
            : "Create Testimonial"
        }
        icon={<MdFeedback />}
        extraButtonStyle="sm:max-w-[250px]"
      />
    </form>
  );
};

export default TestimonialFormDetails;
