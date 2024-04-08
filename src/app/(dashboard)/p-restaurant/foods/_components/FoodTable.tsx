"use client";

import { IFood, IDiscount } from "@/common/interface/food";
import { IMenuData } from "@/common/interface/restaurant";
import Table from "@/components/modules/Table/Table";
import { useGetUser } from "@/hooks/useAuth";
import { useDeleteFood, useGetFoodList } from "@/hooks/useRestaurant";
import { fileRoute } from "@/services/routeService";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiOutlineTrash } from "react-icons/hi2";

const columnHelper = createColumnHelper();

const FoodTable = () => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { isLoading, data, refetch } = useGetFoodList(restaurant || "");
  const { mutateAsync } = useDeleteFood();

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("image", {
      header: () => <span>عکس</span>,
      cell: info => (
        <div className="h-10 w-10 overflow-hidden whitespace-nowrap">
          {info.getValue() ? (
            <Image
              src={info.getValue() ? `${fileRoute}food/${info.getValue()}` : "/Auth.png"}
              alt="پروفایل"
              width={100}
              height={100}
              loading="lazy"
              className="size-full rounded-full object-cover object-top transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <span>-----------</span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("title", {
      header: () => <span>عنوان</span>,
      cell: info => (
        <div className="overflow-hidden whitespace-nowrap max-md:w-20">
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => <span>قیمت</span>,
      cell: info => {
        const price = info.getValue() as string;
        return (
          <div className="overflow-hidden max-md:w-20">
            <span>{price ? `${price.toLocaleString()} تومان` : "-----------"}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("menuId", {
      header: () => <span>منو</span>,
      cell: ({ getValue }: { getValue: () => IMenuData }) => (
        <div className="w-20 overflow-hidden">
          <span>{getValue()?.title ? getValue().title : "-----------"}</span>
        </div>
      ),
    }),
    columnHelper.accessor("discount", {
      header: () => <span>درصد</span>,
      cell: ({ getValue }: { getValue: () => { percent: IDiscount["percent"] } }) => (
        <div className="w-20 overflow-hidden">
          <span>{getValue()?.percent !== null || undefined ? getValue()?.percent : "-----------"}</span>
        </div>
      ),
    }),
    columnHelper.accessor("discount", {
      header: () => <span>شروع</span>,
      cell: ({ getValue }: { getValue: () => { startDate: IDiscount["startDate"] } }) => (
        <div className="w-20 overflow-hidden">
          <span>
            {getValue()?.startDate
              ? new Date(getValue()?.startDate as Date)?.toLocaleDateString("fa-IR")
              : "-----------"}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("discount", {
      header: () => <span>اتمام</span>,
      cell: ({ getValue }: { getValue: () => { endDate: IDiscount["endDate"] } }) => (
        <div className="w-20 overflow-hidden">
          <span>
            {getValue()?.endDate ? new Date(getValue().endDate as Date)?.toLocaleDateString("fa-IR") : "-----------"}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("_id", {
      header: () => <span></span>,
      cell: info => (
        <div className="w-20 overflow-hidden">
          <div className="flex min-w-20 flex-wrap gap-1.5">
            <Link
              href={`/p-restaurant/foods/${info.getValue()}/edit`}
              className="table-btn bg-amber-200 dark:bg-amber-700"
            >
              <HiMiniPencilSquare />
            </Link>
            <span className="table-btn bg-red-200 dark:bg-red-700" onClick={() => deleteFood(info.getValue())}>
              <HiOutlineTrash />
            </span>
          </div>
        </div>
      ),
    }),
  ];

  const deleteFood = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      {!isLoading && data && (
        <Table
          count={data?.count || data.foods?.length}
          data={data?.foods ? data.foods : []}
          columns={columns}
          notFoundMsg="غذا"
        />
      )}
    </div>
  );
};

export default FoodTable;
