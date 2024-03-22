import { IDiscountProps } from "@/common/interface/discount";
import Table from "@/components/modules/Table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { HiMiniPencilSquare } from "react-icons/hi2";

interface TableProps {
  data: {
    count: number;
    coupons: IDiscountProps[];
  };
}

const columnHelper = createColumnHelper();

const DiscountsTable: React.FC<TableProps> = ({ data: { count, coupons } }) => {
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("code", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>کد</span>,
    }),
    columnHelper.accessor("type", {
      header: () => "نوع",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("amount", {
      header: () => "میزان",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("usageCount", {
      header: () => "تعداد",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      header: () => "وضعیت",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex flex-wrap gap-1.5">
          <Link href={`/admin/discount/${info.getValue()}`} className="table-btn bg-amber-300 dark:bg-amber-700">
            <HiMiniPencilSquare />
          </Link>
        </div>
      ),
    }),
  ];

  return <Table count={count} data={coupons} columns={columns} notFoundMsg="کد تخفیف" />;
};

export default DiscountsTable;
