"use client";

import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import Bookmark from "../Action/Bookmark";
import Like from "../Action/Like";

interface IFoodProps {
  status: "like" | "bookmark";
  image: string;
  id?: number;
  title?: string;
}

const FoodWishlist: React.FC<IFoodProps> = ({ status, image = "/auth-food.jpg", id, title }) => {
  const getImage = image === "/auth-food.jpg" ? "/auth-food.jpg" : `${fileRoute}food/${image}`;

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
      <div className="absolute left-5 top-5 flex flex-col gap-2">{status === "like" ? <Like /> : <Bookmark />}</div>
    </div>
  );
};

export default FoodWishlist;
