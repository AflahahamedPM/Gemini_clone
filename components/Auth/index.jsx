"use client";
import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import OTPComponent from "./OTPComponent";
import { useAuthData } from "./AuthContextHandler/AuthContextHandler";
import useAlert from "@/hooks/useAlert";

const Login = () => {
  const { isOtpOpen, setIsOtpOpen, setMinutes, setSeconds } = useAuthData();
  const {publishNotification} = useAlert();

  const handleSendOtp = (mobileNo) => {
    const generateOtp = Math.floor(1000 + Math.random() * 9000);
    publishNotification(
      `Your OTP send to the mobile number  is ${generateOtp}`,
      "success"
    );
    localStorage.setItem("tempOtp", generateOtp);
    setTimeout(() => {
      setIsOtpOpen(true);
    }, 3000);
  };

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(25);

    const generateOtp = Math.floor(1000 + Math.random() * 9000);
    publishNotification(
      `Your new OTP send to the mobile number  is ${generateOtp}`,
      "success"
    );
    localStorage.setItem("tempOtp", generateOtp);
  };

  const renderComponent = () => {
    return isOtpOpen ? (
      <OTPComponent resendOTP={resendOTP} />
    ) : (
      <LoginComponent handleSendOtp={handleSendOtp} />
    );
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      {renderComponent()}
    </div>
  );
};

export default Login;
