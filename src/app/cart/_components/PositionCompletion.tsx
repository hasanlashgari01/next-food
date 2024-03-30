import { IPositionItemProps } from "@/common/interface/cart-page";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const PositionCompletion: React.FC<IPositionItemProps> = ({ step }) => {
  return (
    <div
      className={twMerge(
        "cart__topbar-item max-lg:cursor-pointer",
        step == 2 && "active",
        step > 2 && "text-blue-200 dark:text-slate-200/60",
      )}
    >
      <HiOutlineCheckCircle className="text-2xl max-lg:hidden" />
      <span>تکمیل اطلاعات</span>
    </div>
  );
};

export default PositionCompletion;
