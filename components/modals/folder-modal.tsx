"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useFolder } from "@/hooks/use-folder";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { folderSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FolderModal = () => {
  const { isOpen, onClose } = useFolder();
  const router = useRouter();
  const { user } = useUser();

  const form = useForm<z.infer<typeof folderSchema>>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof folderSchema>) => {
    const promise = addDoc(collection(db, "folders"), {
      name: values.name,
      timestamp: serverTimestamp(),
      uid: user?.id,
      isArchive: false,
      isDocument: false,
    }).then(() => {
      form.reset();
      onClose();
      router.refresh();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Folder created successfully",
      error: "Error creating folder",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Folder name"
                        className="rounded outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center space-x-2">
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant={"outline"} size={"sm"} type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderModal;
