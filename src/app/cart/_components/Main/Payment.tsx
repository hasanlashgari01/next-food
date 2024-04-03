import { IPayment } from "@/common/interface/cart-page";
import { TPayment } from "@/common/interface/order";
import SelectRadio from "@/components/modules/Cart/SelectRadio";
import { paymentMethodValues } from "@/constants/radioValues";
import { getCoupon } from "@/services/cartService";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCreditCard, HiOutlineExclamationCircle, HiOutlineReceiptPercent } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface IPaymentProps {
  coupon: string;
  setCoupon: Dispatch<SetStateAction<string>>;
  setPaymentMethod: Dispatch<SetStateAction<TPayment>>;
  setCouponResult: Dispatch<SetStateAction<{ amount: number; type: string }>>;
  order: any;
  setOrder: Dispatch<SetStateAction<any>>;
}

const Payment: React.FC<IPaymentProps> = ({
  setCouponResult,
  coupon,
  setCoupon,
  setPaymentMethod,
  order,
  setOrder,
}) => {
  const [payment, setPayment] = useState<IPayment>({
    value: "ONLINE",
    label: "پرداخت اینترنتی",
  });

  useEffect(() => {
    setPaymentMethod(payment.value);
    setOrder({ ...order, payment: payment.value });
  }, [payment]);

  const couponHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await getCoupon(coupon)
      .then(res => {
        setCouponResult({ amount: res.amount, type: res.type });
        toast.success("کد تخفیف با موفقیت اعمال شد");
      })
      .catch(err => toast.error(err.response.data.message));
  };

  return (
    <div className="child:box grid grid-cols-1 gap-6">
      <div className="flex p-6 max-xl:flex-col xl:items-center xl:gap-10">
        <div className="flex gap-2">
          <HiOutlineReceiptPercent className="text-2xl" />
          <span>ثبت کد تخفیف</span>
        </div>

        <hr className="col-span-3 mb-4 mt-2 xl:hidden" />

        <form className="flex gap-5 max-xs:flex-col xs:items-center" onSubmit={e => couponHandler(e)}>
          <input
            type="text"
            className={twMerge("form__input w-full min-w-0 pr-6 sm:w-80")}
            dir="rtl"
            placeholder="کد تخفیف"
            value={coupon}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCoupon(e.currentTarget.value)}
          />
          <button
            disabled={coupon === ""}
            type="submit"
            className="btn btn-primary mb-0 max-w-fit shrink-0 disabled:cursor-not-allowed disabled:bg-opacity-50"
          >
            ثبت کد
          </button>
        </form>
      </div>
      <div>
        <SelectRadio
          data={paymentMethodValues}
          radio={payment}
          setRadio={setPayment}
          name="payment"
          icon={HiOutlineCreditCard}
          title="روش پرداخت"
        />
      </div>
      <div className="bg-neutral-100 p-4 lg:p-6 dark:bg-slate-800">
        {payment.value === "ONLINE" ? (
          <div className="flex flex-col items-center xl:flex-row xl:gap-16">
            <div className="flex shrink-0 items-center gap-1 lg:gap-2">
              <HiOutlineCreditCard className="text-base xl:text-2xl" />
              <span className="text-sm md:text-base">درگاه پرداخت</span>
            </div>

            <hr className="mb-4 mt-2 xl:hidden" />

            <div className="gap-2 text-neutral-500 md:w-3/4 lg:w-full lg:gap-1">
              <div className="flex justify-center gap-4">
                <span>بانک سامان</span>
                <span>بانک ملت</span>
                <span>بانک پارسیان</span>
              </div>
              <div className="flex flex-col text-center text-xs child:leading-6 xl:text-sm">
                <span>پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است</span>
                <span>(لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row xl:gap-16">
            <div className="flex shrink-0 items-center gap-1">
              <HiOutlineExclamationCircle className="text-base xl:text-2xl" />
              <span className="text-sm">قابل توجه</span>
            </div>

            <hr className="mb-4 mt-2 xl:hidden" />

            <p className="inline-block text-xs/5 text-neutral-500 md:w-3/4 lg:w-full xl:text-sm/8">
              هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از تحویل کالا کارت بانکی یا پول نقد همراه خود
              داشته باشید و از درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با تشکر از همراهی شما.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
