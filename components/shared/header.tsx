"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ArrowLeft,
  ChevronDown,
  Info,
  LayoutPanelTop,
  TableProperties,
} from "lucide-react";
import PopoverActions from "./popover-actions";
import { useLayout } from "@/hooks/use-layout";
import { useRouter } from "next/navigation";

interface Props {
  label: string;
  isHome?: boolean;
  isDocument?: boolean;
  isDocumentPage?: boolean;
}

const Header = ({ label, isHome, isDocument, isDocumentPage }: Props) => {
  const { setLayout, layout } = useLayout();
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <>
          <Popover>
            <PopoverTrigger className="flex justify-start">
              <div className="px-4 py-2 hover:bg-secondary transition rounded-full flex items-center space-x-2">
                <h2 className="text-xl text-black dark:text-white capitalize">
                  {label}
                </h2>
                <ChevronDown />
              </div>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-2">
              <PopoverActions />
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <>
          {isDocumentPage ? (
            <div className="flex items-center  space-x-2">
              <ArrowLeft
                size={24}
                onClick={() => router.back()}
                className="cursor-pointer hover:opacity-70 transition "
              />
              <div className="text-xl text-black dark:text-white ">{label}</div>
            </div>
          ) : (
            <div className="text-xl text-black dark:text-white ">{label}</div>
          )}
        </>
      )}

      {isHome && !isDocument && (
        <div className="flex items-center space-x-2">
          {layout === "list" ? (
            <div
              className="p-2 hover:bg-secondary rounded-full transition"
              role="button"
              onClick={() => setLayout("grid")}
            >
              <TableProperties className="text-black dark:text-white  w-5 h-5" />
            </div>
          ) : (
            <div
              className="p-2 hover:bg-secondary rounded-full transition"
              role="button"
              onClick={() => setLayout("list")}
            >
              <LayoutPanelTop className=" text-black dark:text-white w-5 h-5" />
            </div>
          )}
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <Info className=" text-black dark:text-white w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
