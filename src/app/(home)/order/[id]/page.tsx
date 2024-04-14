import OrderDetails from "@/components/modules/Table/Order/OrderDetails";
import { getOrder } from "@/server-actions/orderActions";
import { redirect } from "next/navigation";
import Payment from "./_components/Payment";
import { IOrder } from "@/common/interface/order";

interface IProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { id } }: IProps) {
  return {
    title: `سفارش ${id} | فروشگاه`,
  };
}

const page: React.FC<IProps> = async ({ params: { id } }) => {
  const order: IOrder = await getOrder({ id });
  if (!order) redirect("/not-found");

  return (
    <div className="mb-20 flex flex-col gap-5">
      <OrderDetails data={order} />
      <Payment orderId={id} status={order.status} paymentStatus={order.paymentStatus} isExpired={order.isExpired} />
    </div>
  );
};

export default page;
