import React, { ReactNode, MouseEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  children: ReactNode;
  onConfirm: () => void;
}

const ConfirModal = ({ children, onConfirm }: Props) => {
  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onConfirm();

    console.log("error");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm w-full">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirModal;
