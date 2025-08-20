import {
  deletePerticularCasePackage,
  togglePerticularCasePackageActiveStatus,
  togglePerticularCasePackageFeaturedStatus,
} from "@/actions/apiClientActions/case-package";
import { globalStyleObj } from "@/app/assets/styles";
import { DeleteButton, PaginationComponent, SwitchButton } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import {
  useFormatISODate,
  useGroupUIPermissionCheck,
  useUIPermissionCheck,
} from "@/lib/hooks";
import { ListFilterPlus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { RiEditBoxLine } from "react-icons/ri";

const CasePackageListingTable = ({
  userId,
  data,
  paginationDetails,
  tableColumns = [],
  adminRole,
  permissionsList,
}) => {
  const columns = useMemo(() => tableColumns, []);

  return (
    <>
      <div className="mx-3 mt-3 border rounded-sm dark:border-[#fff]/10">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => {
                if (
                  useGroupUIPermissionCheck(
                    adminRole,
                    permissionsList,
                    column.requirePermissionList
                  )
                ) {
                  return (
                    <TableHead
                      key={`${column.name}-${index + 1}`}
                      className={`${column.class} font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800`}
                    >
                      {column.name}
                    </TableHead>
                  );
                }
              })}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
            {data.map((each, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={each._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>

                  {/* Date */}
                  <TableCell
                    className={`font-poppins-md ${each.is_active ? "" : "line-through opacity-50"} hidden sm:table-cell`}
                  >
                    {useFormatISODate(each.updatedAt)}
                  </TableCell>

                  {/* Name */}
                  <TableCell
                    className={`${each.is_active ? "" : "line-through opacity-50"}`}
                  >
                    {each?.case_package_name || "Anonymous"}
                  </TableCell>

                  {/* Price */}
                  <TableCell
                    className={`${each.is_active ? "" : "line-through opacity-50"}`}
                  >
                    {each?.package_price || "0"}
                  </TableCell>

                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    PERMISSIONS.CASE_PACKAGE.EDIT_CASE_PACKAGE,
                    PERMISSIONS.CASE_PACKAGE.DELETE_CASE_PACKAGE,
                    PERMISSIONS.CASE_PACKAGE.TOGGLE_ACTIVE_CASE_PACKAGE,
                    PERMISSIONS.CASE_PACKAGE.TOGGLE_FEATURED_CASE_PACKAGE,
                  ]) && (
                    <TableCell className="text-right">
                      <DropdownMenu modal={false}>
                        {/* Tigger Btn */}
                        <DropdownMenuTrigger>
                          <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
                            <ListFilterPlus className="size-[16px]" />
                          </div>
                        </DropdownMenuTrigger>

                        {/* Actions Menu */}
                        <DropdownMenuContent
                          align="end"
                          className={`${globalStyleObj.backgroundLight900Dark200} border dark:border-[#fff]/10 font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 min-w-[150px]`}
                        >
                          <DropdownMenuLabel className="dark:text-light-weight-800 tracking-wider text-[13px]">
                            Actions
                          </DropdownMenuLabel>

                          <DropdownMenuSeparator />
                          {/* Edit Section */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.CASE_PACKAGE.EDIT_CASE_PACKAGE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Edit</span>
                              <Link
                                href={`${ROUTES.ADMIN_UPDATE_CASE_PACKAGE}/${each._id}?slug=${each.slug}`}
                                className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                              >
                                <RiEditBoxLine size={12} />
                              </Link>
                            </DropdownMenuItem>
                          )}

                          {/* Delete Section */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.CASE_PACKAGE.DELETE_CASE_PACKAGE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Delete</span>
                              <DeleteButton
                                args={[userId, each?.slug || "", each._id]}
                                targetType="package"
                                targetName={
                                  each?.case_package_name || "Unknown"
                                }
                                apiCallback={deletePerticularCasePackage}
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Active Status Toggle Switch */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.CASE_PACKAGE.TOGGLE_ACTIVE_CASE_PACKAGE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Active</span>
                              <SwitchButton
                                args={[userId, each?.slug || "", each._id]}
                                status={each.is_active}
                                apiCallback={
                                  togglePerticularCasePackageActiveStatus
                                }
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Featured Status Toggle Button */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.CASE_PACKAGE
                              .TOGGLE_FEATURED_CASE_PACKAGE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Featured</span>
                              <SwitchButton
                                args={[userId, each?.slug || "", each._id]}
                                status={each.is_featured}
                                apiCallback={
                                  togglePerticularCasePackageFeaturedStatus
                                }
                              />
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {paginationDetails.totalItemsCount > paginationDetails.currentLimit && (
        <div className="mt-5 px-3 flex items-center gap-2">
          <PaginationComponent paginationDetails={paginationDetails} />
        </div>
      )}
    </>
  );
};

export default CasePackageListingTable;
