"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PaginationSection = ({ paginationDetails }) => {
  const [currentPage, setCurrentPage] = useState(
    paginationDetails.currentPage || 1
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    paginationDetails.currentLimit || 5
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = parseInt(
      searchParams.get("page") || paginationDetails.currentPage
    );
    const limit = parseInt(
      searchParams.get("pageSize") || paginationDetails.currentLimit
    );

    setCurrentPage(page);
    setRowsPerPage(limit);
  }, [searchParams, paginationDetails]);

  // Debounced function for page change
  const debouncedPageChange = useCallback(
    debounce((page, limit) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      params.set("pageSize", limit);
      router.push(`?${params.toString()}`, undefined, { shallow: true });
    }, 250),
    [searchParams, router]
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > paginationDetails.totalPages) return;

    setCurrentPage(pageNumber);
    debouncedPageChange(pageNumber, rowsPerPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset to page 1 when rows per page changes
    debouncedPageChange(1, value);
  };

  const renderPageNumbers = () => {
    const maxButtons = 4;
    const startPageIndex = Math.max(1, currentPage - 3);
    const endPageIndex = Math.min(
      startPageIndex + maxButtons - 1,
      paginationDetails.totalPages
    );

    let buttons = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex <= endPageIndex;
      pageIndex++
    ) {
      buttons.push(
        <PaginationItem
          key={pageIndex}
          className={`hidden md:block ltr:mr-2 rtl:ml-2`}
        >
          <PaginationLink
            onClick={() => handlePageChange(pageIndex)}
            isActive={pageIndex === currentPage}
            className={`
                ${
                  pageIndex === currentPage
                    ? "bg-primary text-light-color border border-secondary"
                    : "text-primary border border-primary"
                } cursor-pointer body2 secondary-font-family`}
          >
            {pageIndex}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return buttons;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} bg-secondary body2 secondary-font-family text-light-color ltr:mr-2 rtl:ml-2`}
            />
          </PaginationItem>
          {(renderPageNumbers() || []).map((button, index) => button)}
          {paginationDetails.totalPages > 4 &&
            currentPage < paginationDetails.totalPages && (
              <PaginationItem className="hidden md:block">
                <PaginationEllipsis />
              </PaginationItem>
            )}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationDetails.totalPages}
              className={`${currentPage === paginationDetails.totalPages ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} bg-secondary body2 secondary-font-family text-light-color`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationSection;
