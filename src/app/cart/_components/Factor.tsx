import { ICart, ICartItem } from "@/common/interface/cart";
import CartItemAction from "@/components/modules/Cart/CartItemAction";
import { calculateTotalCart } from "@/utils/func";
import { HiChevronLeft, HiOutlineCheckCircle, HiOutlineTrash, HiOutlineWallet } from "react-icons/hi2";
import FactorItem from "./FactorItem";
import { useState } from "react";

interface FactorProps {
  foods: ICartItem[] | [];
  refetch: () => void;
  setIsModalOpen: (value: boolean) => void;
  step: number;
  nextStep: () => void;
}

const Factor: React.FC<FactorProps> = ({ foods, refetch, setIsModalOpen, step, nextStep }) => {
  const [shippingAmount, setShippingAmount] = useState(10000);
  const { sum: total, discount } = calculateTotalCart(foods as ICart["foods"], shippingAmount);

  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <>
            <hr className="dark:border-slate-700" />
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
            <hr className="dark:border-slate-700" />
          </>
        );
    }
  };

  return (
    <div className="col-span-1 flex h-fit flex-col rounded-lg border border-neutral-300 p-6 dark:border-slate-700">
      <div className="mb-3 hidden items-center justify-between  text-sm/8 lg:flex">
        <span className="text-[#353535] dark:text-white">سبد خرید ({foods.length})</span>
        <button className="cart__topbar-btn bg-transparent" onClick={() => setIsModalOpen(true)}>
          <HiOutlineTrash className="text-lg" />
        </button>
      </div>
      {renderStep()}
      <FactorItem text="تخفیف محصولات" value={discount.toLocaleString()} />
      <hr className="dark:border-slate-700" />
      <FactorItem
        text="هزینه ارسال"
        value={shippingAmount.toLocaleString()}
        message="هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد."
      />
      <hr className="dark:border-slate-700" />
      <FactorItem text="مبلغ قابل پرداخت" value={total.toLocaleString()} total={true} />
      <button className="btn btn-success rounded py-1.5 text-white" onClick={nextStep}>
        {step === 1 && (
          <span className="flex items-center gap-2">
            <span>تکمیل اطلاعات</span>
            <HiChevronLeft className="text-2xl" />
          </span>
        )}
        {step === 2 && (
          <span className="flex items-center gap-2">
            <HiOutlineCheckCircle className="text-2xl" />
            <span>ثبت سفارش</span>
          </span>
        )}
        {step === 3 && (
          <span className="flex items-center gap-2">
            <HiOutlineWallet className="text-2xl" />
            <span>تایید و پرداخت</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default Factor;
