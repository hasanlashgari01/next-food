"use client";

import { useGetDiscountList } from "@/hooks/useAdmin";
import TopPage from "../../_components/TopPage";
import DiscountsTable from "./DiscountsTable";

const Index = () => {
  const { isLoading, data: discountList, refetch } = useGetDiscountList();

  return (
    <>
      <TopPage title="لیست کد تخفیف" link="/admin/discount/add" linkText="افزودن کد تخفیف" />
      {!isLoading && <DiscountsTable data={discountList ?? []} refetch={refetch} />}
    </>
  );
};

export default Index;
