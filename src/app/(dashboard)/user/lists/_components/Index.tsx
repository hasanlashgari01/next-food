"use client";

import { useState } from "react";
import ListTabs from "./ListTabs";
import { TabPanel, Tabs } from "react-tabs";
import FoodLikes from "./Likes";
import { useGetUser } from "@/hooks/useAuth";
import Bookmarks from "./Bookmarks";
import { IUser } from "@/common/interface/user";

const Index = () => {
  const { isLoading, data, refetch } = useGetUser();
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
            <FoodLikes isLoading={isLoading} data={data as IUser} refetch={refetch} />
          </TabPanel>
          <TabPanel>
            <Bookmarks isLoading={isLoading} data={data as IUser} refetch={refetch} />
          </TabPanel>
        </div>
      </div>
    </Tabs>
  );
};

export default Index;
