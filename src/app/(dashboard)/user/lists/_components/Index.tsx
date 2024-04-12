"use client";

import { IWhishlist } from "@/common/interface/user";
import { useGetWhishlist } from "@/hooks/useUser";
import { useState } from "react";
import { TabPanel, Tabs } from "react-tabs";
import Bookmarks from "./Bookmarks";
import Likes from "./Likes";
import ListTabs from "./ListTabs";

const Index = () => {
  const { isLoading, data, refetch } = useGetWhishlist();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      className="xl:border-none"
      defaultIndex={tabIndex}
      selectedIndex={tabIndex}
      onSelect={index => setTabIndex(index)}
    >
      <div className="grid grid-cols-12 gap-5">
        <ListTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />

        <div className="col-span-12 xl:col-span-8">
          <TabPanel>
            <Likes isLoading={isLoading} data={data as IWhishlist} refetch={refetch} />
          </TabPanel>
          <TabPanel>
            <Bookmarks isLoading={isLoading} data={data as IWhishlist} refetch={refetch} />
          </TabPanel>
        </div>
      </div>
    </Tabs>
  );
};

export default Index;
