import { IProvince } from "@/common/interface/province";
import Table from "@/components/modules/Table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

interface TableProps {
  data: {
    count: number;
    provinces: IProvince[];
  };
  refetch: () => void;
}

const columnHelper = createColumnHelper();

const ProvinceTable: React.FC<TableProps> = ({ data: { count, provinces }, refetch }) => {
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("name", {
      header: () => <span>استان</span>,
      cell: info => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor("englishTitle", {
      header: () => "نام انگلیسی",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex flex-wrap gap-1.5">
          <Link href={`/admin/province/${info.getValue()}`} className="table-btn bg-amber-300 dark:bg-amber-700">
            <HiMiniPencilSquare />
          </Link>
        </div>
      ),
    }),
  ];

  return (
    <>
      <Table count={count} data={provinces ? provinces : []} columns={columns} notFoundMsg="استان" />
    </>
  );
};
export default ProvinceTable;
