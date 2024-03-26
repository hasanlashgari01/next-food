"use client";

import { useState } from "react";
import { TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TopPage from "../_components/TopPage";
import AboutSection from "./_components/AboutSection";
import SettingTabs from "./_components/SettingTabs";
import SecureSection from "./_components/SecureSection";
import AdvancedSection from "./_components/AdvancedSection";
import { useGetUser, useUpdateProfile } from "@/hooks/useAuth";

const Settings = () => {
  const { isLoading, data, refetch } = useGetUser();
  const { mutateAsync } = useUpdateProfile();
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

          <div className="col-span-12 xl:col-span-8">
            <TabPanel>
              <AboutSection isLoading={isLoading} data={data} refetch={refetch} mutateAsync={mutateAsync} />
            </TabPanel>
            <TabPanel>
              <SecureSection isLoading={isLoading} data={data} refetch={refetch} mutateAsync={mutateAsync} />
            </TabPanel>
            <TabPanel>
              <AdvancedSection isLoading={isLoading} data={data} refetch={refetch} mutateAsync={mutateAsync} />
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </>
  );
};

export default Settings;
