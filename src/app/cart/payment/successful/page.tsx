import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi2";
import OrderCode from "../_components/OrderCode";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center font-Dana text-[#417F56]">
      <div className="flex flex-col items-center">
        <HiCheckCircle className="mb-6 h-full w-32 lg:mb-12 lg:w-64" />
        <h1 className="text-lg font-bold lg:text-[40px]">پرداخت شما با موفقیت انجام شد!</h1>
      </div>
      <OrderCode status="success" />
      <div className="flex gap-6 max-sm:flex-col">
        <Link href="/" className="btn-payment border border-current">
          بازگشت به صفحه اصلی
        </Link>
        <Link
          href={`/user/orders/`}
          className="btn-payment bg-[#417F56] text-neutral-100 hover:bg-green-800 dark:bg-[#417F56] dark:text-neutral-100 dark:hover:bg-[#2D5D49]"
        >
          پیگیری سفارش
        </Link>
      </div>
    </div>
  );
};

export default page;
