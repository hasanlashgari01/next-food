import { ICart } from "@/common/interface/cart";
import { useGetCart } from "@/hooks/useCart";
import { calculateTotalCart } from "@/utils/func";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CountBadge from "./CountBadge";

const Cart = () => {
  const { isLoading, data, refetch } = useGetCart();
  const [isOpen, setIsOpen] = useState(false);
  const foods = isLoading ? [] : data?.foods;
  const showElements = foods && foods?.length > 0;

  const { sum: total } = calculateTotalCart(foods as ICart["foods"], 0);

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
        {showElements && <CountBadge count={foods?.length} />}
      </div>
      <div
        className={twMerge("wrapper", `${isOpen ? "visible z-10 opacity-100" : "invisible opacity-0"}`)}
        onClick={() => setIsOpen(false)}
      ></div>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-5 flex min-w-72 -translate-x-16 flex-col overflow-hidden rounded-xl bg-slate-100 shadow-lg transition-all duration-300 ease-linear sm:min-w-96 sm:-translate-x-8 dark:bg-slate-800 dark:shadow-none">
          {showElements && <CartHeader count={foods?.length} total={Number(total)} />}

          <hr className="dark:border-slate-700" />

          <CartList isLoading={isLoading} data={data as ICart} refetch={refetch} />

          <hr className="dark:border-slate-700" />

          {showElements && <CartFooter count={foods?.length} total={Number(total)} refetch={refetch} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
