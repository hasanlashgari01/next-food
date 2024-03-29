import { IData } from "@/common/interface/getData";
import { IUser } from "@/common/interface/user";
import FoodWishlist from "@/components/modules/Whishlist/FoodWishlist";
import NotFound from "@/components/modules/Whishlist/NotFound";
import RestaurantWishlist from "@/components/modules/Whishlist/RestaurantWishlist";

const Bookmarks: React.FC<IData<IUser>> = ({ isLoading, data, refetch }) => {
  return (
    <div className="mt-6 grid place-items-center gap-x-4 gap-y-12 xs:grid-cols-2">
      {!isLoading &&
        data?.bookmarkedFoods.map((item, index) => (
          <FoodWishlist key={index} status="bookmark" image={item.image} title={item.title} id={item._id} />
        ))}
      {!isLoading &&
        data?.bookmarkedRestaurants.map((item, index) => (
          <RestaurantWishlist key={index} status="bookmark" image={item.logo} name={item.name} id={item._id} />
        ))}
      <NotFound data={data?.bookmarkedFoods && data?.bookmarkedRestaurants} isLoading={isLoading} />
    </div>
  );
};

export default Bookmarks;
