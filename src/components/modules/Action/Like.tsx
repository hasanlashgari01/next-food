"use client";

import { toggleLike, toggleLikeFood } from "@/services/restaurantService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineHeart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface ILike {
  id?: string;
  status?: "food" | "restaurant";
  isLiked?: boolean;
}

const Like: React.FC<ILike> = ({ id, status, isLiked = true }) => {
  const router = useRouter();

  const toggleLikeRestaurantHandler = async (id: string) => {
    try {
      const { message } = await toggleLike(id);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };

  const toggleLikeFoodHandler = async (id: string) => {
    try {
      const { message } = await toggleLikeFood(id);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <span
      className="food-wishlist-btn like"
      onClick={
        status === "restaurant"
          ? () => toggleLikeRestaurantHandler(id as string)
          : () => toggleLikeFoodHandler(id as string)
      }
    >
      <HiOutlineHeart className={twMerge("stroke-red-500 ", isLiked && "like")} />
    </span>
  );
};

export default Like;
