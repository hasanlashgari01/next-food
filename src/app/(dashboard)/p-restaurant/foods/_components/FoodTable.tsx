"use client";

import { IDiscountProps } from "@/common/interface/discount";
import { IDiscount } from "@/common/interface/food";
import { IMenuData } from "@/common/interface/restaurant";
import InputText from "@/components/modules/Input/InputText";
import Modal from "@/components/modules/Modal/Modal";
import ModalForm from "@/components/modules/Modal/ModalForm";
import SelectedBox from "@/components/modules/Table/SelectedBox";
import Table from "@/components/modules/Table/Table";
import { useGetUser } from "@/hooks/useAuth";
import { useAddOffSelectedFood, useDeleteFood, useGetFoodList } from "@/hooks/useRestaurant";
import { IOffData } from "@/services/restaurantService";
import { fileRoute } from "@/services/routeService";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiMiniPencilSquare, HiOutlineTrash } from "react-icons/hi2";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { twMerge } from "tailwind-merge";

const columnHelper = createColumnHelper();

const FoodTable = () => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { isLoading, data, refetch } = useGetFoodList(restaurant || "");
  const { mutateAsync } = useDeleteFood();
  const { mutateAsync: addOffSelectedFood } = useAddOffSelectedFood();
  const [selectId, setSelectId] = useState<string>("");
  const [idList, setIdList] = useState<string[]>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState<boolean>(false);
  const [isShowEditAllModal, setIsShowEditAllModal] = useState<boolean>(false);
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { touchedFields, errors, isValid },
  } = useForm<IOffData & IDiscount>({
    mode: "onChange",
    defaultValues: {
      percent: null,
      startDate: null,
      endDate: null,
      amount: null,
      foodsId: [],
    },
  });
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
    columnHelper.accessor("image", {
      header: () => <span>عکس</span>,
      cell: info => (
        <div className="h-10 w-10 overflow-hidden whitespace-nowrap">
          {info.getValue() ? (
            <Image
              src={info.getValue() ? `${fileRoute}food/${info.getValue()}` : "/Auth.png"}
              alt="پروفایل"
              width={100}
              height={100}
              loading="lazy"
              className="size-full rounded-full object-cover object-top transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <span>-----------</span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("title", {
      header: () => <span>عنوان</span>,
      cell: info => (
        <div className="overflow-hidden whitespace-nowrap max-md:w-20">
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => <span>قیمت</span>,
      cell: info => {
        const price = info.getValue() as string;
        return (
          <div className="overflow-hidden max-md:w-20">
            <span>{price ? `${price.toLocaleString()} تومان` : "-----------"}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("menuId", {
      header: () => <span>منو</span>,
      cell: ({ getValue }: { getValue: () => IMenuData }) => (
        <div className="w-20 overflow-hidden">
          <span>{getValue()?.title ? getValue().title : "-----------"}</span>
        </div>
      ),
    }),
    columnHelper.accessor("discount", {
      header: () => <span>درصد</span>,
      cell: ({ getValue }: { getValue: () => { percent: IDiscount["percent"] } }) => (
        <div className="w-20 overflow-hidden">
          <span>{getValue()?.percent !== null || undefined ? getValue()?.percent : "-----------"}</span>
        </div>
      ),
    }),
    columnHelper.accessor("_id", {
      header: () => <span></span>,
      cell: info => (
        <div className="w-20 overflow-hidden">
          <div className="flex min-w-20 flex-wrap gap-1.5">
            <Link
              href={`/p-restaurant/foods/${info.getValue()}/edit`}
              className="table-btn bg-amber-200 dark:bg-amber-700"
            >
              <HiMiniPencilSquare />
            </Link>
            <span className="table-btn bg-red-200 dark:bg-red-700" onClick={() => showDeleteModal(info.getValue())}>
              <HiOutlineTrash />
            </span>
          </div>
        </div>
      ),
    }),
  ];

  useEffect(() => {
    setValue("foodsId", idList);
  }, [idList]);

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

  const onSubmit: SubmitHandler<IOffData & IDiscount> = async data => {
    try {
      if (!restaurant) return;
      const { message } = await addOffSelectedFood({ id: restaurant, data });
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteFood = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      setIsShowDeleteModal(false);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const isDisable = idList.length === 0;

  return (
    <div className="mt-5">
      {!isLoading && data && (
        <>
          <div className="flex gap-4">
            <SelectedBox
              isShow={isShowDeleteAllModal}
              setIsShow={setIsShowDeleteAllModal}
              selectedIds={idList}
              setSelectedIds={setIdList}
              message="غذا"
              data={data?.foods || []}
            />
            <button disabled={isDisable} className="selection-btn btn-info" onClick={() => setIsShowEditAllModal(true)}>
              <HiMiniPencilSquare className="size-4" />
            </button>
            <ModalForm
              isShow={isShowEditAllModal}
              setIsShow={setIsShowEditAllModal}
              title="ویرایش تخفیف ها"
              submitHandler={handleSubmit(onSubmit)}
            >
              <div className="col-span-1 space-y-4">
                <InputText
                  id="percent"
                  type="text"
                  label="درصد تخفیف"
                  {...register("percent")}
                  message={errors.percent ? errors.percent.message : ""}
                >
                  <input
                    type="text"
                    className={twMerge(
                      "form__input pr-6",
                      `${errors.percent && "border-cancel dark:border-cancel"}`,
                      `${touchedFields.percent && getValues().percent !== null && !errors?.percent && "border-success dark:border-success"}`,
                    )}
                    dir="rtl"
                    {...register("percent", { pattern: { value: /^[0-9]+$/, message: "فقط ارقام مجاز هست" } })}
                  />
                </InputText>
                <InputText
                  id="amount"
                  type="text"
                  label="تعداد مورد استفاده"
                  {...register("amount")}
                  message={errors.amount ? errors.amount.message : ""}
                >
                  <input
                    type="text"
                    className={twMerge(
                      "form__input pr-6",
                      `${errors.amount && "border-cancel dark:border-cancel"}`,
                      `${touchedFields.amount && getValues().amount !== null && !errors?.amount && "border-success dark:border-success"}`,
                    )}
                    dir="rtl"
                    {...register("amount", { pattern: { value: /^[0-9]+$/, message: "فقط ارقام مجاز هست" } })}
                  />
                </InputText>
                <div className="flex gap-2.5">
                  <InputText id="startDate" type="text" label="تاریخ شروع تخفیف" {...register("startDate")}>
                    <DatePicker
                      inputClass="form__input pr-6 max-w-inherit"
                      value={getValues("startDate")}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-left"
                      onChange={date => setValue("startDate", date as DateObject)}
                    />
                  </InputText>
                  <InputText
                    id="endDate"
                    type="text"
                    label="تاریخ پایان تخفیف"
                    {...register("endDate")}
                    message={errors.endDate ? errors.endDate.message : ""}
                  >
                    <DatePicker
                      inputClass="form__input pr-6 max-w-inherit"
                      value={getValues("endDate")}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-left"
                      onChange={date => setValue("endDate", date as DateObject)}
                    />
                  </InputText>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-8">
                ثبت
              </button>
            </ModalForm>
          </div>

          <Table
            count={data?.count || data.foods?.length}
            data={data?.foods ? data.foods : []}
            columns={columns}
            notFoundMsg="غذا"
          />
          <Modal
            isShow={isShowDeleteModal}
            setIsShow={setIsShowDeleteModal}
            title="از حذف غذا اطمینان دارید؟"
            confirmText="حذف"
            cancelText="لغو"
            confirmStyle="btn-danger"
            cancelStyle="btn-default"
            confirmAction={() => deleteFood(selectId)}
          />
        </>
      )}
    </div>
  );
};

export default FoodTable;
