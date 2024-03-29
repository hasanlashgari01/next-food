import Image from "next/image";
import Like from "../Action/Like";
import Bookmark from "../Action/Bookmark";
import { fileRoute } from "@/services/routeService";
import { useUnBookmarkRestaurant, useUnLikeRestaurant } from "@/hooks/useUser";
import toast from "react-hot-toast";

interface IRestaurantProps {
  status: "like" | "bookmark";
  image: string;
  id?: string;
  name: string | undefined;
  refetch?: () => void;
}

const RestaurantWishlist: React.FC<IRestaurantProps> = ({ status, image = "/auth-food.jpg", id, name, refetch }) => {
  const { mutateAsync: unLikeMutateAsync } = useUnLikeRestaurant();
  const { mutateAsync: unBookmarkMutateAsync } = useUnBookmarkRestaurant();

  const getImage = image === "/auth-food.jpg" ? "/auth-food.jpg" : `${fileRoute}restaurant/${image}`;

  const unLikeHandler = async (id: string) => {
    try {
      const { message } = await unLikeMutateAsync(id);
      toast.success(message);
      refetch && refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const unBookmarkHandler = async (id: string) => {
    try {
      const { message } = await unBookmarkMutateAsync(id);
      toast.success(message);
      refetch && refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

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
      <div
        className="absolute left-5 top-5 flex flex-col gap-2"
        onClick={status === "like" ? () => unLikeHandler(id || "") : () => unBookmarkHandler(id || "")}
      >
        {status === "like" ? <Like /> : <Bookmark />}
      </div>
    </div>
  );
};
export default RestaurantWishlist;
