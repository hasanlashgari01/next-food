"use client";

import { TPaymentStatus, TStatus } from "@/common/interface/order";
import { useCancelOrder, usePayOrder } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IPaymentProps {
  orderId: string;
  status: TStatus;
  paymentStatus: TPaymentStatus;
  isExpired: boolean;
}

const Payment: React.FC<IPaymentProps> = ({
  orderId,
  status = "PENDING",
  paymentStatus = "UNPAID",
  isExpired = false,
}) => {
  const router = useRouter();
  const { mutateAsync: payOrder } = usePayOrder();
  const { mutateAsync: cancelOrder } = useCancelOrder();

  const payOrderHandler = async () => {
    try {
      const { message } = await payOrder(orderId);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const cancelOrderHandler = async () => {
    try {
      const { message } = await cancelOrder(orderId);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mx-auto flex gap-5">
      {paymentStatus === "UNPAID" && status === "PENDING" && !isExpired && (
        <>
          <button className="btn btn-primary" onClick={payOrderHandler}>
            پرداخت
          </button>
          <button className="btn btn-default" onClick={cancelOrderHandler}>
            لغو
          </button>
        </>
      )}
      {paymentStatus === "PAID" && <h3 className="mt-4 text-3xl font-bold text-green-600">پرداخت شده</h3>}
      {isExpired && <h3 className="mt-4 text-3xl font-bold text-amber-600">مدت زمان پرداخت به پایان رسیده</h3>}
      {status === "CANCELED" && <h3 className="mt-4 text-3xl font-bold text-red-600">سفارش لغو شده</h3>}
    </div>
  );
};

export default Payment;
