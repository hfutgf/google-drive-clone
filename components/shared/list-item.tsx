"use client";

import React, { ElementRef, useRef, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { IFolderAndFile } from "@/types";
import { File, Folder, Minus, Save, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "../ui/avatar";
import { bytConverter } from "@/lib/utils";
import ListAction from "./list-action";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

interface Props {
  item: IFolderAndFile;
}

const ListItem = ({ item }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.name);
  const { user } = useUser();

  const inputRef = useRef<ElementRef<"input">>(null);

  const { refresh, push } = useRouter();

  const date = new Date(item.timestamp.seconds * 1000);

  const onStartEditing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, value.length);
    }, 0);
  };

  const onSave = () => {
    const type = item.size ? "files" : "folders";
    const ref = doc(db, type, item.id);
    let promise;
    if (type === "files") {
      const t = item.name.split(".")[1];
      promise = setDoc(ref, {
        ...item,
        name: value + "." + t,
      }).then(() => {
        refresh();
        setIsEditing(false);
      });
    } else {
      promise = setDoc(ref, {
        ...item,
        name: value,
      }).then(() => {
        refresh();
        setIsEditing(false);
      });
    }

    toast.promise(promise, {
      loading: "Loading...",
      success: "Editing in successfully!",
      error: "Editing on error.",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <TableRow
      className="group cursor-pointer"
      onClick={() => !item.size && push(`/document/${item.id}`)}
    >
      <TableCell className="font-medium">
        {!isEditing ? (
          <div
            className="flex items-center space-x-1 "
            role="button"
            onDoubleClick={onStartEditing}
          >
            {item.size ? (
              <File className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
            )}
            <span>{item.name}</span>
          </div>
        ) : (
          <>
            <div className="relative">
              <Input
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={inputRef}
                onKeyDown={onKeyDown}
              />
              <div className="absolute right-0 top-0 h-full flex items-center space-x-1">
                <Button
                  className="h-full"
                  size={"sm"}
                  variant={"outline"}
                  onClick={onSave}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  className="h-full"
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => setIsEditing(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
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
        <ListAction item={item} onStartEditing={onStartEditing} />
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
