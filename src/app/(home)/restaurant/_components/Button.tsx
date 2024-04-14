"use client";

import { IBasketItem } from "@/common/interface/cart";
import LoginModal from "@/components/modules/Modal/LoginModal";
import { useIncrementFood } from "@/hooks/useCart";
import { useBasket } from "@/store/basket";
import { useState } from "react";
import toast from "react-hot-toast";

interface IButtonProps {
  foodId: string;
  food: IBasketItem;
}

const Button: React.FC<IButtonProps> = ({ foodId, food }) => {
  const { mutateAsync } = useIncrementFood();
  const { actions } = useBasket();
  const [isShow, setIsShow] = useState(false);

  const incrementCart = async () => {
    try {
      actions.addBasketItem(food);
      const { message } = await mutateAsync(foodId);
      toast.success(message);
    } catch (error: any) {
      error?.response?.status == 401 && setIsShow(true);
    }
  };

  return (
    <>
      <button className="btn btn-primary h-fit rounded-md px-3 py-1" onClick={incrementCart}>
        افزودن به سبد
      </button>
      <LoginModal isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default Button;
