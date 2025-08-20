"use client";

import {
  deletePerticularTestimonial,
  togglePerticularTestimonialActiveStatus,
} from "@/actions/apiClientActions/testimonila";
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
import { useGroupUIPermissionCheck, useUIPermissionCheck } from "@/lib/hooks";
import { ListFilterPlus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { RiEditBoxLine } from "react-icons/ri";

const TestimonialLists = ({
  userId,
  data,
  paginationDetails,
  tableColumns = [],
  permissionItems,
  editRoute = "#",
  targetType = "none",
  actionFunctions,
  adminRole,
  permissionsList,
}) => {
  const columns = useMemo(() => tableColumns, []);

  return (
    <>
      <div className="mx-3 mt-3 border rounded-sm dark:border-[#fff]/10">
        <Table>
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
          <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
            {data.map((eachTestimonial, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachTestimonial._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>

                  {/* Name */}
                  <TableCell
                    className={`${eachTestimonial.is_active ? "" : "line-through opacity-50"}`}
                  >
                    {(eachTestimonial.name?.en || "Anonymous").length > 25
                      ? eachTestimonial.name?.en.slice(0, 25) + "..." ||
                        "Anonymous"
                      : eachTestimonial.name?.en || "Anonymous"}
                  </TableCell>

                  {/* Message */}
                  <TableCell
                    className={`${eachTestimonial.is_active ? "" : "line-through opacity-50"}`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          eachTestimonial?.message?.length > 50
                            ? eachTestimonial?.message?.en?.slice(0, 50) + "..."
                            : eachTestimonial?.message?.en || "",
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL,
                    PERMISSIONS.TESTIMONIAL.DELETE_TESTIMONIAL,
                    PERMISSIONS.TESTIMONIAL.TOGGLE_ACTIVE_TESTIMONIAL,
                  ]) && (
                    <TableCell className="text-right">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                          <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
                            <ListFilterPlus className="size-[16px]" />
                          </div>
                        </DropdownMenuTrigger>
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
                            PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Edit</span>
                              <Link
                                href={`${ROUTES.ADMIN_UPDATE_TESTIMONIAL}/${eachTestimonial._id}`}
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
                            PERMISSIONS.TESTIMONIAL.DELETE_TESTIMONIAL
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Delete</span>
                              <DeleteButton
                                args={[
                                  userId,
                                  eachTestimonial?.slug || "",
                                  eachTestimonial._id,
                                ]}
                                targetType="testimonial"
                                targetName={eachTestimonial?.name?.en || ""}
                                apiCallback={deletePerticularTestimonial}
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Active Status Toggle Switch */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.TESTIMONIAL.TOGGLE_ACTIVE_TESTIMONIAL
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Active</span>
                              <SwitchButton
                                args={[
                                  userId,
                                  eachTestimonial?.slug || "",
                                  eachTestimonial._id,
                                ]}
                                status={eachTestimonial.is_active}
                                apiCallback={
                                  togglePerticularTestimonialActiveStatus
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

export default TestimonialLists;
