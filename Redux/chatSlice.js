import { fetchNewChat } from "@/utils/thunk";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  chats: [],
  selectedChat: "",
  newChat: null,
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    createChat: (state, action) => {
      const newChat = {
        id: uuidv4(),
        title: action.payload || "",
        createdAt: new Date().getTime(),
        messages: [],
      };
      state.chats.push(newChat);
    },

    addMessageToChat: (state, action) => {
      const { chatId, question, answer, messageId, image } = action.payload;

      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        if (chat?.title === "") {
          chat.title = question;
        }
        chat?.messages?.push({
          id: messageId,
          question,
          answer,
          createdAt: new Date().getTime(),
          image,
        });
      }
    },

    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    deleteChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },

    updateMessage: (state, action) => {
      const { chatId, messageId, answer } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        const message = chat.messages.find((msg) => msg.id === messageId);
        if (message) {
          message.answer = answer;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNewChat.fulfilled, (state, action) => {
      state.newChat = action.payload;
    });
  },
});

export const {
  createChat,
  addMessageToChat,
  setSelectedChat,
  deleteChat,
  getNewChat,
  updateMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
