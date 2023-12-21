import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center text-[48px] font-[700] text-red-500">
      404 Error
      <span className="text-black dark:text-white ml-4">Page not found!</span>
    </div>
  );
};

export default ErrorPage;
