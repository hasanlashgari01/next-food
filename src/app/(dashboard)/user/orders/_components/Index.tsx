"use client";

import { useGetOrderList } from "@/hooks/useUser";
import OrderTable from "./OrderTable";

const Index = () => {
  const { isPending, data: orderList, refetch } = useGetOrderList();

  return (
    <div className="mt-5">
      <OrderTable data={{ count: orderList?.count, orders: orderList?.orders }} refetch={refetch} />;
    </div>
  );
};

export default Index;
