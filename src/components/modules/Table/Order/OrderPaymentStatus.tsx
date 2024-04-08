import { TPaymentStatus } from "@/common/interface/order";
import { twMerge } from "tailwind-merge";

const OrderPaymentStatus = ({ status }: { status: TPaymentStatus }) => {
  return (
    <span className={twMerge("rounded px-3 py-1 text-white", status === "PAID" ? "bg-green-600" : "bg-red-600")}>
      {status === "PAID" ? "موفق" : "ناموفق"}
    </span>
  );
};

export default OrderPaymentStatus;
