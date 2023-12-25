import { IFolderAndFile } from "@/types";
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  item: IFolderAndFile;
  onStartEditing?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ListAction = ({ item, onStartEditing }: Props) => {
  const { refresh } = useRouter();
  const type = item.size ? "files" : "folders";

  const onDelete = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();

    const ref = doc(db, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      isArchive: true,
      archivedTime: serverTimestamp(),
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Archived!",
      error: "Failed to archived.",
    });
  };

  const onStar = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();

    const ref = doc(db, type, item.id);
    const promise = setDoc(ref, {
      ...item,
      isStar: item.isStar ? false : true,
    }).then(() => refresh());

    if (item.isStar) {
      toast.promise(promise, {
        loading: "Loading...",
        success: "Unstarred!",
        error: "Failed to Unstar.",
      });
    } else {
      toast.promise(promise, {
        loading: "Loading...",
        success: "Starred!",
        error: "Failed to star.",
      });
    }
  };

  const onDownload = () => {
    if (!item.size) {
      toast.error("This is a folder, not a file!");
      return;
    }

    window.open(item.image, "_blank");
  };

  const onShare = () => {
    if (!item.size) {
      toast.error("You can't share a folder!");
      return;
    }

    navigator.clipboard.writeText(item.image);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center space-x-1  ">
      <div
        onClick={onDelete}
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Trash className="w-4 h-4 opacity-50" />
      </div>
      <div
        onClick={onStar}
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Star
          className={`w-4 h-4 opacity-50 ${
            item.isStar && "fill-yellow-400 text-yellow-400"
          }`}
        />
      </div>
      <Popover>
        <PopoverTrigger className="flex justify-start" asChild>
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <MoreVertical className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="px-0 py-2">
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            onClick={onDownload}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </div>
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            onClick={onStartEditing}
          >
            <Pencil className="w-4 h-4" />
            <span>Rename</span>
          </div>
          <Separator />
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            onClick={onShare}
          >
            <UserPlus className="w-4 h-4" />
            <span>Share</span>
          </div>
          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            onClick={onDelete}
          >
            <Trash className="w-4 h-4" />
            <span>Move to trash</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListAction;
