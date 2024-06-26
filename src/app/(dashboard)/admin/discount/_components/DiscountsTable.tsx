"use client";

import { IDiscountProps } from "@/common/interface/discount";
import Modal from "@/components/modules/Modal/Modal";
import Table from "@/components/modules/Table/Table";
import { useGetDiscountList, useRemoveDiscount, useRemoveSelectedDiscount } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import SelectedBox from "../../../../../components/modules/Table/SelectedBox";

const columnHelper = createColumnHelper();

const DiscountsTable = () => {
  const { isLoading, data, refetch } = useGetDiscountList();
  const { mutateAsync } = useRemoveDiscount();
  const { mutateAsync: mutateAsyncRemoveSelected } = useRemoveSelectedDiscount();
  const [selectId, setSelectId] = useState<string>("");
  const [idList, setIdList] = useState<string[]>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState<boolean>(false);
  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("checkbox", {
      header: () => "",
      cell: info => {
        const { _id: discountId } = info.row.original as IDiscountProps;

        return (
          <input
            type="checkbox"
            name=""
            id=""
            value={info.getValue()}
            checked={idList.includes(discountId as string)}
            onChange={e => checkboxHandler(e, discountId as string)}
          />
        );
      },
    }),
    columnHelper.accessor("code", {
      header: () => "کد",
      cell: info => <div className="min-w-24">{info.getValue()}</div>,
    }),
    columnHelper.accessor("type", {
      header: () => "نوع",
      cell: info => <div className="min-w-20">{info.getValue()}</div>,
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
      cell: info => (
        <div className="min-w-28">
          <span
            className={twMerge(
              info.getValue() === "active"
                ? "btn-success rounded-md bg-opacity-70 px-1.5 py-0.5 text-white"
                : info.getValue() === "notActive"
                  ? "btn-warning rounded-md bg-opacity-70 px-1.5 py-0.5 text-white"
                  : "btn-danger rounded-md bg-opacity-70 px-1.5 py-0.5 text-white",
            )}
          >
            {info.getValue() === "active" ? "فعال" : info.getValue() === "notActive" ? "غیر فعال" : "منقضی شده"}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("_id", {
      header: "",
      cell: info => (
        <div className="flex min-w-20 flex-wrap gap-1.5">
          <Link href={`/admin/discount/${info.getValue()}/edit`} className="table-btn bg-amber-300 dark:bg-amber-700">
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
    setSelectId(id);
    setIsShowDeleteModal(true);
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setIdList(prevState => [...prevState, id]);
    } else {
      setIdList(prevState => prevState.filter(selectedIds => selectedIds !== id));
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

  const deleteHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      setIsShowDeleteModal(false);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <SelectedBox
            isShow={isShowDeleteAllModal}
            setIsShow={setIsShowDeleteAllModal}
            deleteAllHandler={() => deleteAllDiscountHandler(idList)}
            selectedIds={idList}
            setSelectedIds={setIdList}
            message="کد تخفیف"
            data={data?.coupons || []}
          />
          <Table count={data?.count} data={data?.coupons || []} columns={columns} notFoundMsg="کد تخفیف" />
          <Modal
            isShow={isShowDeleteModal}
            setIsShow={setIsShowDeleteModal}
            title="از حذف کد تخفیف اطمینان دارید؟"
            confirmText="حذف"
            cancelText="لغو"
            confirmStyle="btn-danger"
            cancelStyle="btn-default"
            confirmAction={() => deleteHandler(selectId)}
          />
        </>
      )}
    </>
  );
};

export default DiscountsTable;
