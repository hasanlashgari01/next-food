import { CategoryProps } from "@/common/interface/category";
import Table from "@/components/modules/Table/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";

interface TableProps {
  categories: CategoryProps[];
}

interface Children {
  title: string;
}

const columnHelper = createColumnHelper();

const CategoriesTable: React.FC<TableProps> = ({ categories }) => {
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("title", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>عنوان</span>,
    }),
    columnHelper.accessor("slug", {
      header: () => "لینک",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("children", {
      header: "زیرمجموعه ها",
      cell: info => {
        let children: Children[] = info.getValue();
        return (
          <div className="flex flex-wrap gap-1.5">
            {children.map((child, index: number) => (
              <span
                key={index}
                className="text-primary-700 rounded-lg bg-primary-300 px-1.5 py-1 text-xs transition-colors hover:bg-amber-300 dark:bg-primary-900"
              >
                {child.title}
              </span>
            ))}
          </div>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex flex-wrap gap-1.5">
          <Link href={`/admin/categories/${info.getValue()}`} className="table-btn bg-amber-300 dark:bg-amber-700">
            <HiMiniPencilSquare />
          </Link>
        </div>
      ),
    }),
  ];

  return (
    <>
      <Table data={categories} columns={columns} notFoundMsg="دسته بندی" />
    </>
  );
};

export default CategoriesTable;
