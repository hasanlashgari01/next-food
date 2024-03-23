import { IProvince } from "@/common/interface/province";
import Modal from "@/components/modules/Modal/Modal";
import Table from "@/components/modules/Table/Table";
import { useRemoveProvince, useRemoveSelectedProvince } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteSelectedBox from "../../_components/DeleteSelectedBox";

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
  const { mutateAsync: mutateAsyncRemoveSelected } = useRemoveSelectedProvince();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState(false);
  const [provinceId, setProvinceId] = useState("");
  const [provinceIds, setProvinceIds] = useState<string[]>([]);

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("checkbox", {
      header: () => <span></span>,
      cell: info => {
        const { _id: provinceId } = info.row.original as IProvince;

        return (
          <input
            type="checkbox"
            name=""
            id=""
            value={info.getValue()}
            checked={provinceIds.includes(provinceId)}
            onChange={e => checkboxHandler(e, provinceId)}
          />
        );
      },
    }),
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

  const deleteAllDiscountHandler = async (provinceIds: string[]) => {
    try {
      const { message } = await mutateAsyncRemoveSelected(provinceIds);
      toast.success(message);
      setIsShowDeleteAllModal(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const showDeleteModal = (id: string) => {
    setIsShowDeleteModal(true);
    setProvinceId(id);
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setProvinceIds(prevState => [...prevState, id]);
    } else {
      setProvinceIds(prevState => prevState.filter(provinceId => provinceId !== id));
    }
  };

  return (
    <>
      <DeleteSelectedBox
        isShow={isShowDeleteAllModal}
        setIsShow={setIsShowDeleteAllModal}
        deleteAllHandler={() => deleteAllDiscountHandler(provinceIds)}
        data={provinces ? provinces : []}
        message="استان"
        selectedIds={provinceIds}
        setSelectedIds={setProvinceIds}
      />
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
