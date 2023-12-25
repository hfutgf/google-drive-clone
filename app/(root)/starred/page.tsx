import SuggestCard from "@/components/card/suggest-card";
import Empty from "@/components/shared/empty";
import Header from "@/components/shared/header";
import ListItem from "@/components/shared/list-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { IFolderAndFile } from "@/types";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

const getData = async (uid: string, type: "folders" | "files") => {
  let data: any = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    where("isStar", "==", true)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

const Page = async () => {
  const { userId } = auth();

  const folders = await getData(userId as string, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Header label="Starred" />
      {[...folders, ...files].length === 0 ? (
        <Empty />
      ) : (
        <>
          <div className="text-sm opacity-70 mt-6">Suggested</div>
          {files.length === 0 ? (
            <Empty sm />
          ) : (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {files.map((file: IFolderAndFile) => (
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
                {folders.map((folder: IFolderAndFile) => (
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

export default Page;
