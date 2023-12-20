import Header from "@/components/shared/header";
import Lists from "@/components/shared/lists";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

const HomePage = async () => {
  const getData = async (uid: string, type: "folders" | "files") => {
    let data: any = [];
    const q = query(
      collection(db, type),
      where("uid", "==", uid),
      where("isArchive", "==", false)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  };

  const { userId } = auth();

  const folders = await getData(userId as string, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Header label="My drive" isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </>
  );
};

export default HomePage;
