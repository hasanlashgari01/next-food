import { useGetCart } from "@/hooks/useUser";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

const Cart = () => {
  const { isLoading, data } = useGetCart();
  const [isOpen, setIsOpen] = useState(false);
  const foods = data?.foods;
  console.log("🚀 ~ Cart ~ foods:", data);

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
          "fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-all duration-200 ease-linear dark:bg-slate-950/70",
          `${isOpen ? "visible z-10 opacity-100" : "invisible opacity-0"}`,
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-5 flex w-fit -translate-x-16 flex-col overflow-hidden rounded-xl bg-slate-100 shadow-lg transition-all duration-300 ease-linear sm:-translate-x-8 dark:bg-slate-800 dark:shadow-none">
          <div className="flex w-full items-center gap-1 self-end px-6 py-2.5 text-sm text-sky-600 lg:text-base">
            <span>{foods?.length}</span>
            <span>مورد</span>
          </div>

          <hr className="dark:border-slate-700" />

          <div className="h-96 shrink-0 overflow-y-auto scroll-smooth">
            {!isLoading && foods && foods.length > 0 ? (
              <ul className="flex min-w-72 flex-col py-2 xs:min-w-[27rem]">
                {foods.map(food => (
                  <CartItem key={food._id} food={food} />
                ))}
              </ul>
            ) : (
              <div className="flex h-72 items-center justify-center bg-blue-300/20">
                <span className="text-2xl font-bold dark:text-white">سبد خرید شما خالی است</span>
              </div>
            )}
          </div>

          <hr className="dark:border-slate-700" />

          <CartFooter />
        </div>
      )}
    </div>
  );
};

export default Cart;
