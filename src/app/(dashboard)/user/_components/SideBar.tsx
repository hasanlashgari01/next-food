"use client";

import Modal from "@/components/modules/Modal/Modal";
import { userPanelLinks } from "@/constants/navLinks";
import { recursivePath } from "@/utils/func";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();
  const [isShow, setIsShow] = useState<boolean>(false);

  const { currentPath, parentPath } = recursivePath(pathname);

  const showModalHandler = () => {
    setIsSidebarOpen(false);
    setIsShow(true);
  };

  return (
    <div className="sticky top-0 z-10 h-dvh pt-2 font-IranYekan">
      <div
        className={twMerge(
          "fixed inset-0 bg-slate-900/60 transition-all duration-200 ease-linear lg:hidden dark:bg-slate-950/50",
          `${isSidebarOpen ? "visible z-10 opacity-100" : "invisible opacity-0"}`,
        )}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={twMerge(
          "top-0 z-20 h-full w-64 bg-white px-3 py-6 transition-all duration-200 ease-linear max-lg:absolute sm:w-72 lg:w-64 lg:translate-x-0 lg:bg-transparent lg:px-5 dark:bg-slate-800 dark:text-slate-100",
          `${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`,
        )}
      >
        <div className="border-2 p-6">
          <h3>لوگو</h3>
        </div>
        <ul className="sidebar__nav mt-8 flex flex-col gap-1.5">
          {userPanelLinks.map(({ name, path, icon }, index) => {
            const Icon = icon;

            return (
              <Link
                key={index}
                href={`/user/${path}`}
                className={twMerge(
                  "transition-colors duration-300 ease-out",
                  `${currentPath === path || parentPath === path ? "bg-lime-300 dark:bg-lime-800" : ""}`,
                )}
              >
                <Icon className="size-4 lg:size-5" />
                {name}
              </Link>
            );
          })}
          <span onClick={showModalHandler}>
            <HiArrowRightOnRectangle className="size-4 lg:size-5" />
            خروج
          </span>
        </ul>
      </div>
      {/* Logout Modal */}
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        title="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
        confirmText="خروج"
        cancelText="انصراف"
        confirmStyle="btn-danger"
        cancelStyle="btn-default"
      />
    </div>
  );
};

export default SideBar;
