import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { DepartmentsContent } from "..";

const DepartmentSection = async ({
  sectionId = "",
  filesList = [],
  currentLanguage = "en",
}) => {
  // Fetch services nessary data
  const [homeCMSData] = await Promise.all([
    getPublicPageCMSContent("home", currentLanguage),
  ]);

  const homeContentData = homeCMSData?.contentDetails || {};

  // Extract Department Section Data
  const department_section_sub_heading =
    homeContentData?.["home-section-8-departments-sub-heading"] || "";
  const department_section_heading =
    homeContentData?.["home-section-8-departments-heading"] || "";
  const all_departments =
    homeContentData?.["home-section-8-multi-departments"] || [];

  // Handle Empty Data
  if (
    !all_departments.length &&
    !department_section_sub_heading &&
    !department_section_heading
  )
    return null;

  return (
    <section
      id={sectionId}
      className="w-full py-[50px] bg-primary relative px-2 md:px-5"
    >
      <div className="w-full max-screen-width mx-auto">
        {/* Section Header */}
        {department_section_sub_heading || department_section_heading ? (
          <div className="flex flex-col items-center gap-2">
            {department_section_sub_heading ? (
              <h3 className="subtitle-2 md:subtitle-1 text-light-color secondary-font-family font-bold text-center">
                {department_section_sub_heading}
              </h3>
            ) : null}

            {department_section_heading ? (
              <h2
                className={`heading-3-1 md:heading-2 text-light-color primary-font-family font-bold text-center`}
              >
                {department_section_heading}
              </h2>
            ) : null}
            <span className="w-[100px] border border-light-color mt-2 md:mt-5" />
          </div>
        ) : null}

        {/* Department Details */}
        {all_departments.length > 0 ? (
          <DepartmentsContent
            departments={all_departments}
            filesList={filesList}
          />
        ) : null}
      </div>
    </section>
  );
};

export default DepartmentSection;
