"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalMultipleFixedInputFields,
  SettingsUpdateButton,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const FooterAboutWidget = ({
  userId,
  allFilesResponse,
  languagesResponse,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
}) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    "footer-contact-logo-1": "",
    "footer-contact-name-1": "",
    "footer-contact-value-option-one-1": "",
    "footer-contact-value-option-one-link-one-1": "",
    "footer-contact-value-option-two-1": "",
    "footer-contact-value-option-one-link-two-1": "",

    "footer-contact-logo-2": "",
    "footer-contact-name-2": "",
    "footer-contact-value-option-one-2": "",
    "footer-contact-value-option-one-link-one-2": "",
    "footer-contact-value-option-two-2": "",
    "footer-contact-value-option-one-link-two-2": "",

    "footer-contact-logo-3": "",
    "footer-contact-name-3": "",
    "footer-contact-value-option-one-3": "",
    "footer-contact-value-option-one-link-one-3": "",
    "footer-contact-value-option-two-3": "",
    "footer-contact-value-option-one-link-two-3": "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getAllFooterAboutFieldsData = useCallback(async () => {
    setIsFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(formData),
        activeTab
      );

      // console.log("response", response);

      if (response.targetFieldsData) {
        Object.entries(response.targetFieldsData).forEach(([key, value]) => {
          setFormData((prev) => ({
            ...prev,
            [key]: isValidJSONData(value) ? JSON.parse(value) : value,
          }));
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch footer about widget settings data:",
        error
      );
      useErrorToast("Failed to fetch footer about widget settings.");
    } finally {
      setIsFetching(false);
    }
  }, [activeTab]);

  // Handle Fetching Data on Component Mount
  useEffect(() => {
    if (!isSubmitting) {
      getAllFooterAboutFieldsData();
    }
  }, [isSubmitting, activeTab, getAllFooterAboutFieldsData]);

  // Handle Iamge Change
  const handleImageChange = (keyName, value) => {
    setFormData({ ...formData, [keyName]: value });
  };

  // Handle Text Input Change
  const handleTextInputChange = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [keyName]: value });
  };

  // Handle Add Only Value Repeater
  const addOnlyValueRepeaterChange = (keyName) => {
    const field = formData?.[keyName] || [];
    const newField = [...field, ""];

    setFormData({ ...formData, [keyName]: newField });
  };

  // Handle Remove Only Value Repeater
  const removeOnlyValueRepeaterChange = (keyName, valueIndex) => {
    const field = formData[keyName];
    const updatedField =
      valueIndex >= 0
        ? field.filter((item, index) => index !== valueIndex)
        : field;

    setFormData({ ...formData, [keyName]: updatedField });
  };

  // Handle Update Only Value Repeater
  const updateOnlyValueRepeaterChange = (keyName, index, value) => {
    const field = formData[keyName];
    const updatedField =
      index >= 0 ? field.map((item, i) => (i === index ? value : item)) : field;

    setFormData({ ...formData, [keyName]: updatedField });
  };

  // Handle OnSubmit Form
  const handleFooterAboutDataSubmit = async (e) => {
    e.preventDefault();

    const formatedFormData = {
      types: Object.keys(formData),
      ...formData,
    };

    setIsSubmitting(true);

    try {
      const response = await websiteSettingsUpdate(
        userId,
        formatedFormData,
        activeTab
      );
      if (response.success) {
        useSuccessToast(response?.message || "Settings updated successfully.");
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update footer about widget settings:", error);
      useErrorToast("Failed to update footer about widget settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        About Widget
      </h1>

      {activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      <form onSubmit={handleFooterAboutDataSubmit} className="py-4 px-5">
        {/* Footer Contacts */}
        <NormalMultipleFixedInputFields
          stateDetails={formData}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          labelText="Footer Contacts"
          fieldId="footer-contacts"
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          adminRole={adminRole}
          permissionsList={permissionsList}
          handleImageChange={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          // handleTextEditorInputChange={handleTextEditorInputChange}
          translateField={true}
          // extraContainerClasses="mt-5"
          cards={[
            {
              card_id: "footer-contacts-card-1",
              types: ["IMAGE", "TEXT", "TEXT", "TEXT"],
              ids_name: [
                "logo_field_id",
                "text_filed_id_1",
                "text_filed_id_2",
                "text_filed_id_3",
              ],
              placeholders_name: [
                "",
                "text_filed_placeholder_1",
                "text_filed_placeholder_2",
                "text_filed_placeholder_3",
              ],
              extra_info: [
                "",
                "text_filed_info_1",
                "text_filed_info_2",
                "text_filed_info_3",
              ],
              is_hidden: [
                activeTab === "en",
                true,
                activeTab === "en",
                activeTab === "en",
              ],
              // IDs
              logo_field_id: "footer-contact-logo-1",
              text_filed_id_1: "footer-contact-name-1",
              text_filed_id_2: "footer-contact-value-option-one-1",
              text_filed_id_3: "footer-contact-value-option-two-1",
              // Placeholders
              text_filed_placeholder_1: "Contact Name",
              text_filed_placeholder_2: "Contact Value Option One",
              text_filed_placeholder_3: "Contact Value Option Two",
              // Extra Info
              text_filed_info_1: "Name of the contact",
              text_filed_info_2: "Cantact's value option one",
              text_filed_info_3: "Cantact's value option two",
            },
            {
              card_id: "footer-contacts-card-2",
              types: ["IMAGE", "TEXT", "TEXT", "TEXT"],
              ids_name: [
                "logo_field_id",
                "text_filed_id_1",
                "text_filed_id_2",
                "text_filed_id_3",
              ],
              placeholders_name: [
                "",
                "text_filed_placeholder_1",
                "text_filed_placeholder_2",
                "text_filed_placeholder_3",
              ],
              extra_info: [
                "",
                "text_filed_info_1",
                "text_filed_info_2",
                "text_filed_info_3",
              ],
              is_hidden: [
                activeTab === "en",
                true,
                activeTab === "en",
                activeTab === "en",
              ],
              // IDs
              logo_field_id: "footer-contact-logo-2",
              text_filed_id_1: "footer-contact-name-2",
              text_filed_id_2: "footer-contact-value-option-one-2",
              text_filed_id_3: "footer-contact-value-option-two-2",
              // Placeholders
              text_filed_placeholder_1: "Contact Name",
              text_filed_placeholder_2: "Contact Value Option One",
              text_filed_placeholder_3: "Contact Value Option Two",
              // Extra Info
              text_filed_info_1: "Name of the contact",
              text_filed_info_2: "Cantact's value option one",
              text_filed_info_3: "Cantact's value option two",
            },
            {
              card_id: "footer-contacts-card-3",
              types: ["IMAGE", "TEXT", "TEXT", "TEXT"],
              ids_name: [
                "logo_field_id",
                "text_filed_id_1",
                "text_filed_id_2",
                "text_filed_id_3",
              ],
              placeholders_name: [
                "",
                "text_filed_placeholder_1",
                "text_filed_placeholder_2",
                "text_filed_placeholder_3",
              ],
              extra_info: [
                "",
                "text_filed_info_1",
                "text_filed_info_2",
                "text_filed_info_3",
              ],
              is_hidden: [
                activeTab === "en",
                true,
                activeTab === "en",
                activeTab === "en",
              ],
              // IDs
              logo_field_id: "footer-contact-logo-3",
              text_filed_id_1: "footer-contact-name-3",
              text_filed_id_2: "footer-contact-value-option-one-3",
              text_filed_id_3: "footer-contact-value-option-two-3",
              // Placeholders
              text_filed_placeholder_1: "Contact Name",
              text_filed_placeholder_2: "Contact Value Option One",
              text_filed_placeholder_3: "Contact Value Option Two",
              // Extra Info
              text_filed_info_1: "Name of the contact",
              text_filed_info_2: "Cantact's value option one",
              text_filed_info_3: "Cantact's value option two",
            },
          ]}
        />

        <div className="flex justify-end mt-5">
          <SettingsUpdateButton
            isFetching={isFetching}
            isSubmitting={isSubmitting}
            colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
            btnText="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default FooterAboutWidget;
