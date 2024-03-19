"use client";

import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";

const WelcomeText: React.FC = () => {
  const { isLoading, data } = useContext(UserContext);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    let dayPeriod: "PM" | "AM" = new Date().getHours() >= 12 ? "PM" : "AM";
    let time: number = Number(new Date().getHours());

    if (dayPeriod === "AM") {
      time < 12 && time < 6 ? setText("شب بخیر") : setText("صبح بخیر");
    } else if (dayPeriod === "PM") {
      time > 12 && time > 6 ? setText("شب بخیر") : setText("ظهر بخیر");
    } else {
      setText("وقت بخیر");
    }
  }, []);

  return (
    <div className="hidden items-center justify-center gap-2 font-bold sm:flex sm:items-center dark:text-slate-100">
      {isLoading ? (
        <div className="w-48 empty:h-full empty:w-32 empty:animate-pulse empty:rounded-md empty:bg-slate-200 dark:empty:bg-slate-900"></div>
      ) : (
        <>
          <span className="md:text-lg lg:text-2xl">سلام {data.fullName} عزیز</span>
          <span className="mx-2 h-7 w-[1px] rounded-full bg-slate-400"></span>
          <h5 className="text-base leading-7 dark:text-slate-200">{text}</h5>
        </>
      )}
    </div>
  );
};

export default WelcomeText;
