"use client";

import { toggleLike } from "@/services/restaurantService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineHeart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface ILike {
  id?: string;
  status?: "food" | "restaurant";
  isLiked?: boolean;
}

const Like: React.FC<ILike> = ({ id, status, isLiked = false }) => {
  const router = useRouter();

  const toggleLikeRestaurant = async (id: string) => {
    try {
      const { message } = await toggleLike(id);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const toggleBookmark = (id: string) => {
    console.log(id);
  };

  return (
    <span
      className="food-wishlist-btn like"
      onClick={status === "restaurant" ? () => toggleLikeRestaurant(id as string) : () => toggleBookmark(id as string)}
    >
      <HiOutlineHeart className={twMerge("stroke-red-500 ", isLiked && "like")} />
    </span>
  );
};

export default Like;
