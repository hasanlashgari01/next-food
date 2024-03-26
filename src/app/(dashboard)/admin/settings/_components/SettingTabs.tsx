import { tabs } from "@/constants/SettingsTab";
import React, { Dispatch, SetStateAction } from "react";
import { Tab, TabList } from "react-tabs";
import "swiper/css";
import { twMerge } from "tailwind-merge";
import "swiper/css";

interface Props {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const SettingTabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  const tabHandler = (tabId: number) => setTabIndex(tabId);

  return (
    <>
      <TabList className="col-span-12 flex p-5 sm:justify-between sm:gap-5 xl:col-span-4 xl:flex-col xl:justify-start xl:gap-3">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            className={twMerge(
              "shrink-0 cursor-pointer px-5 text-xs max-xl:text-center sm:text-base xl:text-lg/10",
              `${tab.id === tabIndex ? "text-blue-500" : ""}`,
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
