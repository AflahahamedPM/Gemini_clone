"use client";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";
import { setSelectedChat } from "@/Redux/chatSlice";

const Search = () => {
  const chats = useSelector((state) => state.chats.chats);
  const router = useRouter();
  const { setIsExpanded } = useAuthData();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pt-32 text-3xl">Search</div>
      <Select
        showSearch
        style={{ width: 600, height: 40 }}
        placeholder="Search Chat"
        optionFilterProp="label"
        onSelect={(e, option) => {
          dispatch(setSelectedChat(option?.value));
          router.push(`/?id=${option.value}`);
          setIsExpanded(false);
        }}
        options={chats
          .filter((chat) => chat.title !== "")
          .map((chat) => ({
            label: chat.title,
            value: chat.id,
          }))}
      />
    </div>
  );
};

export default Search;
