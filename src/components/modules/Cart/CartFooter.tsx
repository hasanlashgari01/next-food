import Link from "next/link";

const CartFooter = () => {
  return (
    <div className="flex w-full items-center justify-between self-end px-6 py-2.5 text-sm lg:text-base">
      <span className="flex gap-2">
        <span>300,000</span>
        <span>تومان</span>
      </span>
      <Link
        href="/cart"
        className="cursor-pointer rounded-md bg-teal-600 px-6 py-2.5 text-center text-white transition-colors duration-300 hover:bg-teal-700 lg:rounded-xl"
      >
        ثبت سفارش
      </Link>
    </div>
  );
};

export default CartFooter;
