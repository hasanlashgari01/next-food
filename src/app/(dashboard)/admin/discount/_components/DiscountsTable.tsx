import { IDiscountProps } from "@/common/interface/discount";
import Modal from "@/components/modules/Modal/Modal";
import Table from "@/components/modules/Table/Table";
import { useRemoveDiscount } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

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
  const [isShow, setIsShow] = useState(false);
  const [discountId, setDiscountId] = useState("");

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("code", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>کد</span>,
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
          <span className="table-btn bg-red-300 dark:bg-red-700" onClick={() => showModal(info.getValue())}>
            <HiTrash />
          </span>
        </div>
      ),
    }),
  ];

  const showModal = (id: string) => {
    setIsShow(true);
    setDiscountId(id);
  };

  const banHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      setIsShow(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Table count={count} data={coupons} columns={columns} notFoundMsg="کد تخفیف" />
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        title="از حذف کد تخفیف اطمینان دارید؟"
        confirmText="حذف"
        cancelText="لغو"
        confirmStyle="btn-danger"
        cancelStyle="btn-default"
        confirmAction={() => banHandler(discountId)}
      />
    </>
  );
};

export default DiscountsTable;
