"use client";

import { Providers } from "@/app/providers";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/modules/Header/Header";
import { restaurantPanelLinks } from "@/constants/navLinks";
import SideBar from "@/components/modules/SideBar/SideBar";

const LayoutPRestaurant = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Providers>
      <div className="flex">
        <SideBar
          mainRoute="p-restaurant"
          links={restaurantPanelLinks}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="w-full rounded-t-2xl bg-background px-6 pb-6 lg:m-6 lg:mb-0 dark:bg-slate-900 dark:text-white">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          {children}
        </div>
      </div>
      <Toaster />
    </Providers>
  );
};

export default LayoutPRestaurant;
