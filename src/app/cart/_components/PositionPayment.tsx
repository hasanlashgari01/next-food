import { IPositionItemProps } from "@/common/interface/cart-page";
import { HiOutlineWallet } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const PositionPayment: React.FC<IPositionItemProps> = ({ step }) => {
  return (
    <div className={twMerge("cart__topbar-item", `${step === 3 ? "active" : ""}`)}>
      <HiOutlineWallet className="text-2xl max-lg:hidden" />
      <span>پرداخت</span>
    </div>
  );
};

export default PositionPayment;
