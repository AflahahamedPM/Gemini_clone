import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAuthData } from "./AuthContextHandler/AuthContextHandler";
import useAlert from "@/hooks/useAlert";
import { useRouter } from "next/navigation";

const OTPComponent = ({ resendOTP }) => {
  const { publishNotification } = useAlert();
  const router = useRouter();
  const { seconds, minutes, otpSchema, setIsOtpOpen } = useAuthData();
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    if (localStorage.getItem("tempOtp") === data?.otp) {
      publishNotification("OTP Verified successfully", "success");
      localStorage.setItem("isLoggedIn", true);
      localStorage.removeItem("tempOtp");
      setIsOtpOpen(false);
      router.push("/");
    } else {
      publishNotification("Incorrect OTP", "error");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border border-gray-200 items-center gap-4 p-10 rounded-2xl"
      >
        <p className="text-xl font-semibold text-gray-700 dark:text-white">
          Verify OTP
        </p>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full max-w-md"
                  disabled={seconds === 0}
                >
                  <InputOTPGroup className="flex gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-14 h-14 rounded-md border border-gray-300 dark:border-gray-600 text-center text-xl font-bold shadow-sm 
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-150"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center gap-1.5">
          <p
            onClick={seconds === 0 ? resendOTP : undefined}
            className={`${
              seconds === 0
                ? "text-[#535766] cursor-pointer"
                : "text-[#868686] cursor-not-allowed"
            }`}
          >
            Resend OTP
          </p>

          <div>
            <span>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 dark:bg-gray-400"
        >
          Verify Otp
        </Button>
      </form>
    </Form>
  );
};

export default OTPComponent;
