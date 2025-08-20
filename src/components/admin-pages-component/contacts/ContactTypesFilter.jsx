"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { debounce } from "lodash";
import { Filter } from "lucide-react";

const ContactTypesFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const types = useMemo(() => {
    return ["all", "branch", "kiosk"];
  }, []);

  useEffect(() => {
    const typeParams = searchParams.get("type");

    setType(typeParams);
  }, [searchParams]);

  const updateQueryParams = useCallback(
    debounce((newType) => {
      const params = new URLSearchParams(searchParams);

      if (newType) {
        params.set("type", newType);
      } else {
        params.delete("type");
      }

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleToggle = (type) => {
    let newType = "";

    if (type === "all") {
      newType = "";
    } else {
      newType = type;
    }

    setType(newType);
    updateQueryParams(newType);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${globalStyleObj.backgroundLight900Dark200} dark:border-[#fff]/10 px-2`}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={`w-56 p-2 ${globalStyleObj.backgroundLight900Dark200} dark:border-[#fff]/10 text-[10px] font-poppins-rg text-dark-weight-350 dark:text-light-weight-400 z-[99]`}
      >
        <DropdownMenuRadioGroup
          value={type || "all"}
          onValueChange={(value) => handleToggle(value)}
        >
          {types.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              className="w-full justify-start"
            >
              <span className="capitalize">{item}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContactTypesFilter;
