import { IProvince } from "@/common/interface/province";
import Modal from "@/components/modules/Modal/Modal";
import Table from "@/components/modules/Table/Table";
import { useRemoveProvince } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

interface TableProps {
  data: {
    count: number;
    provinces: IProvince[];
  };
  refetch: () => void;
}

const columnHelper = createColumnHelper();

const ProvinceTable: React.FC<TableProps> = ({ data: { count, provinces }, refetch }) => {
  const { mutateAsync } = useRemoveProvince();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [provinceId, setProvinceId] = useState("");

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("name", {
      header: () => <span>استان</span>,
      cell: info => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor("englishTitle", {
      header: () => "نام انگلیسی",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex flex-wrap gap-1.5">
          <Link href={`/admin/provinces/${info.getValue()}/edit`} className="table-btn bg-amber-300 dark:bg-amber-700">
            <HiMiniPencilSquare />
          </Link>
          <span className="table-btn bg-red-300 dark:bg-red-700" onClick={() => showDeleteModal(info.getValue())}>
            <HiTrash />
          </span>
        </div>
      ),
    }),
  ];

  const deleteHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      refetch();
      setIsShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const showDeleteModal = (id: string) => {
    setIsShowDeleteModal(true);
    setProvinceId(id);
  };

  return (
    <>
      <Table
        count={count || provinces?.length}
        data={provinces ? provinces : []}
        columns={columns}
        notFoundMsg="استان"
      />
      <Modal
        isShow={isShowDeleteModal}
        setIsShow={setIsShowDeleteModal}
        title="از حذف استان اطمینان دارید؟"
        confirmText="حذف"
        cancelText="لغو"
        confirmStyle="btn-danger"
        cancelStyle="btn-default"
        confirmAction={() => deleteHandler(provinceId)}
      />
    </>
  );
};
export default ProvinceTable;
