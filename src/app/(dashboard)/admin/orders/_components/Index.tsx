"use client";

import { useGetOrderList } from "@/hooks/useAdmin";
import OrderTable from "./OrderTable";

const Index = () => {
  const { isLoading, data: orderList, refetch } = useGetOrderList();

  return (
    <>{!isLoading && <OrderTable data={{ count: orderList?.count, orders: orderList?.orders }} refetch={refetch} />}</>
  );
};

export default Index;
