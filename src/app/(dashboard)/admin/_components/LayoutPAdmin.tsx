"use client";

import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const LayoutPAdmin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="px-6 lg:m-6 flex-1 rounded-t-2xl bg-background">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default LayoutPAdmin;
