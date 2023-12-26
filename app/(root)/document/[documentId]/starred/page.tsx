import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/shared/header";
import { DoctIdProps, IFolderAndFile } from "@/types";
import { auth } from "@clerk/nextjs";
import Empty from "@/components/shared/empty";
import SuggestCard from "@/components/card/suggest-card";

const getFiles = async (folderId: string, uid: string | null) => {
  let data: any = [];
  const q = query(
    collection(db, "folders", folderId, "files"),
    where("uid", "==", uid),
    where("isStar", "==", true),
    where("isArchive", "==", false)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

const Page = async ({ params }: DoctIdProps) => {
  const { userId } = auth();
  const files = await getFiles(params.documentId, userId);
  return (
    <>
      <Header label="Starred" isDocumentPage isHome={false} />
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
    </>
  );
};

export default Page;
