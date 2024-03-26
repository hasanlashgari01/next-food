import { tabs } from "@/constants/SettingsTab";
import React, { Dispatch, SetStateAction } from "react";
import { Tab, TabList } from "react-tabs";
import { twMerge } from "tailwind-merge";

interface Props {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const SettingTabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  const tabHandler = (tabId: number) => setTabIndex(tabId);

  return (
    <>
      <TabList className="col-span-12 flex h-fit gap-10 border-slate-300 p-5 pl-10 max-xl:border-b max-sm:justify-between xl:col-span-4 xl:flex-col xl:gap-3">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            className={twMerge(
              "before:list-active-dot relative shrink-0 cursor-pointer  text-xs transition-colors duration-500 max-xl:text-center xs:text-base sm:px-5 xl:text-lg/10",
              `${tab.id === tabIndex ? "text-blue-500 before:opacity-100" : "before:opacity-0"}`,
            )}
            onClick={() => tabHandler(tab.id)}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </>
  );
};
export default SettingTabs;
