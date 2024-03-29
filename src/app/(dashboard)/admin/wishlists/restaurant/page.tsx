"use client";

import RestaurantWishlist from "@/components/modules/Whishlist/RestaurantWishlist";
import { useGetUser } from "@/hooks/useAuth";
import NotFound from "../../../../../components/modules/Whishlist/NotFound";

const WishlistRestaurant = () => {
  const { isLoading, data, refetch } = useGetUser();

  return (
    <div className="grid grid-cols-6 gap-6 xl:grid-cols-12 xl:gap-12">
      <div className="col-span-6 mt-5">
        <h2 className="text-xl">مورد علاقه ها</h2>
        <div className="mt-6 grid place-items-center gap-x-4 gap-y-12 xs:grid-cols-2">
          {!isLoading &&
            data?.likedRestaurants.map((item, index) => (
              <RestaurantWishlist
                key={index}
                status="like"
                image={item.logo}
                name={item.name}
                id={item._id}
                refetch={refetch}
              />
            ))}
          <NotFound data={data?.likedRestaurants} isLoading={isLoading} />
        </div>
      </div>
      <div className="col-span-6 mt-5">
        <h2 className="text-xl">ذخیره شده ها</h2>
        <div className="mt-6 grid place-items-center gap-x-4 gap-y-12 xs:grid-cols-2">
          {!isLoading &&
            data?.bookmarkedRestaurants.map((item, index) => (
              <RestaurantWishlist
                key={index}
                status="bookmark"
                image={item.logo}
                name={item.name}
                id={item._id}
                refetch={refetch}
              />
            ))}
          <NotFound data={data?.bookmarkedRestaurants} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
export default WishlistRestaurant;
