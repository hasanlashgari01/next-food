"use client";

import { toggleBookmark as toggleBookmarkRestaurantAction } from "@/services/restaurantService";
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

  const toggleBookmarkRestaurant = async (id: string) => {
    try {
      const { message } = await toggleBookmarkRestaurantAction(id);
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
      className="food-wishlist-btn bookmark"
      onClick={
        status === "restaurant" ? () => toggleBookmarkRestaurant(id as string) : () => toggleBookmark(id as string)
      }
    >
      <HiOutlineBookmark className={twMerge("stroke-cyan-500", isBookmarked && "bookmark")} />
    </span>
  );
};

export default Bookmark;
