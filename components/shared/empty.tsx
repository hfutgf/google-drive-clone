import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  sm?: boolean;
}

const Empty = ({ sm }: Props) => {
  return (
    <div className={cn("flex justify-center w-full flex-col space-y-2")}>
      <Image
        src={"/images/notfound.webp"}
        alt="notfound-image"
        width={sm ? 200 : 300}
        height={300}
        className="mx-auto"
      />
      <h1 className="text-center text-2xl font-[700]">Empty</h1>
      <p className="text-center text-gray-500">
        There is nothing here. Please check again.
      </p>
    </div>
  );
};

export default Empty;
