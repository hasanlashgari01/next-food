"use client";

import UserProvider from "@/context/UserContext";
import { useGetUser } from "@/hooks/useAuth";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import SideBar from "./SideBar";

const LayoutPAdmin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { isLoading, data, error, isError } = useGetUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <UserProvider>
      <div className="flex">
        <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 rounded-t-2xl bg-background px-6 pb-6 lg:m-6 lg:mb-0 dark:bg-slate-900">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          {children}
        </div>
      </div>
      <Toaster />
    </UserProvider>
  );
};

export default LayoutPAdmin;
