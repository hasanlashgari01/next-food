"use client";

import { useGetDashboard } from "@/hooks/useAdmin";
import { options, pieChartData } from "@/vendor/pieChart";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = () => {
  const { isLoading, data } = useGetDashboard();
  if (isLoading)
    return <div className="col-span-12 min-h-full animate-pulse rounded-xl bg-white dark:bg-slate-800"></div>;

  const genderChart = pieChartData(data?.users.genderCount, "gender", "count");

  return (
    <div className="rounded-xl bg-white p-5 lg:rounded-2xl xl:col-span-12 dark:bg-slate-800">
      <h3 className="mb-5 text-center text-xl dark:text-white">جنسیت</h3>
      <Pie data={genderChart} options={options} />
    </div>
  );
};

export default GenderChart;
