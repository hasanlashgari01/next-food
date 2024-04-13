import { useGetCart } from "@/hooks/useCart";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import { ICart } from "@/common/interface/cart";
import { calculateTotalCart } from "@/utils/func";

const Cart = () => {
  const { isLoading, data, refetch } = useGetCart();
  const [isOpen, setIsOpen] = useState(false);
  const foods = isLoading ? [] : data?.foods;

  const total = calculateTotalCart(foods as ICart["foods"], 0);

  return (
    <div className="relative">
      <div
        className={twMerge(
          "relative flex size-12 cursor-pointer items-center justify-center rounded-full bg-background transition-all duration-200 ease-linear lg:size-14  lg:bg-white dark:bg-slate-700",
          `${isOpen ? "z-20" : "z-0"}`,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiOutlineShoppingCart className="size-6 lg:size-7 dark:text-white" />
      </div>
      <div
        className={twMerge(
          "fixed inset-0 bg-slate-900/60 transition-all duration-200 ease-linear dark:bg-slate-950/70",
          `${isOpen ? "visible z-10 opacity-100" : "invisible opacity-0"}`,
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-5 flex w-fit -translate-x-16 flex-col overflow-hidden rounded-xl bg-slate-100 shadow-lg transition-all duration-300 ease-linear sm:-translate-x-8 dark:bg-slate-800 dark:shadow-none">
          <CartHeader count={foods?.length} total={Number(total)} />

          <hr className="dark:border-slate-700" />

          <CartList isLoading={isLoading} data={data as ICart} refetch={refetch} />

          <hr className="dark:border-slate-700" />

          <CartFooter count={foods?.length} total={Number(total)} refetch={refetch} />
        </div>
      )}
    </div>
  );
};

export default Cart;
