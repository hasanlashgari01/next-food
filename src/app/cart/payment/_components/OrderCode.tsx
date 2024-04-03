"use client";

import { useState } from "react";

interface IOrderCode {
  status: "success" | "failed";
}

const OrderCode: React.FC<IOrderCode> = ({ status }) => {
  const [code, setCode] = useState<string>("");

  return (
    <div className="mb-10 mt-4 inline-block text-sm lg:mb-12 lg:mt-6 lg:text-xl">
      {status === "success" ? "کد رهگیری سفارش شما:" : "کد پیگیری تراکنش شما: "} {code}
    </div>
  );
};
export default OrderCode;
