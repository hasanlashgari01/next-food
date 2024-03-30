import { IPositionItemProps } from "@/common/interface/cart-page";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const PositionCart: React.FC<IPositionItemProps> = ({ step, setStep, action }) => {
  return (
    <div
      className={twMerge("cart__topbar-item max-lg:cursor-pointer", step == 1 && "active", step > 1 && "text-blue-200")}
      onClick={action}
    >
      <HiOutlineShoppingCart className="text-2xl max-lg:hidden" />
      <span>سبد خرید</span>
    </div>
  );
};

export default PositionCart;
