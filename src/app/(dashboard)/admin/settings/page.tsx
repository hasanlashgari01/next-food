import Index from "@/components/modules/Settings/Index";
import TopPage from "../_components/TopPage";
import React, { Dispatch, SetStateAction } from "react";

const Settings = () => {
  return (
    <>
      <TopPage title="تنظیمات" link="/admin/settings/password" linkText="به روز رسانی رمز عبور" />
      <Index />
    </>
  );
};

export default Settings;
