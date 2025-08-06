"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import { AuthProvider } from "../Auth/AuthContextHandler/AuthContextHandler";
import useServices from "@/app/useServices";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, SunDim } from "lucide-react";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/login"];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);
  const data = useServices();
  const { setTheme, theme } = useTheme();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <AuthProvider value={{ ...data }}>
      <div className="relative min-h-screen">
        {/* Theme toggle button fixed at top-left */}
        <div
          className={`fixed top-4 ${
            pathname !== "/" ? "right-4" : !isLoggedIn ? "right-32" : "right-22"
          } z-50`}
        >
          <Button
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunDim size={30} /> : <Moon size={30} />}
          </Button>
        </div>

        <div className="flex">
          {!shouldHideSidebar && <Sidebar />}
          <main className="flex-1 w-full bg-white dark:bg-[#1B1C1D]">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
