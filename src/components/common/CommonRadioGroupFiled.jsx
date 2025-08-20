"use client";

import { LabelText } from "..";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { Controller } from "react-hook-form";

const { globalStyleObj } = require("@/app/assets/styles");

const CommonRadioGroupFiled = ({
  options = [],
  fieldName,
  fieldId,
  control,
  errors,
  errorsType,
  labelName,
  labelStatus = true,
  extraClass = "",
  inputBoxMaxWidth = "max-w-[800px]",
  translateField = false,
}) => {
  return (
    <div
      className={`${globalStyleObj.commonInputContainerClass} ${extraClass}`}
    >
      <LabelText
        text={labelName}
        htmlForId={fieldId}
        star={labelStatus}
        translateField={translateField}
      />

      <div className={`flex flex-col gap-2 w-full ${inputBoxMaxWidth}`}>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <RadioGroup
              id={fieldId}
              onValueChange={field.onChange}
              value={field.value}
              className="flex gap-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${fieldId}-${option.value}`}
                  />
                  <Label
                    htmlFor={`${fieldId}-${option.value}`}
                    className="text-[14px] font-poppins-rg text-dark-weight-300"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />

        {errors && errorsType && (
          <p className={globalStyleObj.commonInputErrorClass}>
            {errorsType.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommonRadioGroupFiled;
