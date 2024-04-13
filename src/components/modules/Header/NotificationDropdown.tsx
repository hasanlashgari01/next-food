"use client";

import { NotificationProps } from "@/common/interface/notification";
import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const NotificationDropdown: React.FC<{ notifications: NotificationProps[] }> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={twMerge(
          "relative flex size-12 cursor-pointer items-center justify-center rounded-full bg-background transition-all duration-200 ease-linear lg:size-14  lg:bg-white dark:bg-slate-700",
          `${isOpen ? "z-20" : "z-0"}`,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiOutlineBell className="size-6 lg:size-7 dark:text-white" />
      </div>
      <div
        className={twMerge(
          "fixed inset-0 bg-slate-900/60 transition-all duration-200 ease-linear dark:bg-slate-950/70",
          `${isOpen ? "visible z-10 opacity-100" : "invisible opacity-0"}`,
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-5 w-80 -translate-x-16 overflow-hidden rounded-xl bg-slate-100 shadow-lg transition-all duration-300 ease-linear sm:w-96 sm:-translate-x-8 dark:bg-slate-800 dark:shadow-none">
          <div className="flex items-center justify-between px-6 py-4 text-sm lg:text-base">
            <span className="cursor-pointer rounded-md bg-sky-600 px-3 py-1.5 text-white transition-colors hover:bg-sky-700">
              همه اعلان ها
            </span>
            {notifications.length > 0 && (
              <span className="cursor-pointer rounded-md border border-sky-600 px-3 py-1.5 text-white transition-colors hover:bg-sky-600">
                همه اعلان‌ها را خواندم
              </span>
            )}
          </div>
          <hr className="dark:border-slate-700" />
          {notifications.length > 0 ? (
            <ul className="h-96 overflow-auto scroll-smooth py-2 ">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="border-b px-6 py-4 transition-colors last:border-none hover:bg-sky-200 dark:border-slate-700 dark:hover:bg-sky-800/60"
                >
                  <p className="line-clamp-1 font-bold leading-8 dark:text-slate-100">{notification.title}</p>
                  <p className="dark:text-slate-300">{notification.time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-72 items-center justify-center bg-blue-300/20">
              <span className="text-2xl font-bold dark:text-white">اعلانی ندارید</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
