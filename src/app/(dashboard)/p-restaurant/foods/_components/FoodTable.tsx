"use client";

import Table from "@/components/modules/Table/Table";
import { useGetUser } from "@/hooks/useAuth";
import { useDeleteMenu, useGetFoodList, useGetMenuList } from "@/hooks/useRestaurant";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiOutlineTrash } from "react-icons/hi2";

const columnHelper = createColumnHelper();

const FoodTable = () => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { isLoading, data, refetch } = useGetFoodList(restaurant || "");
  console.log("🚀 ~ FoodTable ~ data:", data?.foods[10]);
  const { mutateAsync } = useDeleteMenu();

  const columns: ColumnDef<unknown, never>[] = [
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
      cell: info => (
        <div className="w-20 overflow-hidden">
          <span>{info.getValue() ? info.getValue() : "-----------"}</span>
        </div>
      ),
    }),
    columnHelper.accessor("weight", {
      header: () => <span>وزن</span>,
      cell: info => (
        <div className="w-20 overflow-hidden">
          <span>{info.getValue() ? info.getValue() : "-----------"}</span>
        </div>
      ),
    }),
    columnHelper.accessor("_id", {
      header: () => <span></span>,
      cell: info => (
        <div className="w-20 overflow-hidden">
          <div className="flex min-w-20 flex-wrap gap-1.5">
            <Link
              href={`/p-restaurant/menus/${info.getValue()}/edit`}
              className="table-btn bg-amber-200 dark:bg-amber-700"
            >
              <HiMiniPencilSquare />
            </Link>
            <span className="table-btn bg-red-200 dark:bg-red-700" onClick={() => deleteMenu(info.getValue())}>
              <HiOutlineTrash />
            </span>
          </div>
        </div>
      ),
    }),
  ];

  const deleteMenu = async (id: string) => {
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
