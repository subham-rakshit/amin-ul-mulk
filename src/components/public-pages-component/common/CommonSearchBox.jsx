"use client";

import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const CommonSearchBox = ({ search }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const currentQuery = searchParams.get("search");
    if (currentQuery) {
      setSearchQuery(currentQuery);
    }
  }, [searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="w-full max-w-[366px] px-[16px] rounded-[14px] border border-[#DFE1E6] flex items-center bg-white">
      <Search className="size-[20px] text-[#737373]" />

      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="text-[16px] text-[#737373] font-candara-rg tracking-[-2%] py-[12px] border-none outline-none focus:ring-0 focus:border-none focus:outline-none bg-transparent"
      />
    </div>
  );
};

export default CommonSearchBox;
