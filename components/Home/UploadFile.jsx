"use client";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { Input } from "../ui/input";

const UploadFile = () => {
  const fileRef = useRef(null);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div
      className="md:p-1 max-md:p-0.5 rounded-full dark:bg-gray-200 dark:hover:bg-gray-100 hover:bg-gray-200 cursor-pointer mr-1"
      onClick={handleClick}
    >
      <PlusOutlined className="md:text-xl max-md:text-sm p-1" />
      <Input type="file" className="hidden" ref={fileRef} />
    </div>
  );
};

export default UploadFile;
