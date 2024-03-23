import { Table } from "@tanstack/react-table";
import { HiChevronLeft, HiChevronRight, HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from "react-icons/hi2";

const TablePagination: React.FC<{ table: Table<any> }> = ({ table }) => {
  return (
    <>
      <div className="flex justify-center gap-2 justify-self-end">
        <div className="contents gap-10">
          <button className="pagination-btn" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
            <HiMiniChevronDoubleRight />
          </button>

          <button className="pagination-btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <HiChevronRight />
          </button>

          <span className="flex w-12 items-center justify-center gap-1 font-IranYekan md:w-16 md:text-lg">
            <strong>
              {table.getPageCount().toLocaleString()} / {table.getState().pagination.pageIndex + 1}
            </strong>
          </span>

          <button
            className="pagination-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <HiChevronLeft />
          </button>

          <button className="pagination-btn" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
            <HiMiniChevronDoubleLeft />
          </button>
        </div>

        <div>
          {/* <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border bg-white p-1 dark:bg-slate-800"
            />
          </span> */}
        </div>
      </div>
    </>
  );
};

export default TablePagination;
