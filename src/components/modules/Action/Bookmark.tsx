"use client";

import { toggleBookmarkFood, toggleBookmark as toggleBookmarkRestaurantAction } from "@/services/restaurantService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineBookmark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface IBookmark {
  id?: string;
  status?: "food" | "restaurant";
  isBookmarked?: boolean;
}

const Bookmark: React.FC<IBookmark> = ({ id, status, isBookmarked = false }) => {
  const router = useRouter();

  const toggleBookmarkRestaurantHandler = async (id: string) => {
    try {
      const { message } = await toggleBookmarkRestaurantAction(id);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };

  const toggleBookmarkFoodHandler = async (id: string) => {
    try {
      const { message } = await toggleBookmarkFood(id);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <span
      className="food-wishlist-btn bookmark"
      onClick={
        status === "restaurant"
          ? () => toggleBookmarkRestaurantHandler(id as string)
          : () => toggleBookmarkFoodHandler(id as string)
      }
    >
      <HiOutlineBookmark className={twMerge("stroke-cyan-500", isBookmarked && "bookmark")} />
    </span>
  );
};

export default Bookmark;
