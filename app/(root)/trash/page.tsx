import Empty from "@/components/shared/empty";
import Header from "@/components/shared/header";
import TrashItem from "@/components/shared/trash-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React from "react";

const getData = async (uid: string, type: "folders" | "files") => {
  let data: any = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", true)
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
      <Header label="Recent" />
      {[...folders, ...files].length === 0 ? (
        <Empty />
      ) : (
        <Table className="mt-4 dark:text-white text-black">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Archived time</TableHead>
              <TableHead>File size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...folders, ...files].map((folder) => (
              <TrashItem key={folder.id} item={folder} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Page;
