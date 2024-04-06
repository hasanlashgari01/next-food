"use client";

import { incrementFood } from "@/services/cartService";
import toast from "react-hot-toast";

interface IButtonProps {
  foodId: string;
}

const Button: React.FC<IButtonProps> = ({ foodId }) => {
  const incrementCart = async () => {
    console.log("🚀 ~ foodId:", foodId);
    const res = await incrementFood(foodId);
    console.log(res);
  };

  return (
    <button className="btn btn-primary h-fit rounded-md px-3 py-1" onClick={incrementCart}>
      افزودن به سبد
    </button>
  );
};

export default Button;
