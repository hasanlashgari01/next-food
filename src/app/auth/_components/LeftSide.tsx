"use client";

import { data, options } from "@/vendor/chart";
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from "chart.js";
import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LeftSide: React.FC<{ height: string }> = ({ height }) => {
  return (
    <div
      className={`relative flex bg-primary-900 w-dvw lg:w-2/5 ${height} lg:h-auto  rounded-b-[36px] lg:rounded-[30px] shadow-lg`}
    >
      <Image
        src="/Auth.png"
        alt="سر آشپز"
        width={500}
        height={500}
        className="lg:self-end max-lg:w-72 lg:max-w-sm xl:max-w-md h-full lg:h-auto mx-auto object-cover max-lg:object-top"
      />
      <div className="absolute max-lg:hidden lg:left-5 xl:left-20 bottom-full top-10 xl:top-auto xl:bottom-20 w-72 h-36 max-h-56 px-5 py-2 bg-white rounded-3xl shadow-2xl">
        <Line className="" options={options} data={data} />
      </div>
      {/* Card */}
      <div className="absolute max-lg:hidden -right-20 top-20 w-48 bg-white p-5 rounded-2xl shadow-2xl">
        <Image src="/auth-food.jpg" alt="سر آشپز" width={500} height={500} className="w-full object-cover rounded-xl" />
        <div className="mt-3">
          <h3 className="font-bold text-lg/8 text-primary-900">سوشی</h3>
          <Link
            href="/"
            className="inline-block mt-1 font-medium text-sm text-slate-500 hover:text-black hover:bg-lime-100 px-2 py-0.5 border-2 rounded-full transition-colors duration-200 ease-linear"
          >
            دریایی
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
