import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ICartTotalPriceProps {
  total: number | undefined;
  isHide?: boolean;
}

const CartTotalPrice: React.FC<ICartTotalPriceProps> = ({ total, isHide = false }) => {
  const [color, setColor] = useState<"bg-cyan-600" | "bg-transparent">("bg-transparent");

  useEffect(() => {
    setColor("bg-cyan-600");

    setInterval(() => {
      setColor("bg-transparent");
    }, 3000);
  }, [total]);

  return (
    <span className={twMerge("flex gap-2 text-white", `${isHide ? "max-sm:hidden" : "sm:hidden"}`)}>
      <span className={twMerge("rounded-md px-1 py-0.5", `${color} ${color === "bg-cyan-600" && "animate-pulse"}`)}>
        {total?.toLocaleString()}
      </span>
      <span>تومان</span>
    </span>
  );
};

export default CartTotalPrice;
