"use client";

import LoginModal from "@/components/modules/Modal/LoginModal";
import { useDecrementFood, useGetCart, useIncrementFood } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMinus, HiOutlineShoppingBag, HiPlus } from "react-icons/hi2";

interface IButtonProps {
  foodId: string;
}

const Button: React.FC<IButtonProps> = ({ foodId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoading, data, refetch } = useGetCart();
  const { mutateAsync } = useIncrementFood();
  const { mutateAsync: mutateAsyncDecrement } = useDecrementFood();
  const [isShow, setIsShow] = useState(false);

  const existInCart = data?.foods.find(({ food }) => food?._id === foodId);

  useEffect(() => {
    refetch();
  }, [data, isLoading]);

  const incrementCart = async () => {
    try {
      const { message } = await mutateAsync(existInCart?._id ?? foodId);
      toast.success(message);
      refetch();
    } catch (error: any) {
      const res = error?.response;
      res?.status == 401 ? setIsShow(true) : toast.error(res?.data?.message);
    }
  };

  const decrementCart = async () => {
    try {
      if (!existInCart) return;
      const { message } = await mutateAsyncDecrement(existInCart?._id);
      toast.success(message);
      refetch();
      refetch();
    } catch (error: any) {
      const res = error?.response;
      res?.status == 401 ? setIsShow(true) : toast.error(res?.data?.message);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <button className="cart-btn" onClick={incrementCart}>
        {existInCart ? <HiPlus className="text-white" /> : <HiOutlineShoppingBag className="text-white" />}
      </button>

      {existInCart?.quantity && existInCart?.quantity >= 0 && (
        <>
          <span className="md:text-lg">{existInCart?.quantity}</span>

          <button className="cart-btn" onClick={decrementCart}>
            <HiMinus className="text-white" />
          </button>
        </>
      )}
      <LoginModal isShow={isShow} setIsShow={setIsShow} />
    </div>
  );
};

export default Button;
