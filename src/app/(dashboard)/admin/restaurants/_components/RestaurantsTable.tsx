import { RestaurantsOption, SelectOption } from "@/common/interface/optionSelect";
import { IRestaurant } from "@/common/interface/restaurant";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import { useBanOrUnbanRestaurant, useUpdateValidRestaurant } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { FaBan } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";

interface TableProps {
  restaurants: IRestaurant[];
  selectedOption: RestaurantsOption | SelectOption;
  refetchRestaurant: () => void;
  refetchBanRestaurant: () => void;
}

const columnHelper = createColumnHelper();

const RestaurantsTable: React.FC<TableProps> = ({
  restaurants,
  selectedOption,
  refetchRestaurant,
  refetchBanRestaurant,
}) => {
  const { mutateAsync: mutateAsyncBanOrUnban } = useBanOrUnbanRestaurant();
  const { mutateAsync: mutateAsyncUpdateValid } = useUpdateValidRestaurant();
  const columns: ColumnDef<unknown, never>[] = [
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
      cell: info => <TableStatus status={info.getValue()} />,
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
      header: "دسته بندی",
      cell: info => {
        let categories: string[] = info.getValue();
        return (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category: string, index: number) => (
              <span
                key={index}
                className="text-primary-700 cursor-default rounded-lg bg-primary-300 px-1.5 py-1 text-xs transition-colors hover:bg-amber-300 dark:bg-primary-900"
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
      cell: info => {
        const { _id, isValid } = info.cell.row.original as IRestaurant;

        return (
          <div className="flex gap-2">
            <span className="table-btn bg-red-300 dark:bg-red-700" onClick={() => banHandler(_id)}>
              <FaBan />
            </span>
            <span
              className={`table-btn ${isValid ? "bg-amber-300 dark:bg-amber-700" : "bg-green-300 dark:bg-green-700"}`}
              onClick={() => changeValidHandler(_id)}
            >
              <GrValidate />
            </span>
          </div>
        );
      },
    }),
  ];

  const banHandler = async (id: string) => {
    try {
      const { message } = await mutateAsyncBanOrUnban(id);
      toast.success(message);
      selectedOption.value === "restaurants" ? refetchRestaurant() : refetchBanRestaurant();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const changeValidHandler = async (id: string) => {
    try {
      const { message } = await mutateAsyncUpdateValid(id);
      toast.success(message);
      selectedOption.value === "restaurants" ? refetchRestaurant() : refetchBanRestaurant();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Table
        count={restaurants?.length}
        data={restaurants ? restaurants : []}
        columns={columns}
        notFoundMsg="رستوران"
      />
    </>
  );
};

export default RestaurantsTable;
