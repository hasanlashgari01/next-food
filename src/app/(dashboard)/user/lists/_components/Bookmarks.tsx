import { IData } from "@/common/interface/getData";
import { IWhishlist } from "@/common/interface/user";
import FoodWishlist from "@/components/modules/Whishlist/FoodWishlist";
import NotFound from "@/components/modules/Whishlist/NotFound";
import RestaurantWishlist from "@/components/modules/Whishlist/RestaurantWishlist";

const Bookmarks: React.FC<IData<IWhishlist>> = ({ isLoading, data, refetch }) => {
  return (
    <div className="grid gap-y-6 xs:grid-cols-2 md:grid-cols-3 lg:gap-y-12">
      <div className="col-span-full">
        <h1 className="font-Dana text-xl">غذا ها</h1>
        <div className="wishlist">
          {!isLoading &&
            data?.foodBookmarks.map(({ foodId }, index) => (
              <FoodWishlist
                key={index}
                status="bookmark"
                image={foodId.image as string}
                title={foodId.title}
                id={foodId._id}
                refetch={refetch}
              />
            ))}
        </div>
        <NotFound data={data?.foodBookmarks} isLoading={isLoading} />
      </div>
      <div className="col-span-full">
        <h1 className="font-Dana text-xl">رستوران ها</h1>
        <div className="wishlist">
          {!isLoading &&
            data?.restaurantBookmarks.map(({ restaurantId }, index) => (
              <RestaurantWishlist
                key={index}
                status="bookmark"
                image={restaurantId.logo as string}
                name={restaurantId.name}
                id={restaurantId._id}
                slug={restaurantId.slug}
                refetch={refetch}
              />
            ))}
        </div>
        <NotFound data={data?.restaurantBookmarks} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Bookmarks;
