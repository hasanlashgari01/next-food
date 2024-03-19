"use client";

import { useGetDashboard } from "@/hooks/useAdmin";
import { barChartData, options } from "@/vendor/barChart";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RestaurantChart = () => {
  const { isLoading, data } = useGetDashboard();
  if (isLoading)
    return <div className="col-span-12 min-h-full animate-pulse rounded-xl bg-white dark:bg-slate-800"></div>;

  const restaurantChart = barChartData(data?.restaurants.monthlyRestaurantsCount, "month", "total");

  return (
    <>
      <h3 className="mb-5 text-center text-xl dark:text-white">ثبت نام رستوران ها در هر ماه</h3>
      <Bar data={restaurantChart} options={options} />
    </>
  );
};

export default RestaurantChart;
