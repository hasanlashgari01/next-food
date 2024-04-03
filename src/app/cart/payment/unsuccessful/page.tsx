import { HiXCircle } from "react-icons/hi2";
import OrderCode from "../_components/OrderCode";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center font-Dana">
      <div className="flex flex-col items-center text-[#C30000]">
        <HiXCircle className="mb-6 h-full w-32 lg:mb-12 lg:w-64" />
        <h1 className="text-lg font-bold lg:text-[40px]">پرداخت شما با موفقیت انجام شد!</h1>
      </div>
      <OrderCode status="failed" />
      <div className="flex gap-6 text-[#417F56] max-sm:flex-col">
        <Link href="/" className="btn-payment">
          بازگشت به صفحه اصلی
        </Link>
        <Link href="/cart" className="btn-payment border border-current">
          پرداخت مجدد
        </Link>
      </div>
    </div>
  );
};

export default page;
