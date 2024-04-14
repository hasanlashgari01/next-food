import TopPage from "@/app/(dashboard)/admin/_components/TopPage";
import ChangePassword from "@/components/modules/ChangePassword/ChangePassword";

const page = () => {
  return (
    <div className="mt-10">
      <TopPage title="اطلاعات حساب" link="/user/personal-info/password" linkText="به روز رسانی رمز عبور" />
      <ChangePassword />
    </div>
  );
};
export default page;
