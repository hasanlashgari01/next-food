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
      className={`relative flex w-dvw bg-primary-900 lg:w-2/5 ${height} rounded-b-[36px]  shadow-lg lg:h-auto lg:rounded-[30px]`}
    >
      <Image
        src="/Auth.png"
        alt="سر آشپز"
        width={500}
        height={500}
        className="mx-auto h-full object-cover max-lg:w-72 max-lg:object-top lg:h-auto lg:max-w-sm lg:self-end xl:max-w-md"
      />
      <div className="absolute bottom-full top-10 h-36 max-h-56 w-72 rounded-3xl bg-white px-5 py-2 shadow-2xl max-lg:hidden lg:left-5 xl:bottom-20 xl:left-20 xl:top-auto">
        <Line className="" options={options} data={data} />
      </div>
      {/* Card */}
      <div className="absolute -right-20 top-20 w-48 rounded-2xl bg-white p-5 shadow-2xl max-lg:hidden">
        <Image src="/auth-food.jpg" alt="سر آشپز" width={500} height={500} className="w-full rounded-xl object-cover" />
        <div className="mt-3">
          <h3 className="text-lg/8 font-bold text-primary-900">سوشی</h3>
          <Link
            href="/"
            className="mt-1 inline-block rounded-full border-2 px-2 py-0.5 text-sm font-medium text-slate-500 transition-colors duration-200 ease-linear hover:bg-lime-100 hover:text-black"
          >
            دریایی
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
