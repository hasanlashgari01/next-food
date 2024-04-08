"use client";

import { IFood } from "@/common/interface/food";
import { IUserOrder } from "@/common/interface/order";
import OrderFoods from "@/components/modules/Table/Order/OrderFoods";
import OrderId from "@/components/modules/Table/Order/OrderId";
import OrderPaymentStatus from "@/components/modules/Table/Order/OrderPaymentStatus";
import OrderUserInfo from "@/components/modules/Table/UserInfo";
import Table from "@/components/modules/Table/Table";
import { useGetUser } from "@/hooks/useAuth";
import { useGetOrderList } from "@/hooks/useRestaurant";
import { toPersianDate } from "@/utils/func";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const OrderTable = () => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { isLoading, data } = useGetOrderList(restaurant || "");

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("_id", {
      header: () => <span>شناسه</span>,
      cell: info => <OrderId id={info.getValue()} route="p-restaurant" />,
    }),
    columnHelper.accessor("user", {
      header: () => <span>شماره تلفن</span>,
      cell: ({ getValue }: { getValue: () => IUserOrder }) => (
        <OrderUserInfo fullName={getValue().fullName} mobile={getValue().mobile} />
      ),
    }),
    columnHelper.accessor("foods", {
      header: () => "لیست غذا ها",
      cell: ({ getValue }: { getValue: () => IFood[] }) => {
        return <OrderFoods foods={getValue()} />;
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
      cell: ({ getValue }) => <OrderPaymentStatus status={getValue()} />,
    }),
  ];

  return (
    <div className="mt-5">
      {!isLoading && data && (
        <Table
          count={data?.count || data.orders?.length}
          data={data?.orders ? data.orders : []}
          columns={columns}
          notFoundMsg="سفارش"
        />
      )}
    </div>
  );
};

export default OrderTable;
