"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import AIInput from "./AIInput";
import { useSelector } from "react-redux";
import ChatComponent from "./ChatComponent";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Index = () => {
  //   const { setTheme, theme } = useTheme();
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const chats = useSelector((state) => state.chats.chats);
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  return (
    <div className="w-full md:h-screen max-md:h-4/6 flex flex-col">
      <div className="flex justify-between p-4">
        <p className="text-[#575B5F] text-xl max-sm:pl-12 dark:text-white">
          Gemini
        </p>
        {isLoggedIn ? (
          <Avatar className="mr-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <Button
            className="dark:bg-gray-400 bg-blue-700 hover:bg-blue-600 p-5 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="font-bold max-md:text-4xl text-5xl text-center text-black dark:text-white">
          {chats?.find((chat) => chat.id === selectedChat)?.messages?.length >
          0 ? (
            <ChatComponent chats={chats} selectedChat={selectedChat} />
          ) : isLoggedIn ? (
            <p className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-300 text-transparent bg-clip-text">
              Hello Aflah
            </p>
          ) : (
            <>
              <p>Meet Gemini,</p>
              <p>Your Personal Assistant</p>
            </>
          )}
        </div>
      </div>

      <AIInput />
    </div>
  );
};

export default Index;
