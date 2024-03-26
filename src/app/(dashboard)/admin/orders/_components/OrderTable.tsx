"use client";

import { IFood } from "@/common/interface/food";
import { IOrder, IUserOrder, TPaymentStatus } from "@/common/interface/order";
import Table from "@/components/modules/Table/Table";
import { toPersianDate } from "@/utils/func";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface TableProps {
  data: {
    count: number;
    orders: IOrder[];
  };
  refetch: () => void;
}

const columnHelper = createColumnHelper();

const OrderTable: React.FC<TableProps> = ({ data: { count, orders }, refetch }) => {
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("_id", {
      header: () => <span>شناسه</span>,
      cell: info => (
        <div className="line-clamp-1 w-20 overflow-hidden">
          <Link href={`/admin/orders/${info.getValue()}`}>{info.getValue()}</Link>
        </div>
      ),
    }),
    columnHelper.accessor("user", {
      header: () => <span>کاربر</span>,
      cell: ({ getValue }: { getValue: () => IUserOrder }) => (
        <div className="flex w-fit flex-col gap-1">
          <span>{getValue().fullName}</span>
          <span>{getValue().mobile.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
        </div>
      ),
    }),
    columnHelper.accessor("foods", {
      header: () => "لیست غذا ها",
      cell: ({ getValue }: { getValue: () => IFood[] }) => {
        return (
          <div className="flex w-fit flex-col gap-1.5">
            {getValue().map(food => (
              <Link
                key={food._id}
                href={`/foods/${food._id}`}
                className="text-primary-700 rounded-lg bg-primary-300 px-1.5 py-1 text-xs transition-colors hover:bg-amber-300 dark:bg-primary-900"
              >
                {food.title}
              </Link>
            ))}
          </div>
        );
      },
    }),
    columnHelper.accessor("total", {
      header: () => <span>مبلغ</span>,
      cell: ({ getValue }: { getValue: () => number }) => <strong>{getValue().toLocaleString()}</strong>,
    }),
    columnHelper.accessor("paymentDate", {
      header: () => <span>تاریخ</span>,
      cell: ({ getValue }: { getValue: () => Date }) => {
        const { persianDate } = toPersianDate(getValue());
        return <span>{persianDate}</span>;
      },
    }),
    columnHelper.accessor("paymentStatus", {
      header: () => <span>وضعیت پرداخت</span>,
      cell: ({ getValue }: { getValue: () => TPaymentStatus }) => {
        return (
          <span className={twMerge("rounded px-3 py-1", getValue() === "PAID" ? "bg-green-600" : "bg-red-600")}>
            {getValue() === "PAID" ? "موفق" : "ناموفق"}
          </span>
        );
      },
    }),
  ];

  return (
    <div className="mt-5">
      <Table count={count || orders?.length} data={orders ? orders : []} columns={columns} notFoundMsg="سفارش" />
    </div>
  );
};

export default OrderTable;
