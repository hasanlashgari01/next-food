"use client";

import { NotificationProps } from "@/common/interface/notification";
import NotificationDropdown from "@/components/modules/Header/NotificationDropdown";
import Profile from "@/components/modules/Header/Profile";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import WelcomeText from "./WelcomeText";
import { useGetUser } from "@/hooks/useAuth";
import { twMerge } from "tailwind-merge";
import Cart from "../Cart/Cart";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isLoading, data } = useGetUser();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  return (
    <div
      className={twMerge(
        "font-IranYekan transition-all duration-300 ease-linear max-lg:-mx-6 max-lg:bg-white max-lg:px-6 max-lg:dark:bg-slate-800",
        `${!isLoading ? "opacity-100" : "opacity-0"}`,
      )}
    >
      <div className="flex justify-between max-lg:py-5 lg:mt-6">
        <div className="flex items-center justify-between gap-6">
          <div
            className="flex size-12 items-center justify-center rounded-full border border-slate-100 lg:hidden dark:border-slate-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <HiBars3 className="size-6 sm:size-7 dark:text-slate-100" />
          </div>
          <WelcomeText isLoading={isLoading} fullName={data?.fullName} />
        </div>
        <div className="flex gap-[18px]">
          <NotificationDropdown notifications={notifications} />
          <Cart />
          <Profile isLoading={isLoading} avatarUrl={data?.avatarUrl} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
