"use client";

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

import {
  deletePerticularNewsArticle,
  togglePerticularNewsArticleActiveStatus,
  togglePerticularNewsArticleFeaturedStatus,
} from "@/actions/apiClientActions/news/articles";
import { globalStyleObj } from "@/app/assets/styles";
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

const AllBlogPostsList = ({
  userId,
  data,
  paginationDetails,
  tableColumns = [],
  search,
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
            {data.map((eachPost, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachPost._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>

                  {/* Date */}
                  <TableCell
                    className={`font-poppins-md ${eachPost.is_active ? "" : "line-through opacity-50"} hidden sm:table-cell`}
                  >
                    {useFormatISODate(eachPost.updatedAt)}
                  </TableCell>

                  {/* Banner Image */}
                  <TableCell>
                    <div
                      className={`w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative ${eachPost.is_active ? "" : "opacity-50"} border dark:border-[#fff]/10`}
                    >
                      {eachPost.banner_image &&
                      eachPost.banner_image.fileType.startsWith(
                        "image/svg+xml"
                      ) ? (
                        <SVGBannerImage
                          bannerUrl={getImageFullUrl(
                            eachPost.banner_image.fileUrl
                          )}
                        />
                      ) : (
                        <Image
                          src={
                            eachPost.banner_image
                              ? getImageFullUrl(eachPost.banner_image.fileUrl)
                              : "/assets/error400-cover.png"
                          }
                          alt={
                            eachPost.banner_image
                              ? eachPost.banner_image.fileName
                              : "not-found"
                          }
                          fill
                          sizes="(max-width: 576px) 100px, 150px"
                          loading="lazy"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>

                  {/* Title */}
                  <TableCell
                    className={`${eachPost.is_active ? "" : "line-through opacity-50"}`}
                  >
                    {(eachPost.title || "Anonymous").length > 35
                      ? eachPost.title.slice(0, 35) + "..." || "Anonymous"
                      : eachPost.title || "Anonymous"}
                  </TableCell>

                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
                    PERMISSIONS.NEWS.DELETE_NEWS_ARTICLE,
                    PERMISSIONS.NEWS.TOGGLE_ACTIVE_NEWS_ARTICLE,
                    PERMISSIONS.NEWS.TOGGLE_FEATURED_NEWS_ARTICLE,
                  ]) && (
                    <TableCell className="text-right">
                      <DropdownMenu modal={false}>
                        {/* Tigger Button */}
                        <DropdownMenuTrigger>
                          <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
                            <ListFilterPlus className="size-[16px]" />
                          </div>
                        </DropdownMenuTrigger>

                        {/* Tigger Content */}
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
                            PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Edit</span>
                              <Link
                                href={`${ROUTES.ADMIN_UPDATE_NEWS_ARTICLE}/${eachPost._id}?slug=${eachPost.slug}`}
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
                            PERMISSIONS.NEWS.DELETE_NEWS_ARTICLE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Delete</span>
                              <DeleteButton
                                args={[
                                  userId,
                                  eachPost?.slug || "",
                                  eachPost._id,
                                ]}
                                targetType="article"
                                targetName={eachPost?.title || "Unknown"}
                                apiCallback={deletePerticularNewsArticle}
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Active Status Toggle Switch */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.NEWS.TOGGLE_ACTIVE_NEWS_ARTICLE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Active</span>
                              <SwitchButton
                                args={[
                                  userId,
                                  eachPost?.slug || "",
                                  eachPost._id,
                                ]}
                                status={eachPost.is_active}
                                apiCallback={
                                  togglePerticularNewsArticleActiveStatus
                                }
                              />
                            </DropdownMenuItem>
                          )}

                          {/* Featured Status Toggle Button */}
                          {useUIPermissionCheck(
                            adminRole,
                            permissionsList,
                            PERMISSIONS.NEWS.TOGGLE_FEATURED_NEWS_ARTICLE
                          ) && (
                            <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                              <span>Featured</span>
                              <SwitchButton
                                args={[
                                  userId,
                                  eachPost?.slug || "",
                                  eachPost._id,
                                ]}
                                status={eachPost.is_featured}
                                apiCallback={
                                  togglePerticularNewsArticleFeaturedStatus
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

export default AllBlogPostsList;
