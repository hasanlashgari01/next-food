import Image from "next/image";
import Like from "../Action/Like";
import Bookmark from "../Action/Bookmark";
import { fileRoute } from "@/services/routeService";
import { useUnBookmarkRestaurant, useUnLikeRestaurant } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useToggleBookmark, useToggleLike } from "@/hooks/useRestaurant";
import Link from "next/link";

interface IRestaurantProps {
  defaultImage?: string;
  status: "like" | "bookmark";
  image: string;
  id?: string;
  name: string | undefined;
  slug: string | undefined;
  refetch?: () => void | undefined;
}

const RestaurantWishlist: React.FC<IRestaurantProps> = ({
  status,
  image,
  defaultImage = "/Auth.png",
  id,
  name,
  slug,
  refetch,
}) => {
  const { mutateAsync: mutateAsyncToggleLike } = useToggleLike();
  const { mutateAsync: mutateAsyncToggleBookmark } = useToggleBookmark();

  const getImage = image ? `${fileRoute}restaurant/${image}` : defaultImage;

  const toggleLike = async (id: string) => {
    try {
      const { message } = await mutateAsyncToggleLike(id);
      toast.success(message);
      refetch && refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const toggleBookmark = async (id: string) => {
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
        <Link
          href={`/restaurant/${slug}`}
          className="mt-4 line-clamp-2 min-h-10 text-sm/5 sm:text-base/6 xl:max-h-16 xl:text-lg/8"
        >
          {name}
        </Link>
      </div>
      <div
        className="absolute left-5 top-5 flex flex-col gap-2"
        onClick={status === "like" ? () => toggleLike(id as string) : () => toggleBookmark(id as string)}
      >
        {status === "like" ? <Like /> : <Bookmark />}
      </div>
    </div>
  );
};
export default RestaurantWishlist;
