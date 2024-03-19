import { Person } from "@/common/interface/person";
import { api } from "@/config/axiosConfig";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBan } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi2";

const columnHelper = createColumnHelper<Person>();

interface TableProps {
  users: Person[];
}

const Table: React.FC<TableProps> = ({ users }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor(row => row.fullName, {
      id: "fullName",
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>نام</span>,
    }),
    columnHelper.accessor("mobile", {
      header: () => "شماره تلفن",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("verifiedAccount", {
      header: () => <span>وضعیت کاربر</span>,
      cell: info =>
        info.getValue() ? (
          <span className="text-success">تایید شده</span>
        ) : (
          <span className="text-process">تایید نشده</span>
        ),
    }),
    columnHelper.accessor("role", {
      header: "نقش",
      cell: info => (info.getValue() === "ADMIN" ? "مدیر" : "کاربر"),
    }),
    columnHelper.accessor("gender", {
      header: "جنسیت",
      cell: info => (info.getValue() === "male" ? "مرد" : info.getValue() === "female" ? "زن" : "تعیین نشده"),
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex gap-2">
          <span
            className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md dark:bg-red-700"
            onClick={() => banHandler(info.getValue())}
          >
            <FaBan />
          </span>
          <span
            className={`inline-flex size-6 cursor-pointer items-center justify-center rounded-md ${info.row.original.role === "ADMIN" ? "bg-green-500" : "bg-amber-700"}`}
            onClick={() => changeRoleHandler(info.getValue())}
          >
            {info.row.original.role === "ADMIN" ? <GrUserAdmin /> : <HiOutlineUser />}
          </span>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const banHandler = (id: string) => {
    api(`/admin/users/${id}/ban`)
      .then(({ data }) => toast.success(data.message))
      .catch(err => toast.error(err.message));
  };

  const changeRoleHandler = (id: string) => {
    // api(`/admin/users/${id}/ban`)
    //   .then(({ data }) => toast.success(data.message))
    //   .catch(err => toast.error(err.message));
  };

  return (
    <>
      <table className="mt-5 w-full table-fixed overflow-hidden rounded-sm bg-slate-50 text-xs md:text-base">
        <thead className="bg-sky-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border border-slate-300 bg-sky-200 px-5 py-2 text-right dark:border-slate-900 dark:bg-sky-800 dark:text-slate-100"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? "relative cursor-pointer select-none" : ""}
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2">
                          {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length !== 0 &&
            table
              .getRowModel()
              .rows.slice(0, 10)
              .map(row => {
                return (
                  <tr
                    key={row.id}
                    className="border border-slate-300 dark:border-slate-900 dark:bg-slate-700 dark:text-white"
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          key={cell.id}
                          className="border border-slate-300 px-5 py-2 text-right dark:border-slate-900"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table>
      {table.getRowModel().rows.length === 0 && (
        <div className="flex-1 bg-red-500 py-5 text-center text-xl font-semibold text-white">هیچ کاربری یافت نشد.</div>
      )}
    </>
  );
};

export default Table;
