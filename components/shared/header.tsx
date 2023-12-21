"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ChevronDown,
  Info,
  LayoutPanelTop,
  TableProperties,
} from "lucide-react";
import PopoverActions from "./popover-actions";
import { useLayout } from "@/hooks/use-layout";

interface Props {
  label: string;
  isHome?: boolean;
}

const Header = ({ label, isHome }: Props) => {
  const { setLayout, layout } = useLayout();
  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <>
          <Popover>
            <PopoverTrigger className="flex justify-start">
              <div className="px-4 py-2 hover:bg-secondary transition rounded-full flex items-center space-x-2">
                <h2 className="text-xl text-black dark:text-white ">{label}</h2>
                <ChevronDown />
              </div>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-2">
              <PopoverActions />
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <div className="text-xl text-black dark:text-white ">{label}</div>
      )}

      {isHome && (
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
