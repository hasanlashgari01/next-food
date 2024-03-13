"use client";

import { useGetDashboard } from "@/hooks/useAdmin";
import { FaRegComments } from "react-icons/fa6";
import { FiUserX, FiUsers } from "react-icons/fi";
import { HiOutlineBuildingStorefront, HiOutlineQueueList } from "react-icons/hi2";
import AnalyticCard from "../_components/AnalyticCard";

const page = () => {
  const { isLoading, data } = useGetDashboard();
  if (isLoading) return <span>Loading...</span>;
  console.log(data);
  const { users, restaurants, orders, comments } = data;

  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center gap-4 pr-4">
        <span className="size-3 animate-pulse bg-amber-600 rounded-full"></span>
        <h3 className="text-2xl font-semibold leading-loose text-primary-900 md:text-3xl dark:text-white">آمار کلی</h3>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="xs:grid-cols-2 col-span-12 grid grid-cols-1 gap-3 lg:col-span-12 lg:gap-6 xl:col-span-8 xl:grid-cols-2">
          <AnalyticCard name="مجموع کاربران" count={users.userCount} bgColor="bg-emerald-600" Icon={FiUsers} />
          <AnalyticCard name="کاربران بن شده" count={users.bannedUsersCount} bgColor="bg-primary-900" Icon={FiUserX} />
          <AnalyticCard
            name="مجموع رستوران ها"
            count={restaurants.restaurantCount}
            bgColor="bg-red-600"
            Icon={HiOutlineBuildingStorefront}
          />
          <AnalyticCard
            name="رستوران های بن شده"
            count={restaurants.bannedRestaurantsCount}
            bgColor="bg-amber-600"
            Icon={HiOutlineBuildingStorefront}
          />
          <AnalyticCard name="مجموع کامنت ها" count={comments.commentCount} bgColor="bg-indigo-600" Icon={FaRegComments} />
          <AnalyticCard name="مجموع سفارش ها" count={orders.ordersCount} bgColor="bg-cyan-600" Icon={HiOutlineQueueList} />
        </div>
        <div className="col-span-4 grid"></div>
      </div>
    </div>
  );
};

export default page;
