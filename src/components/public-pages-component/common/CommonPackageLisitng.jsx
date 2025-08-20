import { getAllPublicPackages } from "@/actions/frontEndActions/action";
import { useFilterFeaturedItems } from "@/lib/hooks";
import { BackgroundRevealButton, PaginationSection } from "..";
import Image from "next/image";
import { getImageFullUrl } from "@/utils/helper-functions";

const CommonPackageLisitng = async ({
  filesList = [],
  currentLanguage = "en",
  paginationData = {},
  isListingPage = false,
}) => {
  // Fetch packages nessary data
  const packagesResponse = await getAllPublicPackages(
    paginationData?.page || 0,
    paginationData?.pageSize || 0
  );

  // Updated Packages Based On Featured Status When Non Listing Page Call
  const packages = isListingPage
    ? packagesResponse?.fetchData || []
    : useFilterFeaturedItems(packagesResponse?.fetchData || [], "is_featured");
  const paginationDetails = packagesResponse?.paginationData || {};

  // Handle Empty Data
  if (!packages || !packages.length) {
    return null;
  }

  return (
    <>
      <ul className="w-full relative z-[99] flex flex-col md:flex-row md:flex-wrap md:justify-between gap-5 py-5 md:py-10">
        {packages.map((pkg, index) => (
          <li
            key={pkg?._id || `pkg-${index + 1}`}
            className="w-full md:max-w-[32%] bg-light border-t-[2px] border-b-[10px] border-[#a2790d50] hover:border-secondary rounded-[24px] px-5 py-5 flex flex-col items-center gap-5 group transition-all duration-500 ease-in-out shadow-card-custom-small"
          >
            {/* Package Name */}
            {pkg?.case_package_name?.[currentLanguage] && (
              <span className="subtitle-2 text-light-color secondary-font-family font-normal bg-secondary group-hover:bg-primary px-10 py-2 rounded-[50px] transition-all duration-500 ease-in-out">
                {pkg.case_package_name[currentLanguage]}
              </span>
            )}

            {/* Package Price & Billing Cycle */}
            {pkg?.package_price?.[currentLanguage] ||
            pkg?.billing_cycle?.[currentLanguage] ? (
              <div className="size-[180px] bg-secondary group-hover:bg-primary rounded-full flex flex-col justify-center items-center gap-2 shadow-custom-three-sides transition-all duration-500 ease-in-out">
                {pkg?.package_price?.[currentLanguage] && (
                  <span className="ltr:heading-1 rtl:heading-2 text-light-color primary-font-family font-bold transition-all duration-500 ease-in-out">
                    {pkg.package_price[currentLanguage]}
                  </span>
                )}
                {pkg?.billing_cycle?.[currentLanguage] && (
                  <span className="body1 text-light-color secondary-font-family font-normal transition-all duration-500 ease-in-out">
                    {pkg.billing_cycle[currentLanguage]}
                  </span>
                )}
              </div>
            ) : null}

            {/* Package Features */}
            {pkg?.package_features?.[currentLanguage]?.labels?.length > 0 ? (
              <ul className="w-full flex flex-col items-start">
                {pkg.package_features[currentLanguage].labels.map(
                  (feature, index) => (
                    <li
                      key={index}
                      className="w-full body-0-1 text-dark-color group-hover:text-primary secondary-font-family font-normal flex items-center gap-2 border-b py-3"
                    >
                      {pkg?.features_icon?.fileUrl && (
                        <div className="w-[20px] h-[20px] rounded-full bg-secondary group-hover:bg-primary overflow-hidden relative flex items-center justify-center">
                          <Image
                            src={getImageFullUrl(pkg.features_icon.fileUrl)}
                            alt={pkg.case_package_name[currentLanguage]}
                            fill
                            sizes="(max-width: 767px) 50px, 20px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      {feature}
                    </li>
                  )
                )}
              </ul>
            ) : null}

            <div className="mt-auto">
              {/* {pkg?.details_button_label?.[currentLanguage] && (
                <div className="w-fit">
                  <BackgroundRevealButton
                    href="#"
                    label={pkg.details_button_label[currentLanguage]}
                    bgColor="bg-secondary"
                    textColor="text-light-color"
                    textHoverColor="group-hover:text-light-color"
                    hoverBgColor="group-hover:bg-primary"
                    className="w-fit px-4 py-[10px] mt-auto"
                  />
                </div>
              )} */}

              {pkg?.selection_button_label?.[currentLanguage] && (
                <div className="w-fit mt-2">
                  <BackgroundRevealButton
                    href="#"
                    label={pkg.selection_button_label[currentLanguage]}
                    bgColor="bg-secondary"
                    textColor="text-light-color"
                    textHoverColor="group-hover:text-light-color"
                    hoverBgColor="group-hover:bg-primary"
                    className="w-fit px-4 py-[10px] mt-auto"
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {paginationDetails?.totalItemsCount > paginationDetails?.currentLimit && (
        <div className="w-full mt-10">
          <PaginationSection paginationDetails={paginationDetails} />
        </div>
      )}
    </>
  );
};

export default CommonPackageLisitng;
