"use client";

import { useGetOrderList } from "@/hooks/useUser";
import OrderTable from "./OrderTable";

const Index = () => {
  const { isPending, data: orderList, refetch } = useGetOrderList();

  return <OrderTable data={{ count: orderList?.count, orders: orderList?.orders }} refetch={refetch} />;
};

export default Index;
