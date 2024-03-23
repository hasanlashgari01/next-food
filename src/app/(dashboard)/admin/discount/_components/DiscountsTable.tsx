import { IDiscount, IDiscountProps } from "@/common/interface/discount";
import Modal from "@/components/modules/Modal/Modal";
import Table from "@/components/modules/Table/Table";
import { useRemoveDiscount, useRemoveSelectedDiscount } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiCheckCircle, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { MdRadioButtonUnchecked } from "react-icons/md";
import DeleteSelectedBox from "../../_components/DeleteSelectedBox";

interface TableProps {
  data: {
    count: number;
    coupons: IDiscountProps[];
  };
  refetch: () => void;
}

const columnHelper = createColumnHelper();

const DiscountsTable: React.FC<TableProps> = ({ data: { count, coupons }, refetch }) => {
  const { mutateAsync } = useRemoveDiscount();
  const { mutateAsync: mutateAsyncRemoveSelected } = useRemoveSelectedDiscount();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState(false);
  const [discountId, setDiscountId] = useState("");
  const [discountIds, setDiscountIds] = useState<string[]>([]);

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("checkbox", {
      header: () => <span></span>,
      cell: info => {
        const { _id: discountId } = info.row.original as IDiscountProps;

        return (
          <input
            type="checkbox"
            name=""
            id=""
            value={info.getValue()}
            checked={discountIds.includes(discountId)}
            onChange={e => checkboxHandler(e, discountId)}
          />
        );
      },
    }),
    columnHelper.accessor("code", {
      header: () => <span>کد</span>,
      cell: info => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor("type", {
      header: () => "نوع",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("amount", {
      header: () => "میزان",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("usageCount", {
      header: () => "تعداد",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      header: () => "وضعیت",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex flex-wrap gap-1.5">
          <Link href={`/admin/discount/${info.getValue()}`} className="table-btn bg-amber-300 dark:bg-amber-700">
            <HiMiniPencilSquare />
          </Link>
          <span className="table-btn bg-red-300 dark:bg-red-700" onClick={() => showDeleteModal(info.getValue())}>
            <HiTrash />
          </span>
        </div>
      ),
    }),
  ];

  const showDeleteModal = (id: string) => {
    setDiscountId(id);
    setIsShowDeleteModal(true);
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setDiscountIds(prevState => [...prevState, id]);
    } else {
      setDiscountIds(prevState => prevState.filter(discountId => discountId !== id));
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      setIsShowDeleteModal(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteAllDiscountHandler = async (couponsId: string[]) => {
    try {
      const { message } = await mutateAsyncRemoveSelected(couponsId);
      toast.success(message);
      setIsShowDeleteAllModal(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <DeleteSelectedBox
        isShow={isShowDeleteAllModal}
        setIsShow={setIsShowDeleteAllModal}
        deleteAllHandler={() => deleteAllDiscountHandler(discountIds)}
        selectedIds={discountIds}
        setSelectedIds={setDiscountIds}
        message="کد تخفیف"
        data={coupons}
      />
      <Table count={count} data={coupons ? coupons : []} columns={columns} notFoundMsg="کد تخفیف" />
      <Modal
        isShow={isShowDeleteModal}
        setIsShow={setIsShowDeleteModal}
        title="از حذف کد تخفیف اطمینان دارید؟"
        confirmText="حذف"
        cancelText="لغو"
        confirmStyle="btn-danger"
        cancelStyle="btn-default"
        confirmAction={() => deleteHandler(discountId)}
      />
    </>
  );
};

export default DiscountsTable;
