"use client";

import FoodWishlist from "@/components/modules/Whishlist/FoodWishlist";
import { useGetUser } from "@/hooks/useAuth";
import NotFound from "../../../../../components/modules/Whishlist/NotFound";

const WishlistFood = () => {
  const { isLoading, data } = useGetUser();

  return (
    <div className="grid grid-cols-6 gap-6 xl:grid-cols-12 xl:gap-12">
      <div className="col-span-6 mt-5">
        <h2 className="text-xl">مورد علاقه ها</h2>
        <div className="mt-6 grid place-items-center gap-x-4 gap-y-12 xs:grid-cols-2">
          {!isLoading &&
            data?.likedFoods.map((item, index) => (
              <FoodWishlist key={index} status="like" image={item.image as string} title={item.title} id={item._id} />
            ))}
          <NotFound data={data?.likedFoods} isLoading={isLoading} />
        </div>
      </div>
      <div className="col-span-6 mt-5">
        <h2 className="text-xl">ذخیره شده ها</h2>
        <div className="mt-6 grid place-items-center gap-x-4 gap-y-12 xs:grid-cols-2">
          {!isLoading &&
            data?.bookmarkedFoods.map((item, index) => (
              <FoodWishlist
                key={index}
                status="bookmark"
                image={item.image as string}
                title={item.title}
                id={item._id}
              />
            ))}
          <NotFound data={data?.bookmarkedFoods} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
export default WishlistFood;
