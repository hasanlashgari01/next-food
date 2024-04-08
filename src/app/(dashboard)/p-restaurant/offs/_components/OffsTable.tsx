"use client";

import { IDiscount } from "@/common/interface/food";
import Table from "@/components/modules/Table/Table";
import { useGetUser } from "@/hooks/useAuth";
import { useGetOffList } from "@/hooks/useRestaurant";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const OffsTable = () => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { isLoading, data } = useGetOffList(restaurant || "");

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("discount", {
      header: () => "تخفیف",
      cell: ({ getValue }: { getValue: () => IDiscount }) => (
        <span>{getValue()?.percent !== null || undefined ? "% " + getValue()?.percent : "-----------"}</span>
      ),
    }),
    columnHelper.accessor("discount", {
      header: () => "تاریخ شروع",
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
      header: () => <span>تاریخ پایان</span>,
      cell: ({ getValue }: { getValue: () => { endDate: IDiscount["endDate"] } }) => (
        <div className="w-20 overflow-hidden">
          <span>
            {getValue()?.endDate ? new Date(getValue().endDate as Date)?.toLocaleDateString("fa-IR") : "-----------"}
          </span>
        </div>
      ),
    }),
  ];

  return (
    <>{!isLoading && <Table count={data?.count} data={data?.foods || []} columns={columns} notFoundMsg="تخفیف" />}</>
  );
};

export default OffsTable;
