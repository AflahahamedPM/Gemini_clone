import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form"; // Make sure these are from shadcn
import { useAuthData } from "./AuthContextHandler/AuthContextHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import useAlert from "@/hooks/useAlert";

const LoginComponent = ({handleSendOtp}) => {
  const { countryCodeList, loginSchema, setIsOtpOpen } = useAuthData();
  const [countryCode, setCountryCode] = useState("+91");
  const { publishNotification } = useAlert();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobileNo: "",
    },
  });

  const phoneCodes = countryCodeList
    ?.filter((country) => country.idd.root && country.idd.suffixes.length > 0)
    ?.map((country) => {
      const code = `${country?.idd?.root || ""}${
        country?.idd?.suffixes?.[0] || ""
      }`;
      return {
        name: country.name?.common,
        code,
        flag: country.flags?.png,
      };
    });

  const uniquePhoneCodes = Array.from(
    new Map(phoneCodes?.map((item) => [item.code, item])).values()
  );

  const onSubmit = (data) => {
    handleSendOtp(data.mobileNo);
  };

  return (
    <div className="w-sm p-4 border border-gray-200 rounded-2xl">
      <p className="flex justify-center items-center pb-3 text-4xl">Sign In</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex items-center border rounded-md overflow-hidden">
            {/* Country Code Dropdown */}
            <Select
              value={countryCode}
              onValueChange={(value) => setCountryCode(value)}
              defaultValue="+91"
            >
              <SelectTrigger className="bg-none text-sm px-2 py-2 border-none rounded-none w-[120px]">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                {uniquePhoneCodes?.map((country, index) => (
                  <SelectItem key={index} value={country.code || "+91"}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={country.flag}
                        alt={`${country.name} flag`}
                        width={20}
                        height={15}
                      />
                      <span>{country.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Number Input */}
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter Mobile Number"
                      className="px-3 py-2 text-sm border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center items-center pt-3">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 dark:bg-gray-400"
            >
              Send OTP
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginComponent;
