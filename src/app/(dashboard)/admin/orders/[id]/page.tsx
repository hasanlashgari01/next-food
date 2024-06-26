"use client";

import OrderDetails from "@/components/modules/Table/Order/OrderDetails";
import { useGetOrder } from "@/hooks/useAdmin";
import { useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetOrder(String(id));

  return <div>{!isLoading && data && <OrderDetails isLoading={isLoading} data={data} />}</div>;
};

export default OrderDetailsPage;
