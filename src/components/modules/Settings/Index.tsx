"use client";

import { useGetUser, useUpdateProfile } from "@/hooks/useAuth";
import { useState } from "react";
import { TabPanel, Tabs } from "react-tabs";
import AboutSection from "./AboutSection";
import AdvancedSection from "./AdvancedSection";
import SecureSection from "./SecureSection";
import SettingTabs from "./SettingTabs";
import "react-tabs/style/react-tabs.css";

const Index = () => {
  const { isLoading, data, refetch } = useGetUser();
  const { mutateAsync } = useUpdateProfile();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      className="xl:border-none"
      defaultIndex={tabIndex}
      selectedIndex={tabIndex}
      onSelect={index => setTabIndex(index)}
    >
      <div className="grid grid-cols-12 gap-5">
        <SettingTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
        {!isLoading && (
          <>
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
          </>
        )}
      </div>
    </Tabs>
  );
};
export default Index;
