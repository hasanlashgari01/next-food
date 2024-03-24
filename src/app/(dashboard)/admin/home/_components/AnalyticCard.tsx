import React from "react";
import { twMerge } from "tailwind-merge";

interface AnalyticCardProps {
  name: string;
  count: number;
  bgColor: string;
  Icon: React.JSXElementConstructor<any>;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({ name, count, bgColor, Icon }) => {
  return (
    <div className="group flex justify-center gap-3 rounded-xl bg-white p-5 shadow-md sm:gap-8 md:shadow-lg lg:rounded-2xl dark:bg-slate-800 dark:shadow-none">
      <div
        className={twMerge(
          "flex size-12 items-center justify-center self-center overflow-hidden rounded-2xl p-2 shadow-xl sm:size-16 sm:rounded-3xl sm:p-4 dark:shadow-none",
          `${bgColor}`,
        )}
      >
        <Icon className="size-6 stroke-white stroke-1 text-white sm:size-full" />
      </div>
      <div className="flex flex-1 flex-col justify-around">
        <h3 className="mb-3.5 line-clamp-1 text-xs font-bold text-primary-500 sm:text-sm lg:mt-2 lg:pt-0 lg:text-lg dark:text-slate-300">
          {name}
        </h3>
        <h5 className="text-lg font-semibold leading-tight text-primary-900 sm:text-3xl dark:text-slate-100">
          {count}
        </h5>
      </div>
    </div>
  );
};

export default AnalyticCard;
