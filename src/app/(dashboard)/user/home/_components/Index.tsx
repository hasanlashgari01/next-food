"use client";

import { useGetUser } from "@/hooks/useAuth";
import Box from "./Box";
import { toPersianDate } from "@/utils/func";
import { useGetDashboard } from "@/hooks/useUser";
import {
  HiCheckCircle,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineXCircle,
} from "react-icons/hi2";

const Index = () => {
  const { isLoading, data } = useGetUser();
  const { data: dashboardData } = useGetDashboard();

  const { persianDate } = toPersianDate(data?.createdAt);

  return (
    <>
      {!isLoading && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          <Box data={persianDate} message="تاریخ عضویت">
            <HiOutlineUser className="bg-amber-600 group-hover:bg-amber-500" />
          </Box>
          <Box count={dashboardData?.successOrders} message="سفارش های موفق">
            <HiOutlineCheckCircle className="bg-emerald-600 group-hover:bg-emerald-500" />
          </Box>
          <Box count={dashboardData?.failedOrders} message="سفارش های ناموفق">
            <HiOutlineXCircle className="bg-red-600 group-hover:bg-red-500" />
          </Box>
          <Box count={dashboardData?.countComments} message="دیدگاه ها">
            <HiOutlineChatBubbleOvalLeftEllipsis className="bg-sky-600 group-hover:bg-sky-500" />
          </Box>
        </div>
      )}
    </>
  );
};

export default Index;
