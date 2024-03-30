import { IOffer } from "@/common/interface/discount";
import { IData } from "@/common/interface/getData";
import Table from "@/components/modules/Table/Table";
import { toPersianDate } from "@/utils/func";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const columnHelper = createColumnHelper();

const OfferTable: React.FC<IData<IOffer[]>> = ({ data, isLoading, refetch }) => {
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("code", {
      header: () => <span>کد</span>,
      cell: info => <div className="min-w-24">{info.getValue()}</div>,
    }),
    columnHelper.accessor("foodIds", {
      header: () => "محصولات",
      cell: info => {
        let foods = info.getValue() as IOffer["foodIds"];

        return (
          <ul className="flex min-w-64 max-w-sm flex-wrap gap-1.5">
            {foods && foods?.length > 0 ? (
              foods?.map(food => (
                <li key={food._id} className="flex-initial">
                  <Link
                    href={`/foods/${food._id}`}
                    className="line-clamp-1 rounded-md bg-primary-300 px-1.5 py-1 text-xs dark:bg-primary-900"
                  >
                    {food.title}
                  </Link>
                </li>
              ))
            ) : (
              <span>همه محصولات</span>
            )}
          </ul>
        );
      },
    }),
    columnHelper.accessor("amount", {
      header: () => "مقدار",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("expireDate", {
      header: () => "مهلت استفاده",
      cell: info => {
        const { persianDate } = toPersianDate(info.getValue());
        return <span>{persianDate}</span>;
      },
    }),
    columnHelper.accessor("status", {
      header: () => "وضعیت",
      cell: info => (
        <div className="min-w-28">
          <span
            className={twMerge(
              "transition-colors",
              info.getValue() === "active"
                ? "btn-success rounded-md bg-opacity-70 px-1.5 py-0.5 text-white"
                : info.getValue() === "notActive"
                  ? "btn-warning rounded-md bg-opacity-70 px-1.5 py-0.5 text-white"
                  : "btn-danger rounded-md bg-opacity-70 px-1.5 py-0.5 text-white",
            )}
          >
            {info.getValue() === "active" ? "فعال" : info.getValue() === "notActive" ? "غیر فعال" : "منقضی شده"}
          </span>
        </div>
      ),
    }),
  ];

  return <div className="mt-5">{!isLoading && <Table columns={columns} data={data || []} notFoundMsg="تخفیف" />}</div>;
};

export default OfferTable;
