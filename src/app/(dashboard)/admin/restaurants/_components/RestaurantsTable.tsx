import { Restaurant } from "@/common/interface/restaurant";
import Table from "@/components/modules/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";

interface TableProps {
  restaurants: Restaurant[];
}

const columnHelper = createColumnHelper();

const RestaurantsTable: React.FC<TableProps> = ({ restaurants }) => {
  const columns = [
    columnHelper.accessor("name", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>نام</span>,
    }),
    columnHelper.accessor("phone", {
      header: () => "تلفن",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("isValid", {
      header: () => <span>وضعیت</span>,
      cell: info =>
        info.getValue() ? (
          <span className="text-success">تایید شده</span>
        ) : (
          <span className="text-process">تایید نشده</span>
        ),
    }),
    columnHelper.accessor("province.name", {
      header: "استان",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("score", {
      header: "امتیاز",
      cell: info => <span>{info.getValue() ? info.getValue() : 0}</span>,
    }),
    columnHelper.accessor("category", {
      header: "امتیاز",
      cell: info => {
        let categories: string[] = info.getValue();
        return (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category: string, index: number) => (
              <span
                key={index}
                className="text-primary-700 rounded-lg bg-primary-300 px-1.5 py-1 text-xs dark:bg-primary-900"
              >
                {category}
              </span>
            ))}
          </div>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex gap-2">
          <span
            className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md dark:bg-red-700"
            // onClick={() => banHandler(info.getValue())}
          >
            {/* <FaBan /> */}
          </span>
          <span
            className={`inline-flex size-6 cursor-pointer items-center justify-center rounded-md`}
            // onClick={() => changeRoleHandler(info.getValue())}
          >
            {/* {info.row.original.role === "ADMIN" ? <GrUserAdmin /> : <HiOutlineUser />} */}
          </span>
        </div>
      ),
    }),
  ];

  return (
    <>
      <Table data={restaurants} columns={columns} notFoundMsg="رستوران" />
    </>
  );
};

export default RestaurantsTable;
