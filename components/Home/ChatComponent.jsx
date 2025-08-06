import React, { useEffect, useRef, useState } from "react";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";
import { CopyOutlined } from "@ant-design/icons";
import useAlert from "@/hooks/useAlert";
import Image from "next/image";

const ChatComponent = ({ chats, selectedChat }) => {
  const scrollRef = useRef(null);
  const { question, isLoading } = useAuthData();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { publishNotification } = useAlert();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats, selectedChat]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    publishNotification("Copied to Clipboard", "success");
  };

  return (
    <div
      className="overflow-y-auto h-[70vh] max-h-[75vh] md:h-[50vh] md:max-h-[60vh] px-2 scrollbar-hide"
      ref={scrollRef}
    >
      {chats
        ?.find((chat) => chat?.id === selectedChat)
        ?.messages?.map((message, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 mt-4 md:w-150 max-md:w-60 overflow-hidden"
          >
            <div
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex justify-end relative mb-0.5"
            >
              <div className="flex flex-col items-end max-w-[80%]">
                {message?.image && (
                  <Image
                    src={message?.image}
                    alt="questionImage"
                    width={120}
                    height={120}
                    className="rounded-md mb-1"
                  />
                )}
                <p className="bg-[#E9EEF6] cursor-pointer dark:bg-[#333537] font-normal text-sm text-black dark:text-white p-3 rounded-2xl text-left break-words">
                  {message?.question || question}
                </p>
              </div>

              {hoveredIndex === i && (
                <button
                  onClick={() => handleCopy(message?.question || question)}
                  className="absolute top-7 p-2 bg-gray-200 rounded-lg text-sm text-gray-500 cursor-pointer"
                >
                  <CopyOutlined />
                </button>
              )}
            </div>
            <p className="text-xs flex justify-end font-light">
              {new Date(message?.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            {isLoading && message?.answer === null ? (
              <div className="text-gray-300 text-sm font-normal dark:text-white p-3 rounded-2xl max-w-[80%] text-left flex items-center gap-1">
                <span>Gemini is thinking</span>
                <span className="dot-animation flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-200">.</span>
                  <span className="animate-bounce delay-400">.</span>
                </span>
              </div>
            ) : (
              <div
                onMouseEnter={() => setHoveredIndex(`a-${i}`)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex justify-start relative mb-4"
              >
                <p className="text-black cursor-pointer font-normal dark:text-white p-3 text-sm rounded-2xl max-w-full text-left break-words">
                  {message?.answer}
                </p>

                {hoveredIndex === `a-${i}` && (
                  <button
                    onClick={() => handleCopy(message?.answer)}
                    className="absolute bottom-7 p-2 bg-gray-200 rounded-lg text-sm text-gray-500 cursor-pointer"
                  >
                    <CopyOutlined />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatComponent;
