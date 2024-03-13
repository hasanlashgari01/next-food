"use client";

import UserProvider from "@/context/UserContext";
import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const LayoutPAdmin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // const { isLoading, data, error, isError } = useGetUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // if (isLoading) return <span>Loading...</span>;
  // if (isError) return <span>Error: {error.message}</span>;

  return (
    <UserProvider>
      <div className="flex">
        <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 rounded-t-2xl bg-background px-6 lg:m-6 lg:mb-0 dark:bg-slate-900">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          {children}
        </div>
      </div>
    </UserProvider>
  );
};

export default LayoutPAdmin;
