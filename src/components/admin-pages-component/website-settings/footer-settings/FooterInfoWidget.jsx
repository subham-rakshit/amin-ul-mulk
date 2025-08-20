"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalBrowseFileInputFiled,
  NormalTextInputField,
  SettingsUpdateButton,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const FooterInfoWidget = ({
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
    footer_logo: "",
    footer_info_description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getAllFooterInfoFieldsData = useCallback(async () => {
    setIsFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(formData),
        activeTab
      );

      if (response.targetFieldsData) {
        Object.entries(response.targetFieldsData).forEach(([key, value]) => {
          setFormData((prev) => ({
            ...prev,
            [key]: isValidJSONData(value) ? JSON.parse(value) : value,
          }));
        });
      }
    } catch (error) {
      console.error("Failed to fetch footer info widget settings data:", error);
      useErrorToast("Failed to fetch footer info widget settings.");
    } finally {
      setIsFetching(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!isSubmitting) {
      getAllFooterInfoFieldsData();
    }
  }, [isSubmitting, activeTab, getAllFooterInfoFieldsData]);

  // Handle Text Input Field State
  const onChangeTextInputField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Footer Logo Image State
  const onChangeFooterLogoImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      footer_logo: id,
    }));
  };

  // Handle OnSubmit Form
  const handleFooterInfoDataSubmit = async (e) => {
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
      console.error("Failed to update footer info widget settings:", error);
      useErrorToast("Failed to update footer info widget settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Info Widget
      </h1>

      {activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      <form onSubmit={handleFooterInfoDataSubmit} className="py-4 px-5">
        {/* Aragic Logo */}
        {activeTab === "en" && (
          <NormalBrowseFileInputFiled
            userId={userId}
            isFetching={isFetching}
            labelText="Footer App Logo"
            fieldId="footer-app-logo"
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeImageFunction={onChangeFooterLogoImage}
            selectedFileId={formData?.footer_logo || ""}
            adminRole={adminRole}
            permissionsList={permissionsList}
            extraContainerClasses="mb-5"
          />
        )}

        {/* Contact Address */}
        <NormalTextInputField
          isFetching={isFetching}
          isTextArea={true}
          labelText="Info Description"
          fieldId="footer-info-description"
          fieldName="footer_info_description"
          placeholderText="Info Description"
          inputValue={formData?.footer_info_description || ""}
          onChangeTextInputField={onChangeTextInputField}
          translateField={true}
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

export default FooterInfoWidget;
