import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  icon: LucideIcon;
  label: string;
  path?: string;
}

const Item = ({ icon: Icon, label, path }: Props) => {
  return (
    <div className="flex items-center transition hover:bg-secondary  rounded-full px-4 py-2  cursor-pointer">
      <Icon width={20} height={20} className="w-5 h-5" />
      <span className="pl-2 text-md opacity-75">{label}</span>
    </div>
  );
};

export default Item;
