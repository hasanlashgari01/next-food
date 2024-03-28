"use client";

import { useGetOrderList } from "@/hooks/useAdmin";
import OrderTable from "./OrderTable";

const Index = () => {
  const { isPending, data: orderList, refetch } = useGetOrderList();

  return (
    <div>
      <OrderTable data={{ count: orderList?.count, orders: orderList?.orders }} refetch={refetch} />
    </div>
  );
};

export default Index;
