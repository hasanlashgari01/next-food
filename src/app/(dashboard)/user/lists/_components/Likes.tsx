import { IData } from "@/common/interface/getData";
import { IUser } from "@/common/interface/user";
import FoodWishlist from "@/components/modules/Whishlist/FoodWishlist";
import NotFound from "@/components/modules/Whishlist/NotFound";
import RestaurantWishlist from "@/components/modules/Whishlist/RestaurantWishlist";

const FoodLikes: React.FC<IData<IUser>> = ({ isLoading, data, refetch }) => {
  return (
    <div className="mt-6 grid place-items-center gap-x-4 gap-y-12 xs:grid-cols-2">
      {!isLoading &&
        data?.likedFoods.map((item, index) => (
          <FoodWishlist key={index} status="like" image={item.image} title={item.title} id={item._id} />
        ))}
      {!isLoading &&
        data?.likedRestaurants.map((item, index) => (
          <RestaurantWishlist key={index} status="like" image={item.logo} name={item.name} id={item._id} />
        ))}
      <NotFound data={data?.likedFoods && data?.likedRestaurants} isLoading={isLoading} />
    </div>
  );
};

export default FoodLikes;
