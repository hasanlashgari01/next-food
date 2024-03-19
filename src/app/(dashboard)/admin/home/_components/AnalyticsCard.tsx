import { cookieToString } from "@/utils/cookieToString";
import { cookies } from "next/headers";
import { FaRegComments } from "react-icons/fa";
import { FiUserX, FiUsers } from "react-icons/fi";
import { HiOutlineBuildingStorefront, HiOutlineQueueList } from "react-icons/hi2";
import AnalyticCard from "./AnalyticCard";

export const dynamic = "force-dynamic";

async function getData() {
  const cookieStore = cookies();
  const strCookies = cookieToString(cookieStore);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/dashboard`, { headers: { Cookie: strCookies } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const AnalyticsCard = async () => {
  const data = await getData();
  const { users, restaurants, orders, comments } = data;

  return (
    <div className="col-span-12 grid grid-cols-1 gap-3 xs:grid-cols-2 lg:gap-5 xl:col-span-8 xl:max-h-96 xl:grid-cols-2">
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
  );
};

export default AnalyticsCard;
