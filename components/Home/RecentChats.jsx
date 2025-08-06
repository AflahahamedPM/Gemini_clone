import { deleteChat, setSelectedChat } from "@/Redux/chatSlice";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";

const RecentChats = ({ isExpanded, chats, selectedChat }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleDeleteChat } = useAuthData();
  return (
    <div
      className={`p-4 ${
        isExpanded
          ? "opacity-100 max-h-10"
          : "opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 ease-in-out"
      }`}
    >
      <p className="px-2">Recent chats</p>

      {[...chats]
        ?.filter((chat) => chat.title)
        ?.sort((a, b) => b?.createdAt - a?.createdAt)
        ?.map((chat) => (
          <div key={chat.id} className="py-1">
            <div
              className={`${
                chat?.id === selectedChat
                  ? "dark:bg-[#1F3760] bg-gray-400"
                  : "dark:hover:bg-gray-700 hover:bg-gray-200"
              } py-2 px-2 rounded-3xl flex justify-between cursor-pointer`}
              onClick={() => {
                dispatch(setSelectedChat(chat?.id));
                router.push(`/?id=${chat?.id}`);
              }}
            >
              {chat?.title.charAt(0).toUpperCase() + chat?.title.slice(1)}
              {chat?.id === selectedChat && (
                <DeleteOutlined
                  className="text-lg"
                  onClick={() => {
                    handleDeleteChat(chat?.id);
                  }}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecentChats;
