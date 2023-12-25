"use client";
import { IFolderAndFile } from "@/types";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ListItem from "./list-item";
import { useLayout } from "@/hooks/use-layout";
import SuggestCard from "../card/suggest-card";
import Empty from "./empty";

interface Props {
  folders: IFolderAndFile[];
  files: IFolderAndFile[];
}

const Lists = ({ files, folders }: Props) => {
  const { layout } = useLayout();
  return layout === "list" ? (
    <>
      {[...files, ...folders].length === 0 ? (
        <Empty />
      ) : (
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
      )}
    </>
  ) : (
    <>
      {[...folders, ...files].length === 0 ? (
        <Empty />
      ) : (
        <>
          <div className="text-sm opacity-70 mt-6">Suggested</div>

          {files.length === 0 ? (
            <Empty sm />
          ) : (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {files.map((file) => (
                <SuggestCard key={file.id} item={file} />
              ))}
            </div>
          )}

          <div className="text-sm opacity-70 mt-6">Folders</div>
          {folders.length === 0 ? (
            <Empty sm />
          ) : (
            <Table className="mt-4 dark:text-white text-black">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>File size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {folders.map((folder) => (
                  <ListItem key={folder.id} item={folder} />
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default Lists;
