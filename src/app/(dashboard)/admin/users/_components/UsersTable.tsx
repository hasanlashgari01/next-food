import { SelectOption, UsersOption } from "@/common/interface/optionSelect";
import { Person } from "@/common/interface/person";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import { useBanOrUnbanUser } from "@/hooks/useAdmin";
import { createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { FaBan } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi2";

interface TableProps {
  users: Person[];
  refetchUsers: () => void;
  refetchBanUsers: () => void;
  selectedOption: UsersOption | SelectOption;
}

const columnHelper = createColumnHelper<Person>();

const UsersTable: React.FC<TableProps> = ({ users, refetchUsers, refetchBanUsers, selectedOption }) => {
  const { mutateAsync } = useBanOrUnbanUser();
  const columns = [
    columnHelper.accessor("fullName", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>نام</span>,
    }),
    columnHelper.accessor("mobile", {
      header: () => "شماره تلفن",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("verifiedAccount", {
      header: () => <span>وضعیت</span>,
      cell: info => <TableStatus status={info.getValue()} />,
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
          <span className="table-btn bg-red-300 dark:bg-red-700" onClick={() => banHandler(info.getValue())}>
            <FaBan />
          </span>
          <span
            className={`table-btn ${info.row.original.role === "ADMIN" ? "bg-green-300 dark:bg-green-500" : "bg-amber-300 dark:bg-amber-700"}`}
            onClick={() => changeRoleHandler(info.getValue())}
          >
            {info.row.original.role === "ADMIN" ? <GrUserAdmin /> : <HiOutlineUser />}
          </span>
        </div>
      ),
    }),
  ];

  const banHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      selectedOption.value === "users" ? refetchUsers() : refetchBanUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const changeRoleHandler = (id: string) => {
    // api(`/admin/users/${id}/ban`)
    //   .then(({ data }) => toast.success(data.message))
    //   .catch(err => toast.error(err.message));
  };

  return (
    <>
      <Table data={users} columns={columns} notFoundMsg="کاربر" />
    </>
  );
};

export default UsersTable;
