import React from "react";

interface AnalyticCardProps {
  name: string;
  count: number;
  bgColor: string;
  Icon: React.JSXElementConstructor<any>;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({ name, count, bgColor, Icon }) => {
  return (
    <div className="group flex gap-3 rounded-xl bg-white p-5 shadow-md sm:gap-8 md:shadow-lg lg:rounded-2xl dark:bg-slate-800 dark:shadow-none">
      <div
        className={`flex size-12 items-center justify-center self-center overflow-hidden rounded-2xl p-2 sm:size-16 sm:rounded-3xl sm:p-4 ${bgColor} shadow-xl dark:shadow-none`}
      >
        <Icon className="size-6 stroke-white text-white stroke-1 sm:size-full" />
      </div>
      <div className="flex flex-1 flex-col py-1">
        <span className="text-sm font-bold text-primary-500 sm:text-sm lg:text-lg dark:text-slate-300">{name}</span>
        <span className="mt-1 text-lg font-semibold leading-tight text-primary-900 sm:mt-2 sm:text-3xl lg:text-4xl dark:text-slate-100">
          {count}
        </span>
      </div>
    </div>
  );
};

export default AnalyticCard;
