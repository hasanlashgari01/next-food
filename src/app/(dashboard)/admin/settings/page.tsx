"use client";

import { useState } from "react";
import { TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TopPage from "../_components/TopPage";
import AboutSection from "./_components/AboutSection";
import SettingTabs from "./_components/SettingTabs";

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <TopPage title="تنظیمات" link="/admin/settings/password" linkText="به روز رسانی رمز عبور" />
      <Tabs
        className="xl:border-none"
        defaultIndex={tabIndex}
        selectedIndex={tabIndex}
        onSelect={index => setTabIndex(index)}
      >
        <div className="child-last:col-span-8 grid grid-cols-12 gap-6">
          <SettingTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />

          <TabPanel className="col-span-12 xl:col-span-8">{tabIndex === 0 && <AboutSection />}</TabPanel>
          <TabPanel>2</TabPanel>
          <TabPanel>3</TabPanel>
        </div>
      </Tabs>
    </>
  );
};

export default Settings;
