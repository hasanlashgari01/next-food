"use client";

import ChangePassword from "@/components/modules/ChangePassword/ChangePassword";
import TopPage from "../../_components/TopPage";

const UpdatePasswordPage = () => {
  return (
    <>
      <TopPage title="به روز رسانی رمز عبور" link="/admin/settings" />
      <ChangePassword />
    </>
  );
};

export default UpdatePasswordPage;
