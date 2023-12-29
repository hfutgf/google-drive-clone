"use client";
import React, { useEffect } from "react";
import { Progress } from "../ui/progress";
import { bytConverter } from "@/lib/utils";
import { useSubscription } from "@/hooks/use-subscription";

interface Props {
  totalSize: number;
}

const Storage = ({ totalSize }: Props) => {
  const { subscription, totalStorage } = useSubscription();
  const storageVal =
    subscription === "Basic" ? 1500 * 1024 * 1024 : 15000 * 1024 * 1024;

  return (
    <div className="mt-4">
      <div className="flex items-end space-x-1">
        <div className="text-4xl">{bytConverter(totalSize, 1)}</div>
        <div className="opacity-75">
          of {subscription === "Basic" ? "1.5 GB" : "15 GB"} used
        </div>
      </div>
      <Progress className="mt-4" value={(totalStorage * 100) / storageVal} />
    </div>
  );
};

export default Storage;
