import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebat";
import { LayoutChildProps } from "@/types";
import React from "react";

const AuthLayout = ({ children }: LayoutChildProps) => {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default AuthLayout;
