import { Timestamp } from "firebase/firestore";
import React from "react";

export interface LayoutChildProps {
  children: React.ReactNode;
}

export interface IFolderAndFile {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  image: string;
  type: string;
  size: number;
  isStar: boolean;
  archivedTime: string;
}

export interface DoctIdProps {
  params: {
    documentId: string;
  };
}
