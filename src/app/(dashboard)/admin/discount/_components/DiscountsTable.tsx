import { IDiscountProps } from "@/common/interface/discount";
import Modal from "@/components/modules/Modal/Modal";
import Table from "@/components/modules/Table/Table";
import { useRemoveDiscount, useRemoveSelectedDiscount } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { AxiosRequestConfig } from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiCheckCircle, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { MdRadioButtonUnchecked } from "react-icons/md";

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
      const { message } = await mutateAsyncRemoveSelected(couponsId as AxiosRequestConfig<any>);
      toast.success(message);
      setIsShowDeleteAllModal(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const selectAll = () => {
    setDiscountIds(prevState => [...prevState, ...coupons.map(coupon => coupon._id)]);
  };

  return (
    <>
      <div className="flex gap-4">
        <button className="btn btn-default inline-flex max-h-11" onClick={() => selectAll()}>
          <HiCheckCircle className="size-5" />
        </button>
        <button
          disabled={discountIds.length === 0}
          className="btn btn-warning inline-flex max-h-11 disabled:cursor-not-allowed disabled:bg-amber-300 disabled:dark:bg-amber-700"
          onClick={() => setDiscountIds([])}
        >
          <MdRadioButtonUnchecked className="size-5" />
        </button>
        <button
          disabled={discountIds.length === 0}
          className="btn btn-danger inline-flex max-h-11 disabled:cursor-not-allowed disabled:bg-red-300 disabled:dark:bg-red-700"
          onClick={() => setIsShowDeleteAllModal(true)}
        >
          <HiTrash className="size-5" />
        </button>
      </div>
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
      <Modal
        isShow={isShowDeleteAllModal}
        setIsShow={setIsShowDeleteAllModal}
        title="از حذف کد تخفیف های انتخاب شده اطمینان دارید؟"
        confirmText="حذف"
        cancelText="لغو"
        confirmStyle="btn-danger"
        cancelStyle="btn-default"
        confirmAction={() => deleteAllDiscountHandler(discountIds)}
      />
    </>
  );
};

export default DiscountsTable;
