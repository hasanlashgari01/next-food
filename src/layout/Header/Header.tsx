"use client";

import { TRole } from "@/common/interface/user";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import LeftSide from "./LeftSide/LeftSide";

const Header = () => {
  const { isLoading, data } = useGetUser();
  const [shouldResize, setShouldResize] = useState<boolean>(false);

  useEffect(() => {
    resizeHandler();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", resizeHandler);

    return () => {
      window.removeEventListener("scroll", resizeHandler);
    };
  });

  const resizeHandler = () => (window.scrollY >= 190 ? setShouldResize(true) : setShouldResize(false));

  return (
    <div className={twMerge("sticky top-0 z-40 bg-slate-50 dark:bg-slate-700", shouldResize ? "py-1.5" : "py-4")}>
      <div className="container">
        <div className="flex items-center justify-between transition-all duration-75 ease-in-out">
          <Link href="/">لوگو</Link>
          <LeftSide role={isLoading ? null : (data?.role as TRole)} />
        </div>
      </div>
    </div>
  );
};

export default Header;
