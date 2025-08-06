"use client";
import useAlert from "@/hooks/useAlert";
import {
  createChat,
  deleteChat,
  setSelectedChat,
  updateMessage,
} from "@/Redux/chatSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import z from "zod";
import { addMessage, fetchNewChat } from "@/utils/thunk";

const useServices = () => {
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(25);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.chats);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionImage, setQuestionImage] = useState(null);
  const { publishNotification } = useAlert();

  const randomAnswers = [
    "Sure! Here's what I found based on your question.",
    "That's a great question! Let me explain it.",
    "Here's a quick summary to help you out.",
    "After analyzing your input, this is the result.",
    "This is what I came up with based on your query.",
    "Great point! Here's some insight on that.",
    "I've looked into it and found this:",
    "Interesting! Here's a breakdown.",
    "Let's dive into the answer:",
    "Based on my understanding, here's the response.",
    "Based on the current information, this is the most accurate explanation.",
    "After evaluating your query, here's what I came up with.",
    "According to recent data, this would be the ideal solution.",
    "Let me break that down for you step by step.",
    "Here’s a clear and concise answer to your question.",
  ];

  useEffect(() => {
    if (chats?.length === 1) {
      dispatch(setSelectedChat(chats[0]?.id));
    }
  }, [chats]);

  useEffect(() => {
    fetchCountryCodeList();
  }, []);

  const fetchCountryCodeList = async () => {
    const response = await axios.get(
      " https://restcountries.com/v3.1/all?fields=flags,idd"
    );
    if (response?.status === 200) {
      setCountryCodeList(response?.data);
    }
  };

  const loginSchema = z.object({
    mobileNo: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .max(15, "Mobile number must be at most 15 digits")
      .regex(/^\d+$/, "Mobile number must be digits only"),
  });

  const otpSchema = z.object({
    otp: z
      .string()
      .min(4, "OTP must be 4 characters")
      .regex(/^\w{4}$/, "Invalid OTP format"),
  });

  useEffect(() => {
    if (isOtpOpen) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            localStorage.removeItem("tempOtp");
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isOtpOpen, seconds, minutes]);

  const handleSubmitQuestion = async (index) => {
    if (!question) {
      publishNotification("Question should not be empty", "error");
      return;
    }

    let chatIdToUse = selectedChat;

    if (!selectedChat && chats?.length === 0) {
      dispatch(createChat(question));
      const newChatResponse = await dispatch(fetchNewChat());
      chatIdToUse = newChatResponse?.payload?.id;
    }

    const response = await dispatch(
      addMessage({
        chatId: chatIdToUse,
        question: question,
        image: questionImage,
      })
    );
    setQuestionImage(null);

    const messageId = response?.payload?.messageId;

    setIsLoading(true);
    setQuestion("");
    setTimeout(() => {
      dispatch(
        updateMessage({
          chatId: chatIdToUse,
          messageId: messageId,
          answer:
            randomAnswers[Math.floor(Math.random() * randomAnswers.length)],
        })
      );
      setIsLoading(false);
    }, 3000);
  };

  const handleCreateNewChat = async () => {
    dispatch(createChat());
    const newChat = await dispatch(fetchNewChat());
    dispatch(setSelectedChat(newChat?.payload?.id));
  };

  const handleDeleteChat = async (id) => {
    await dispatch(deleteChat(id));
    publishNotification("Successfully deleted the chat", "success");
    handleCreateNewChat();
  };

  return {
    countryCodeList,
    loginSchema,
    isOtpOpen,
    setIsOtpOpen,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    otpSchema,
    isLoading,
    setIsLoading,
    question,
    setQuestion,
    handleSubmitQuestion,
    handleCreateNewChat,
    isExpanded,
    setIsExpanded,
    handleDeleteChat,
    setQuestionImage,
    questionImage,
  };
};

export default useServices;
