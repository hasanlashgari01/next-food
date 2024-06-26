"use client";

import Modal from "@/components/modules/Modal/Modal";
import { INavLinks } from "@/constants/navLinks";
import { useLogout } from "@/hooks/useAuth";
import { recursivePath } from "@/utils/func";
import { cookies } from "next/headers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface SideBarProps {
  mainRoute: "admin" | "user" | "p-restaurant";
  links: INavLinks[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ mainRoute, links, isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutateAsync } = useLogout();
  const { currentPath, parentPath } = recursivePath(pathname);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const showModalHandler = () => {
    setIsSidebarOpen(false);
    setIsShow(true);
  };

  const logoutHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="sticky top-0 h-dvh pt-2 font-IranYekan max-lg:z-10">
      <div
        className={twMerge(
          "fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-all duration-200 ease-linear lg:hidden dark:bg-slate-950/50",
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
          {links.map(({ name, path, icon }, index) => {
            const Icon = icon;

            return (
              <Link
                key={index}
                href={`/${mainRoute}/${path}`}
                className={twMerge(
                  "transition-colors duration-300 ease-out",
                  `${currentPath === path || parentPath === path ? "bg-sky-100 dark:bg-sky-800" : ""}`,
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
        confirmAction={logoutHandler}
      />
    </div>
  );
};

export default SideBar;
