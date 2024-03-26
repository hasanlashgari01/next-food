import Image from "next/image";
import Like from "../Action/Like";
import Bookmark from "../Action/Bookmark";
import { fileRoute } from "@/services/routeService";

interface IRestaurantProps {
  status: "like" | "bookmark";
  image: string;
  id?: number;
  name?: string;
}

const RestaurantWishlist: React.FC<IRestaurantProps> = ({ status, image = "/auth-food.jpg", id, name }) => {
  const getImage = image === "/auth-food.jpg" ? "/auth-food.jpg" : `${fileRoute}restaurant/${image}`;

  return (
    <div className="relative flex w-fit rounded-2xl bg-white md:w-56 xl:w-11/12 dark:bg-slate-800">
      <div className="flex flex-col p-4 sm:flex-auto sm:px-2.5 sm:py-3">
        <div className="aspect-square h-full self-center overflow-hidden rounded-[10px] bg-red-400 md:h-52 md:w-full">
          <Image
            src={getImage}
            alt="پروفایل"
            width={200}
            height={200}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <h3 className="mt-4 line-clamp-2 min-h-10 text-sm/5 sm:text-base/6 xl:max-h-16 xl:text-lg/8">{name}</h3>
      </div>
      <div className="absolute left-5 top-5 flex flex-col gap-2">{status === "like" ? <Like /> : <Bookmark />}</div>
    </div>
  );
};
export default RestaurantWishlist;
