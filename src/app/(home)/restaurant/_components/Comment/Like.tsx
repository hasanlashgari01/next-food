"use client";

import LoginModal from "@/components/modules/Modal/LoginModal";
import { useToggleLikeComment } from "@/hooks/useRestaurant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineHeart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface ILikeProps {
  isLiked: boolean;
  likeCount: number;
  commentId: string;
}

const Like: React.FC<ILikeProps> = ({ isLiked = false, likeCount = 0, commentId }) => {
  const router = useRouter();
  const { mutateAsync } = useToggleLikeComment();
  const [isShow, setIsShow] = useState(false);

  const toggleLike = async () => {
    try {
      const { message } = await mutateAsync(commentId);
      toast.success(message);
      router.refresh();
    } catch (error: any) {
      const res = error?.response;
      res?.status == 401 ? setIsShow(true) : toast.error(res?.data?.message);
    }
  };

  return (
    <>
      <div className="flex h-fit w-8 flex-col items-center justify-center gap-1">
        <span className="cursor-pointer" onClick={toggleLike}>
          <HiOutlineHeart
            className={twMerge(
              "h-6 w-6 shrink-0 fill-transparent stroke-red-500 transition-colors delay-75 duration-300 ease-linear hover:stroke-red-600",
              `${isLiked && "fill-red-500 hover:fill-red-600"}`,
            )}
          />
        </span>
        <span className="cursor-default text-sm">{likeCount}</span>
      </div>
      <LoginModal isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default Like;
