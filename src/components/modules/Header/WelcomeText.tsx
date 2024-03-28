"use client";

import { useGetUser } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IWelcomeTextProps {
  isLoading: boolean;
  fullName: string | undefined;
}

const WelcomeText: React.FC<IWelcomeTextProps> = ({ isLoading, fullName }) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    let dayPeriod: "PM" | "AM" = new Date().getHours() >= 12 ? "PM" : "AM";
    let time: number = Number(new Date().getHours());

    if (dayPeriod === "AM") {
      time <= 0 && time > 6 ? setText("شب بخیر") : setText("صبح بخیر");
    } else if (dayPeriod === "PM") {
      time >= 12 && time < 18 ? setText("ظهر بخیر") : setText("شب بخیر");
    } else {
      setText("وقت بخیر");
    }
  }, []);

  return (
    <div className="flex font-bold max-lg:flex-col max-xs:hidden lg:items-center lg:justify-center lg:gap-2 dark:text-slate-100">
      {isLoading ? (
        <div className="h-10 w-64 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"></div>
      ) : (
        <>
          <span className="lg:text-2xl">سلام {fullName} عزیز</span>
          <span className="mx-2 h-7 w-[1px] rounded-full bg-slate-400 max-lg:hidden"></span>
          <h5 className="text-sm leading-7 lg:text-base dark:text-slate-200">{text}</h5>
        </>
      )}
    </div>
  );
};

export default WelcomeText;
