"use client";

import OrderDetails from "@/components/modules/Table/Order/OrderDetails";
import { useGetUser } from "@/hooks/useAuth";
import { useGetOrderById } from "@/hooks/useRestaurant";
import { useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data: user } = useGetUser();
  const restaurantId: string | undefined = user?.restaurants.at(0);
  const { isLoading, data } = useGetOrderById(restaurantId ? restaurantId : "", id as string);

  return <div>{!isLoading && data && <OrderDetails isLoading={isLoading} data={data} />}</div>;
};

export default OrderDetailsPage;
