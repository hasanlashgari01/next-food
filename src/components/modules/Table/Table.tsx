"use client";

import { SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

interface TableProps {
  count?: number;
  data: any[];
  columns: any[];
  notFoundMsg: string;
}

const Table: React.FC<TableProps> = ({ count, data, columns, notFoundMsg }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ? data : [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <table className="font-IranYekan mt-5 w-full overflow-hidden rounded-sm bg-slate-50 text-xs max-lg:table-fixed md:text-base">
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
      {(count == 0 ?? data.length === 0) && (
        <div className="flex-1 bg-red-500 py-5 text-center text-xl font-semibold text-white">
          {notFoundMsg} یافت نشد
        </div>
      )}
    </>
  );
};

export default Table;
