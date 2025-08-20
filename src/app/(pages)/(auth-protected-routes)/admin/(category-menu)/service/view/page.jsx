import { fetchAllServicesPageData } from "@/actions/pageDataActions";
import { servicesTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  PostFilterDropdown,
  SearchInputField,
  ServicesListingTable,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all services page
export const metadata = {
  title: titlesObject.allServices.title,
};

const AllNewsArticlesPage = async ({ searchParams }) => {
  // Fetch necessary data for all services
  const {
    servicesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllServicesPageData(
    searchParams,
    PERMISSIONS.SERVICE.VIEW_ALL_SERVICES
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when services retrieval fails
  if (!servicesResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Services" mainParentTab="Service Management" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={servicesResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Services" mainParentTab="Service Management" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div
          className={`flex flex-col md:flex-row md:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            {/* Search Input Field */}
            <SearchInputField />

            <div className="flex items-center gap-1">
              {/* Post Filter Dropdown */}
              <PostFilterDropdown />
            </div>
          </div>

          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.SERVICE.ADD_SERVICE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_SERVICE}
              text="Add Service"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(servicesResponse?.fetchData || []).length > 0 ? (
          <>
            {/* All Services List */}
            <ServicesListingTable
              userId={userId}
              data={servicesResponse?.fetchData || []}
              paginationDetails={servicesResponse?.paginationData || {}}
              tableColumns={servicesTableColumns}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </>
        ) : (
          <>
            {/* No Services Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Services"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first service to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Service
                </span>{" "}
                button.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllNewsArticlesPage;
