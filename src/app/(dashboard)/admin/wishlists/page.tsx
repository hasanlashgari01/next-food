"use client";

import { useGetUser } from "@/hooks/useAuth";
import CustomSwiper from "./_components/CustomSwiper";

const Whishlist = () => {
  const { isLoading, data } = useGetUser();

  return (
    <main className="mt-5 flex flex-col gap-10">
      {!isLoading && (
        <>
          <CustomSwiper
            status="like"
            data={data?.likedFoods || []}
            title="غذا های مورد علاقه"
            notFoundMsg="لیست غذا های مورد علاقه خالی است"
            link="food"
          />
          <CustomSwiper
            status="bookmark"
            data={data?.bookmarkedFoods || []}
            title="غذا های ذخیره شده"
            notFoundMsg="لیست غذا های ذخیره شده خالی است"
            link="food"
          />
          <CustomSwiper
            status="like"
            data={data?.likedRestaurants || []}
            title="رستوران های مورد علاقه"
            notFoundMsg="لیست رستوران های مورد علاقه خالی است"
            link="restaurant"
          />
          <CustomSwiper
            status="bookmark"
            data={data?.bookmarkedRestaurants || []}
            title="رستوران های ذخیره شده"
            notFoundMsg="لیست رستوران های ذخیره شده خالی است"
            link="restaurant"
          />
        </>
      )}
    </main>
  );
};

export default Whishlist;
