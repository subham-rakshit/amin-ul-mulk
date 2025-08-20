import {
  deletePerticularService,
  togglePerticularServiceActiveStatus,
  togglePerticularServiceFeaturedStatus,
} from "@/actions/apiClientActions/services";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DeleteButton,
  PaginationComponent,
  SVGBannerImage,
  SwitchButton,
} from "@/components";
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
import { getImageFullUrl } from "@/utils/helper-functions";
import { ListFilterPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { RiEditBoxLine } from "react-icons/ri";

const ServicesListingTable = ({
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

                  {/* Banner Image */}
                  <TableCell>
                    <div
                      className={`w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative ${each.is_active ? "" : "opacity-50"} border dark:border-[#fff]/10`}
                    >
                      {each.banner_image &&
                      each.banner_image.fileType.startsWith("image/svg+xml") ? (
                        <SVGBannerImage
                          bannerUrl={getImageFullUrl(each.banner_image.fileUrl)}
                        />
                      ) : (
                        <Image
                          src={
                            each.banner_image
                              ? getImageFullUrl(each.banner_image.fileUrl)
                              : "/assets/error400-cover.png"
                          }
                          alt={
                            each.banner_image
                              ? each.banner_image.fileName
                              : "iamge"
                          }
                          fill
                          sizes="(max-width: 576px) 100px, 150px"
                          loading="lazy"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>

                  {/* Name */}
                  <TableCell
                    className={`${each.is_active ? "" : "line-through opacity-50"}`}
                  >
                    {(each?.service_name || "Anonymous")?.length > 50
                      ? each?.service_name?.slice(0, 50) + "..." || "Anonymous"
                      : each?.service_name || "Anonymous"}
                  </TableCell>

                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    PERMISSIONS.SERVICE.EDIT_SERVICE,
                    PERMISSIONS.SERVICE.DELETE_SERVICE,
                    PERMISSIONS.SERVICE.TOGGLE_ACTIVE_SERVICE,
                    PERMISSIONS.SERVICE.TOGGLE_FEATURED_SERVICE,
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
                            PERMISSIONS.SERVICE.EDIT_SERVICE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Edit</span>
                              <Link
                                href={`${ROUTES.ADMIN_UPDATE_SERVICE}/${each._id}?slug=${each.slug}`}
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
                            PERMISSIONS.SERVICE.DELETE_SERVICE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Delete</span>
                              <DeleteButton
                                args={[userId, each?.slug || "", each._id]}
                                targetType="service"
                                targetName={each?.service_name || "Unknown"}
                                apiCallback={deletePerticularService}
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Active Status Toggle Switch */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.SERVICE.TOGGLE_ACTIVE_SERVICE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Active</span>
                              <SwitchButton
                                args={[userId, each?.slug || "", each._id]}
                                status={each.is_active}
                                apiCallback={
                                  togglePerticularServiceActiveStatus
                                }
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Featured Status Toggle Button */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.SERVICE.TOGGLE_FEATURED_SERVICE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Featured</span>
                              <SwitchButton
                                args={[userId, each?.slug || "", each._id]}
                                status={each.is_featured}
                                apiCallback={
                                  togglePerticularServiceFeaturedStatus
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

export default ServicesListingTable;
