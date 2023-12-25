"use client";
import { IFolderAndFile } from "@/types";
import React from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import moment from "moment";
import { File, Folder, Minus, MoreVertical, Trash2, Undo } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import { bytConverter } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ConfirModal from "../modals/confirm-modal";
import { deleteObject, ref } from "firebase/storage";

interface Props {
  item: IFolderAndFile;
}

const TrashItem = ({ item }: Props) => {
  const type = item.size ? "files" : "folders";


  const { refresh } = useRouter();

  const onRestore = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    const ref = doc(db, type, item.id);
    const promise = setDoc(ref, {
      ...item,
      isArchive: false,
      isStar: false,
      archivedTime: "File restored!",
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Restored!",
      error: "Failed to restore.",
    });
  };

  const onDelete = () => {
    const refs = doc(db, type, item.id);

    if (type === "folders") {
      const promise = deleteDoc(refs).then(() => refresh());
      toast.promise(promise, {
        loading: "Loading...",
        success: "Completely remotely!",
        error: "Failed to deleted.",
      });
    } else if (type === "files") {
      const promise = deleteObject(ref(storage, item.image)).then(() => {
        deleteDoc(refs).then(() => refresh());
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: "Completely remotely!",
        error: "Failed to deleted.",
      });
    }
  };

  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        <div className="flex items-center space-x-1 " role="button">
          {item.size ? (
            <File className="w-4 h-4 text-blue-400" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>

      <TableCell>
        {moment(new Date(item.archivedTime.seconds)).format("MMM DD, hh:mm A")}
      </TableCell>
      <TableCell className="mx-auto">
        {item.size ? bytConverter(item.size) : <Minus />}
      </TableCell>
      <TableCell className="flex justify-end  items-center space-x-2">
        <Popover>
          <PopoverTrigger className="flex justify-start">
            <div className="p-2 hover:bg-secondary rounded-full transition">
              <MoreVertical className="h-4 w-4" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 py-2 " forceMount side="left">
            <div
              onClick={onRestore}
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
            >
              <Undo className="w-4 h-4" />
              <span>Restore</span>
            </div>
            <ConfirModal onConfirm={onDelete}>
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </ConfirModal>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default TrashItem;
