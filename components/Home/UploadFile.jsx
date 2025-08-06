"use client";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";

const UploadFile = () => {
  const fileRef = useRef(null);
  const { setQuestionImage } = useAuthData();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setQuestionImage(base64);
    }
  };

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
      <Input
        accept=".png"
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadFile;
