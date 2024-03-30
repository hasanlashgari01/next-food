import CartItemAction from "@/components/modules/Cart/CartItemAction";
import FactorItem from "./FactorItem";
import { ICartItem } from "@/common/interface/cart";
import { IData } from "@/common/interface/getData";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";

interface FactorProps {
  foods: ICartItem[] | [];
  refetch: () => void;
  setIsModalOpen: (value: boolean) => void;
}

const Factor: React.FC<FactorProps> = ({ foods, refetch, setIsModalOpen }) => {
  return (
    <div className="col-span-1 flex flex-col rounded-lg border border-neutral-300 p-6">
      <div className="mb-3 hidden items-center justify-between  text-sm/8 lg:flex">
        <span className="text-[#353535]">سبد خرید ({foods.length})</span>
        <button className="cart__topbar-btn bg-transparent" onClick={() => setIsModalOpen(true)}>
          <HiOutlineTrash className="text-lg" />
        </button>
      </div>
      <hr />
      {foods && foods?.length > 0 && (
        <ul className="child:factor-item my-3 max-h-64 flex-1 overflow-y-auto">
          {foods?.map(food => (
            <li key={food._id} className="flex items-center justify-between">
              <div className="flex flex-col child:leading-7">
                <span>{food.kindId?.title}</span>
                <span>{food.kindId?.price.toLocaleString()}</span>
              </div>
              <CartItemAction foodId={food._id} quantity={food.quantity} refetch={refetch} />
            </li>
          ))}
        </ul>
      )}
      <hr />
      <FactorItem text="تخفیف محصولات" value="۶۳٬۰۰۰" />
      <hr />
      <FactorItem
        text="هزینه ارسال"
        value="0"
        message="هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد."
      />
      <hr />
      <FactorItem text="مبلغ قابل پرداخت" value="۵۴۲٬۰۰۰" total={true} />
      <button className="btn btn-success rounded py-1.5 text-white">ثبت سفارش</button>
    </div>
  );
};

export default Factor;
