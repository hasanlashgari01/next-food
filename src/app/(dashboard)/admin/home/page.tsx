"use client";

import { useGetDashboard } from "@/hooks/useAdmin";
import { barChartData, options as barChartOptions } from "@/vendor/barChart";
import { pieChartData, options as pieChartOptions } from "@/vendor/pieChart";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { FaRegComments } from "react-icons/fa6";
import { FiUserX, FiUsers } from "react-icons/fi";
import { HiOutlineBuildingStorefront, HiOutlineQueueList } from "react-icons/hi2";
import AnalyticCard from "../_components/AnalyticCard";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const page = () => {
  const { isLoading, data } = useGetDashboard();
  if (isLoading) return <span>Loading...</span>;
  const { users, restaurants, orders, comments } = data;
  console.log(data);

  const genderChart = pieChartData(users.genderCount, "gender", "count");
  const restaurantChart = barChartData(restaurants.monthlyRestaurantsCount, "month", "total");

  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center gap-4 pr-4">
        <span className="size-3 animate-pulse rounded-full bg-amber-600"></span>
        <h3 className="text-2xl font-semibold leading-loose text-primary-900 md:text-3xl dark:text-white">آمار کلی</h3>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid grid-cols-1 gap-3 xs:grid-cols-2 lg:gap-5 xl:col-span-8 xl:max-h-96 xl:grid-cols-2">
            <AnalyticCard name="مجموع کاربران" count={users.userCount} bgColor="bg-emerald-600" Icon={FiUsers} />
            <AnalyticCard
              name="کاربران بن شده"
              count={users.bannedUsersCount}
              bgColor="bg-primary-900"
              Icon={FiUserX}
            />
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
            <AnalyticCard
              name="مجموع کامنت ها"
              count={comments.commentCount}
              bgColor="bg-indigo-600"
              Icon={FaRegComments}
            />
            <AnalyticCard
              name="مجموع سفارش ها"
              count={orders.ordersCount}
              bgColor="bg-cyan-600"
              Icon={HiOutlineQueueList}
            />
          </div>
          <div className="col-span-12 grid h-fit grid-cols-1 gap-3 xs:grid-cols-2 lg:gap-6 xl:col-span-4">
            <div className="rounded-xl bg-white p-5 lg:rounded-2xl xl:col-span-12 dark:bg-slate-800">
              <h3 className="mb-5 text-center text-xl dark:text-white">جنسیت</h3>
              <Pie className="" data={genderChart} options={pieChartOptions} />
            </div>
          </div>
        </div>
        <div className="grid gap-3 lg:gap-6 grid-cols-12">
          <div className="rounded-xl bg-white p-5 lg:rounded-2xl col-span-12 xl:col-span-8 dark:bg-slate-800">
            <h3 className="mb-5 text-center text-xl dark:text-white">ثبت نام رستوران ها در هر ماه</h3>
            <Bar data={restaurantChart} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
