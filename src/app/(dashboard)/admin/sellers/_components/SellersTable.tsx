import { Person } from "@/common/interface/person";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import { createColumnHelper } from "@tanstack/react-table";

interface TableProps {
  sellers: Person[];
  refetchSellers: () => void;
}

const columnHelper = createColumnHelper<Person>();

const SellersTable: React.FC<TableProps> = ({ sellers }) => {
  const columns = [
    columnHelper.accessor("fullName", {
      header: () => <span>نام</span>,
      cell: info => <div className="line-clamp-1 min-w-32">{info.getValue()}</div>,
    }),
    columnHelper.accessor("mobile", {
      header: () => "شماره تلفن",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("verifiedAccount", {
      header: () => <span>وضعیت</span>,
      cell: info => <TableStatus status={info.getValue()} />,
    }),
    columnHelper.accessor("gender", {
      header: "جنسیت",
      cell: info => (info.getValue() === "male" ? "مرد" : info.getValue() === "female" ? "زن" : "تعیین نشده"),
    }),
  ];

  return (
    <>
      <Table data={sellers || []} columns={columns} notFoundMsg="فروشنده ای" />
    </>
  );
};

export default SellersTable;
