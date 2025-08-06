"use client";
import { MenuOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";
import RecentChats from "../Home/RecentChats";
import { useRouter } from "next/navigation";
import useAlert from "@/hooks/useAlert";

const Sidebar = () => {
  const chats = useSelector((state) => state.chats.chats);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const { handleCreateNewChat, setIsExpanded, isExpanded } = useAuthData();
  const router = useRouter();
  const { publishNotification } = useAlert();

  return (
    <div className="flex">
      <div className="relative group">
        {/* Sidebar Container */}
        <div
          className={`
                z-[99999] min-h-screen overflow-y-auto scrollbar-hide bg-[#f0f4f9] dark:bg-[#282A2C] 
                transition-all duration-300 ease-in-out group
                ${isExpanded ? "w-64 max-sm:w-82" : "w-16"}
                ${
                  isExpanded
                    ? "max-sm:absolute"
                    : "max-sm:absolute max-sm:left-0 hover:w-64"
                }
            `}
        >
          {/* Toggle & Search */}
          <div className="flex items-center justify-between px-4 py-6">
            <MenuOutlined
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xl"
            />
            {/* Search icon shown only when expanded or on hover */}
            <div
              className={`transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <SearchOutlined
                className="text-xl cursor-pointer"
                onClick={() => router.push("/search")}
              />
            </div>
          </div>

          {/* Sidebar Items */}
          <div className="px-4 py-8">
            {/* Example Item */}
            <div
              className="flex items-center gap-3 pb-3 cursor-pointer"
              onClick={() =>
                isLoggedIn
                  ? handleCreateNewChat()
                  : publishNotification("Please Login to add new chat", "error")
              }
            >
              <EditOutlined className="text-[#999] text-lg" />
              <span
                className={`text-sm text-[#999] whitespace-nowrap transition-opacity duration-300
                  ${
                    isExpanded
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
              >
                New Chat
              </span>
            </div>

            {/* <div className="group overflow-hidden">
              <div
                className={`flex items-center gap-2 py-1 text-sm text-[#999] 
                    transition-all duration-300 ease-in-out
                         ${
                           isExpanded
                             ? "opacity-100 max-h-10"
                             : "opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10"
                         }
                `}
              >
                <EditOutlined className="text-[#999] text-lg" />
                <span>Settings</span>
              </div>
            </div> */}
          </div>
          {chats.length > 0 && (
            <RecentChats
              isExpanded={isExpanded}
              chats={chats}
              selectedChat={selectedChat}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
