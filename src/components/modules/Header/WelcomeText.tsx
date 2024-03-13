"use client";

import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";

const WelcomeText: React.FC = () => {
  const { isLoading, data } = useContext(UserContext);

  if (isLoading)
    return (
      <span className="empty:h-full empty:w-32 empty:animate-pulse empty:rounded-md empty:bg-slate-200 max-sm:hidden dark:empty:bg-slate-900"></span>
    );

  let now = new Date();

  const [text, setText] = useState<string>("");
  const dayPeriod: "PM" | "AM" = now.getHours() > 12 ? "PM" : "AM";
  const time: number = now.getHours();

  useEffect(() => {
    if (dayPeriod === "AM") {
      time <= 12 && time >= 6 ? setText("صبح بخیر") : setText("شب بخیر");
    } else if (dayPeriod === "PM") {
      time >= 12 && time <= 6 ? setText("ظهر بخیر") : setText("شب بخیر");
    } else {
      setText("وقت بخیر");
    }
  }, []);

  return (
    <div className="hidden items-center justify-center gap-2 font-bold sm:flex sm:items-center dark:text-slate-100">
      <span className="md:text-lg lg:text-2xl">سلام {data.fullName} عزیز</span>
      <span className="mx-2 min-h-6 w-[1.5px] rounded-full bg-slate-400"></span>
      <h5 className="h-full text-base  leading-8 dark:text-slate-200">{text}</h5>
    </div>
  );
};

export default WelcomeText;
