"use client";
import { addMessageToChat } from "@/Redux/chatSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const fetchNewChat = createAsyncThunk(
  "chats/fetchNewChat",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const sortedChats = [...state.chats.chats].sort(
      (a, b) => b.createdAt - a.createdAt
    );
    const latestChat = sortedChats[0] || null;

    return latestChat;
  }
);

export const addMessage = createAsyncThunk(
  "chats/addMessage",
  async ({ chatId, question, image }, { getState, dispatch }) => {
    const messageId = uuidv4();
    const answer = null;

    dispatch(
      addMessageToChat({
        chatId,
        question,
        answer: answer,
        messageId,
        image,
      })
    );

    return { chatId, question, answer, messageId, image };
  }
);
