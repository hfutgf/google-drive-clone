"use client";
import { useSubscription } from "@/hooks/use-subscription";
import { db } from "@/lib/firebase";
import { IFolderAndFile, LayoutChildProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";

const SubscriptionProvider = ({ children }: LayoutChildProps) => {
  const { user, isLoaded } = useUser();
  const { setIsLoading, setSubsription, setTotalStorage } = useSubscription();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/subscription?email=${user?.emailAddresses[0].emailAddress}`
      );
      setSubsription(data);

      let files: any = [];
      const q = query(
        collection(db, "files"),
        where("uid", "==", user?.id),
        where("isArchive", "==", false)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        files.push({ ...doc.data(), id: doc.id });
      });

      const totalSize = files.reduce(
        (acc: number, b: IFolderAndFile) => acc + b.size,
        0
      );

      setTotalStorage(totalSize);

      setIsLoading(false);
    };
    if (isLoaded) {
      getData();
    }
  }, [user, isLoaded]);
  return children;
};

export default SubscriptionProvider;
