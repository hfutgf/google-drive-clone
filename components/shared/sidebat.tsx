import React from "react";
import { Button } from "../ui/button";
import { Clock5, Cloud, Plus, Star, Tablet, Trash } from "lucide-react";
import Link from "next/link";
import Items from "./item";
import { Progress } from "../ui/progress";

const Sidebar = () => {
  return (
    <div className="fixed min-h-[90vh] w-72 top-[10vh] z-30 left-0 bg-[#f6f9fc] dark:bg-[#1f1f1f] border-r">
      <div className="flex flex-col p-3">
        <Button className="w-fit h-12 rounded-full px-6 dark:bg-white bg-slate-700">
          <Plus />
          <span>New</span>
        </Button>
        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <Items icon={link.icon} label={link.label} />
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mx-4">
            <Progress className="h-2" value={30} />
            <span>20 MB of 1.0 GB used</span>

            <Button className="rounded-full" variant={"outline"}>
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
