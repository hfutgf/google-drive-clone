"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { IFolderAndFile } from "@/types";
import { File, Folder, Minus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "../ui/avatar";
import { bytConverter } from "@/lib/utils";
import ListAction from "./list-action";
import moment from "moment";

interface Props {
  item: IFolderAndFile;
}

const ListItem = ({ item }: Props) => {
  const { user } = useUser();

  const date = new Date(item.timestamp.seconds * 1000);

  return (
    <TableRow className="group">
      <TableCell className="group cursor-pointer">
        <div className="flex items-center space-x-1" role="button">
          {item.size ? (
            <File className="w-4 h-4 text-blue-400" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <span className="opacity-75">me</span>
      </TableCell>
      <TableCell>{moment(date).format("MMM DD, YYYY")}</TableCell>
      <TableCell className="mx-auto">
        {item.size ? bytConverter(item.size) : <Minus />}
      </TableCell>
      <TableCell className="flex justify-end  items-center space-x-2">
        <ListAction item={item} />
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
