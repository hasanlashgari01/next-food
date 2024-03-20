import { Person } from "@/common/interface/person";
import Table from "@/components/modules/Table/Table";
import { api } from "@/config/axiosConfig";
import { createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { FaBan } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi2";

interface TableProps {
  users: Person[];
}

const columnHelper = createColumnHelper<Person>();

const UsersTable: React.FC<TableProps> = ({ users }) => {
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
      <Table data={users} columns={columns} notFoundMsg="کاربر" />
    </>
  );
};

export default UsersTable;
