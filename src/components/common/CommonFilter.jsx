"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CommonFilter = ({ itemList = [], keyName = "", paramsKey = "" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = searchParams.get(paramsKey);

  if (itemList.length === 0 && !paramsKey) return null;

  const debouncedQuery = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query && query !== "none") {
        params.set(paramsKey, query);
      } else {
        params.delete(paramsKey);
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 250),
    [searchParams, router]
  );

  const handleQuery = (query) => {
    debouncedQuery(query);
  };

  const uniqueItemList = itemList.filter(
    (item, index, self) =>
      item?.[keyName] &&
      index === self.findIndex((i) => i[keyName] === item[keyName])
  );

  return (
    <Select value={value || ""} onValueChange={(value) => handleQuery(value)}>
      <SelectTrigger className="border font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
        <SelectValue placeholder={`Filter by ${paramsKey.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent
        className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
      >
        <SelectGroup>
          <SelectItem
            value="none"
            className={`font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer text-[12px]`}
          >
            None
          </SelectItem>
          {uniqueItemList.map(
            (item, index) =>
              item?.[keyName] && (
                <SelectItem
                  key={`${keyName.toLowerCase()}-${index + 1}`}
                  value={item[keyName]}
                  className={`text-[12px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer`}
                >
                  {item[keyName]}
                </SelectItem>
              )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CommonFilter;
