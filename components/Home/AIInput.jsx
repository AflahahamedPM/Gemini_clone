"use client";
import React from "react";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";
import SendButton from "./SendButton";
import UploadFile from "./UploadFile";
import Image from "next/image";
import { TextareaAutosize } from "@mui/material";

const AIInput = () => {
  const { handleSubmitQuestion, question, setQuestion, questionImage } =
    useAuthData();

  return (
    <div className="flex md:w-1/2 max-md:w-[70%] md:mx-auto max-md:m-auto max-md:pl-5 mb-12">
      <div className="flex flex-col gap-2 w-full border border-gray-300 rounded-[24px] dark:bg-black bg-white p-4">
        {questionImage && (
          <div className="relative w-[70px] h-[70px] overflow-hidden rounded-md">
            <Image
              src={questionImage}
              alt="image"
              fill
              className="object-cover"
            />
          </div>
        )}

        <TextareaAutosize
          rows={1}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask Gemini"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && question.length > 0) {
              e.preventDefault();
              handleSubmitQuestion();
            }
          }}
          className="w-full text-[14px] text-black dark:text-white font-inherit bg-transparent outline-none resize-none p-0 placeholder:text-gray-500"
        />

        {/* Upload + Send buttons */}
        <div className="flex justify-between mt-1">
          <UploadFile />
          <SendButton handleClick={handleSubmitQuestion} />
        </div>
      </div>
    </div>
  );
};

export default AIInput;
