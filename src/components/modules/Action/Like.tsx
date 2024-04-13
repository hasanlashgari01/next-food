"use client";

import { toggleLike } from "@/services/restaurantService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineHeart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import LoginModal from "../Modal/LoginModal";

interface ILike {
  id?: string;
  status?: "food" | "restaurant";
  isLiked?: boolean;
}

const Like: React.FC<ILike> = ({ id, status, isLiked = true }) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);

  const toggleLikeRestaurant = async (id: string) => {
    try {
      const { message } = await toggleLike(id);
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
        className="food-wishlist-btn like"
        onClick={
          status === "restaurant" ? () => toggleLikeRestaurant(id as string) : () => toggleBookmark(id as string)
        }
      >
        <HiOutlineHeart className={twMerge("stroke-red-500 ", isLiked && "like")} />
      </span>
      <LoginModal isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default Like;
