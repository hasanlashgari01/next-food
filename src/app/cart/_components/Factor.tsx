import { ICart, ICartItem } from "@/common/interface/cart";
import CartItemAction from "@/components/modules/Cart/CartItemAction";
import { calcFoodDiscount, calculateTotalCart } from "@/utils/func";
import { HiChevronLeft, HiOutlineCheckCircle, HiOutlineTrash, HiOutlineWallet } from "react-icons/hi2";
import FactorItem from "./FactorItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TPayment } from "@/common/interface/order";
import { useCreateOrder } from "@/hooks/useCart";
import toast from "react-hot-toast";

interface FactorProps {
  foods: ICartItem[] | [];
  refetch: () => void;
  setIsModalOpen: (value: boolean) => void;
  step: number;
  nextStep: () => void;
  paymentMethod: TPayment;
  couponResult: { amount: number; type: string };
  order: any;
  setOrder: Dispatch<SetStateAction<any>>;
}

const Factor: React.FC<FactorProps> = ({
  foods,
  refetch,
  setIsModalOpen,
  step,
  nextStep,
  paymentMethod,
  couponResult,
  order,
  setOrder,
}) => {
  const { mutateAsync } = useCreateOrder();
  const [shippingAmount, setShippingAmount] = useState(10000);
  const { sum: total, discount } = calculateTotalCart(foods as ICart["foods"], shippingAmount);
  const [totalWithCoupon, setTotalWithCoupon] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    if (couponResult.type === "fixedProduct") {
      setTotalWithCoupon(total - couponResult.amount);
    } else if (couponResult.type === "percent") {
      setTotalWithCoupon(total - (total * couponResult.amount) / 100);
    }
  }, [couponResult]);

  useEffect(() => {
    totalWithCoupon > 0 && setCouponDiscount(total - totalWithCoupon);
  }, [totalWithCoupon]);

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
                      <span>{food.food?.title}</span>
                      <span>{food.food?.price.toLocaleString()}</span>
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

  const paymentHandler = async () => {
    const orderData = { ...order, paymentMethod, total, discount };

    try {
      const { message } = await mutateAsync(orderData);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="box col-span-1 flex h-fit flex-col p-6">
      <div className="mb-3 hidden items-center justify-between  text-sm/8 lg:flex">
        <span className="text-[#353535] dark:text-white">سبد خرید ({foods.length})</span>
        <button className="cart__topbar-btn bg-transparent" onClick={() => setIsModalOpen(true)}>
          <HiOutlineTrash className="text-lg" />
        </button>
      </div>
      {renderStep()}
      <FactorItem text="تخفیف محصولات" value={discount.toLocaleString()} />
      <hr className="dark:border-slate-700" />
      {couponDiscount > 0 && (
        <>
          <FactorItem text="تخفیف کوپن" value={couponDiscount.toLocaleString()} />
          <hr className="dark:border-slate-700" />
        </>
      )}
      <FactorItem
        text="هزینه ارسال"
        value={shippingAmount.toLocaleString()}
        message="هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد."
      />
      <hr className="dark:border-slate-700" />
      <FactorItem
        text="مبلغ قابل پرداخت"
        value={totalWithCoupon === 0 ? total.toLocaleString() : totalWithCoupon.toLocaleString()}
        total={true}
      />
      <button className="btn btn-success rounded py-1.5 text-white" onClick={step > 2 ? paymentHandler : nextStep}>
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
