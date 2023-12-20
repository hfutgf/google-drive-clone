import { IFolderAndFile } from "@/types";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ListItem from "./list-item";

interface Props {
  folders: IFolderAndFile[];
  files: IFolderAndFile[];
}

const Lists = ({ files, folders }: Props) => {
  return (
    <Table className="mt-4 dark:text-white text-black">
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>File size</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...folders, ...files].map((folder) => (
          <ListItem key={folder.id} item={folder} />
        ))}
      </TableBody>
    </Table>
  );
};

export default Lists;
