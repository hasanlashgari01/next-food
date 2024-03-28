"use client";

import { Providers } from "@/app/providers";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/modules/Header/Header";
import { userPanelLinks } from "@/constants/navLinks";
import SideBar from "@/components/modules/SideBar/SideBar";

const LayoutPUser = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Providers>
      <div className="flex">
        <SideBar
          mainRoute="user"
          links={userPanelLinks}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 rounded-t-2xl bg-background px-6 pb-6 lg:m-6 lg:mb-0 dark:bg-slate-900 dark:text-white">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          {children}
        </div>
      </div>
      <Toaster />
    </Providers>
  );
};

export default LayoutPUser;
