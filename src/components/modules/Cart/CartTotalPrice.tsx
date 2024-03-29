import { twMerge } from "tailwind-merge";

interface ICartTotalPriceProps {
  isHide?: boolean;
}

const CartTotalPrice: React.FC<ICartTotalPriceProps> = ({ isHide = false }) => {
  return (
    <span className={twMerge("flex gap-2", `${isHide ? "max-sm:hidden" : "sm:hidden"}`)}>
      <span>300,000</span>
      <span>تومان</span>
    </span>
  );
};

export default CartTotalPrice;
