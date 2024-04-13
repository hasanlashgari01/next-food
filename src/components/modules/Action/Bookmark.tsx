"use client";

import { toggleBookmark as toggleBookmarkRestaurantAction } from "@/services/restaurantService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineBookmark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import LoginModal from "../Modal/LoginModal";

interface IBookmark {
  id?: string;
  status?: "food" | "restaurant";
  isBookmarked?: boolean;
}

const Bookmark: React.FC<IBookmark> = ({ id, status, isBookmarked = false }) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);

  const toggleBookmarkRestaurant = async (id: string) => {
    try {
      const { message } = await toggleBookmarkRestaurantAction(id);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      error?.response?.status == 401 && setIsShow(true);
    }
  };

  const toggleBookmark = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <span
        className="food-wishlist-btn bookmark"
        onClick={
          status === "restaurant" ? () => toggleBookmarkRestaurant(id as string) : () => toggleBookmark(id as string)
        }
      >
        <HiOutlineBookmark className={twMerge("stroke-cyan-500", isBookmarked && "bookmark")} />
      </span>
      <LoginModal isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default Bookmark;
