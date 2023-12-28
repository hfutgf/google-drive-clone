import React from "react";
import { Progress } from "../ui/progress";
import { bytConverter } from "@/lib/utils";

interface Props {
  totalSize: number;
}

const Storage = ({ totalSize }: Props) => {

  return (
    <div className="mt-4">
      <div className="flex items-end space-x-1">
        <div className="text-4xl">{bytConverter(totalSize, 1)}</div>
        <div className="opacity-75">of 1.5 GB used</div>
      </div>
      <Progress className="mt-4" value={1} />
    </div>
  );
};

export default Storage;
