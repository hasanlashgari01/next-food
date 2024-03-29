import { IComment } from "@/common/interface/comment";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

interface TableProps {
  isLoading: boolean;
  data: IComment[];
  refetch: () => void;
}

const columnHelper = createColumnHelper();

const CommentTable: React.FC<TableProps> = ({ isLoading, data, refetch }) => {
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("body", {
      header: () => "دیدگاه",
      cell: info => <div className="line-clamp-1 min-w-32 max-w-20">{info.getValue()}</div>,
    }),
    columnHelper.accessor("rate", {
      header: () => <span>امتیاز</span>,
      cell: info => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("likes", {
      header: () => <span>تعداد لایک</span>,
      cell: ({ getValue }: { getValue: () => string[] }) => <span>{getValue().length}</span>,
    }),
    columnHelper.accessor("isAccepted", {
      header: () => <span>وضعیت</span>,
      cell: info => <TableStatus status={info.getValue()} rejectMsg="تایید نشده" />,
    }),
  ];

  return (
    <div className="mt-5">
      {!isLoading && <Table count={data?.length} data={data ? data : []} columns={columns} notFoundMsg="دیدگاه" />}
    </div>
  );
};

export default CommentTable;
