import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebat";
import { LayoutChildProps } from "@/types";
import React from "react";

const AuthLayout = ({ children }: LayoutChildProps) => {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <main className="w-full  min-h-[90vh] fixed top-[10vh] pl-72 bg-[#f6f9fc] dark:bg-[#1f1f1f] p-4">
        <div className="h-[85vh] bg-white dark:bg-black text-white p-8 rounded-md  ml-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
