"use client";

import { useGetSellerList } from "@/hooks/useAdmin";
import TopPage from "../../_components/TopPage";
import SellersTable from "./SellersTable";

const Index = () => {
  const { data: sellerResult, refetch: refetchSellers } = useGetSellerList();

  return (
    <>
      <TopPage title="لیست فروشندگان" />
      <SellersTable refetchSellers={refetchSellers} sellers={sellerResult?.sellers} />
    </>
  );
};

export default Index;
