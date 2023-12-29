"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Clock5, Cloud, Loader, Plus, Star, Tablet, Trash } from "lucide-react";
import Link from "next/link";
import Items from "./item";
import { Progress } from "../ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverActions from "./popover-actions";
import { usePlan } from "@/hooks/use-plan";
import { useSubscription } from "@/hooks/use-subscription";
import { bytConverter } from "@/lib/utils";

const Sidebar = () => {
  const { onOpen } = usePlan();
  const { isLoading, subscription, totalStorage } = useSubscription();

  const storageVal =
    subscription === "Basic" ? 1500 * 1024 * 1024 : 15000 * 1024 * 1024;

  return (
    <div className="fixed min-h-[90vh] w-72 top-[10vh] z-30 left-0 bg-[#f6f9fc] dark:bg-[#1f1f1f] ">
      <div className="flex flex-col p-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-fit h-12 rounded-full px-6 dark:bg-white bg-slate-700">
              <Plus />
              <span>New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 py-2">
            <PopoverActions />
          </PopoverContent>
        </Popover>

        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <Items icon={link.icon} label={link.label} path={link.path} />
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mx-4">
            {isLoading ? (
              <div className="w-full flex justify-center">
                <Loader className="animate-spin text-muted-foreground w-4 h-4" />
              </div>
            ) : (
              <>
                <Progress
                  className="h-2"
                  value={(totalStorage * 100) / storageVal}
                />
                <span>
                  {bytConverter(totalStorage, 1)} of{" "}
                  {subscription === "Basic" ? "1.5 GB" : "15 GB"} used
                </span>
              </>
            )}

            <Button
              onClick={onOpen}
              className="rounded-full"
              variant={"outline"}
            >
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const sidebarLinks = [
  {
    label: "My drive",
    icon: Tablet,
    path: "/",
  },
  {
    label: "Starred",
    icon: Star,
    path: "/starred",
  },
  {
    label: "Recent",
    icon: Clock5,
    path: "/recent",
  },
  {
    label: "Trash",
    icon: Trash,
    path: "/trash",
  },
  {
    label: "Storage",
    icon: Cloud,
    path: "/cloud",
  },
];
