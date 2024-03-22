"use client";

import { useGetDiscountList } from "@/hooks/useAdmin";
import TopPage from "../../_components/TopPage";
import DiscountsTable from "./DiscountsTable";

const Index = () => {
  const { isPending, data: discountList } = useGetDiscountList();

  return (
    <>
      <TopPage title="لیست کد تخفیف" link="/admin/discount/add" linkText="افزودن کد تخفیف" />
      <DiscountsTable data={discountList ?? []} />
    </>
  );
};

export default Index;
