"use client";

import { useToggleBookmark, useToggleLike } from "@/hooks/useFood";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import toast from "react-hot-toast";
import Bookmark from "../Action/Bookmark";
import Like from "../Action/Like";

interface IFoodProps {
  status: "like" | "bookmark";
  image: string;
  id?: string;
  title: string | undefined;
  refetch?: () => void;
}

const FoodWishlist: React.FC<IFoodProps> = ({ status, image = "/auth-food.jpg", id, title, refetch }) => {
  const { mutateAsync: mutateAsyncToggleLike } = useToggleLike();
  const { mutateAsync: mutateAsyncToggleBookmark } = useToggleBookmark();

  const getImage = image === "/auth-food.jpg" ? "/auth-food.jpg" : `${fileRoute}food/${image}`;

  const unLikeHandler = async (id: string) => {
    try {
      const { message } = await mutateAsyncToggleLike(id);
      toast.success(message);
      refetch && refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const unBookmarkHandler = async (id: string) => {
    try {
      const { message } = await mutateAsyncToggleBookmark(id);
      toast.success(message);
      refetch && refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="relative flex w-fit rounded-2xl bg-white md:w-56 xl:w-11/12 dark:bg-slate-800">
      <div className="flex flex-col p-4 sm:flex-auto sm:px-2.5 sm:py-3">
        <div className="self-center overflow-hidden rounded-[10px] bg-red-400 md:h-52 md:w-full">
          <Image
            src={getImage}
            alt="پروفایل"
            width={200}
            height={200}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <h3 className="mt-4 line-clamp-2 min-h-10 text-sm/5 sm:text-base/6 xl:max-h-16 xl:text-lg/8">{title}</h3>
      </div>
      <div
        className="absolute left-5 top-5 flex flex-col gap-2"
        onClick={() => (status === "like" ? unLikeHandler(id || "") : unBookmarkHandler(id || ""))}
      >
        {status === "like" ? <Like isLiked={true} /> : <Bookmark isBookmarked={true} />}
      </div>
    </div>
  );
};

export default FoodWishlist;
