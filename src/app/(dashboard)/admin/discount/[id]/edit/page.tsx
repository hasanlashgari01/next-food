"use client";

import { IDiscountInputs, TStatus, TType } from "@/common/interface/discount";
import InputText from "@/components/modules/Input/InputText";
import { useGetDiscount, useUpdateDiscount } from "@/hooks/useAdmin";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import TopPage from "../../../_components/TopPage";

const EditDiscountPage = () => {
  const { id }: { id: string } = useParams();
  const { isLoading, data: discountData } = useGetDiscount(id);
  const { mutateAsync } = useUpdateDiscount();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<IDiscountInputs>({
    mode: "all",
    defaultValues: {
      code: "",
      type: null,
      amount: null,
      usageCount: null,
      status: null,
    },
    values: discountData,
  });
  const [type, setType] = useState(getValues("type"));
  const [amountLabel, setAmountLabel] = useState<"مبلغ" | "درصد" | null>(null);

  useEffect(() => {
    setAmountLabel(getValues("type") === "fixedProduct" ? "مبلغ" : "درصد");
  }, []);

  const onSubmit: SubmitHandler<IDiscountInputs> = async () => {
    let data: IDiscountInputs = {
      code: getValues("code"),
      type: getValues("type"),
      amount: getValues("amount"),
      usageCount: getValues("usageCount"),
      status: getValues("status"),
    };

    try {
      const { message } = await mutateAsync({ id, data });
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const typeHandler = (e?: ChangeEvent<HTMLInputElement>) => {
    let type = e?.currentTarget?.id as TType;
    setValue("type", type);
    setType(type);
    setAmountLabel(type === "fixedProduct" ? "مبلغ" : "درصد");
  };

  const statusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let curr = e.currentTarget?.id;
    setValue("status", curr as TStatus);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let curr = e.currentTarget;
    setValue(curr.id as keyof IDiscountInputs, curr.value);
  };

  return (
    <>
      <TopPage title="به روز رسانی کد تخفیف" link="/admin/discount" />
      <form onSubmit={handleSubmit(onSubmit)} className="font-IranYekan">
        <div className="grid grid-cols-5 gap-6">
          {/* input radio */}
          <div className="col-span-5 flex flex-col gap-2">
            <span className="mb-1 inline-block pr-4 text-sm font-semibold text-primary-900 dark:text-slate-300">
              نوع کد
            </span>
            <div className="flex gap-2">
              <label htmlFor="fixedProduct" className="radio-label">
                <input
                  type="radio"
                  id="fixedProduct"
                  value="fixedProduct"
                  className="radio-input"
                  {...register("type", { required: true, onChange: event => typeHandler(event) })}
                />
                <span>مبلغ</span>
              </label>
              <label htmlFor="percent" className="radio-label">
                <input
                  type="radio"
                  id="percent"
                  value="percent"
                  className="radio-input"
                  {...register("type", { required: true, onChange: event => typeHandler(event) })}
                />
                <span>درصد</span>
              </label>
            </div>
          </div>

          <div className="col-span-5 flex flex-col gap-2">
            <span className="mb-1 inline-block pr-4 text-sm font-semibold text-primary-900 dark:text-slate-300">
              وضعیت
            </span>
            <div className="flex gap-2">
              <label htmlFor="notActive" className="radio-label">
                <input
                  type="radio"
                  id="notActive"
                  value="notActive"
                  className="radio-input"
                  {...register("status", { required: true, onChange: event => statusHandler(event) })}
                />
                <span>غیرفعال</span>
              </label>
              <label htmlFor="active" className="radio-label">
                <input
                  type="radio"
                  id="active"
                  value="active"
                  className="radio-input"
                  {...register("status", { required: true, onChange: event => statusHandler(event) })}
                />
                <span>فعال</span>
              </label>
              <label htmlFor="expired" className="radio-label">
                <input
                  type="radio"
                  id="expired"
                  value="expired"
                  className="radio-input"
                  {...register("status", { required: true, onChange: event => statusHandler(event) })}
                />
                <span>منقضی شده</span>
              </label>
            </div>
          </div>

          <div className="col-span-5 grid grid-cols-1 gap-4 sm:col-span-3 md:col-span-3 xl:col-span-2">
            <InputText
              id="code"
              label="عنوان"
              type="text"
              message={errors.code ? errors.code.message : ""}
              msgWidth="w-64"
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${getValues().code === "" || errors?.code ? "border-cancel dark:border-cancel" : "border-success dark:border-success"}`,
                )}
                dir="ltr"
                {...register("code", {
                  required: { value: true, message: "عنوان اجباری هست" },
                  pattern: { value: /^[a-zA-Z0-9-]+$/, message: "فقط از حروف انگلیسی و عدد استفاده کنید" },
                  minLength: { value: 3, message: "عنوان باید بیشتر از ۳ کاراکتر باشد" },
                  maxLength: { value: 20, message: "عنوان باید کمتر از ۲۰ کاراکتر باشد" },
                })}
              />
            </InputText>

            <InputText
              id="amountPercent"
              label={amountLabel as string}
              type="text"
              message={errors?.amount?.message}
              msgWidth="w-64"
            >
              <input
                type="number"
                inputMode="numeric"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.amount?.message ? "border-cancel dark:border-cancel" : "border-success dark:border-success"}`,
                )}
                dir="ltr"
                {...register(
                  "amount",
                  type === "fixedProduct"
                    ? {
                        pattern: { value: /^[0-9]+$/, message: "فقط از عدد استفاده کنید" },
                        min: { value: 1, message: "مبلغ باید بیشتر از ۱ باشد" },
                        max: { value: 10_000_000, message: "مبلغ باید کمتر از ۱۰۰۰۰۰۰ باشد" },
                        onChange: (e: ChangeEvent<HTMLInputElement>) => changeHandler(e),
                      }
                    : {
                        required: { value: true, message: "درصد اجباری هست" },
                        pattern: { value: /^[0-9]+$/, message: "فقط از عدد استفاده کنید" },
                        min: { value: 1, message: "درصد باید بیشتر از ۱ باشد" },
                        max: { value: 100, message: "درصد باید کمتر از ۱۰۰ باشد" },
                        onChange: (e: ChangeEvent<HTMLInputElement>) => changeHandler(e),
                      },
                )}
              />
            </InputText>

            <InputText id="usageCount" label="تعداد" type="text" message={errors?.usageCount?.message} msgWidth="w-64">
              <input
                type="number"
                inputMode="numeric"
                placeholder=""
                className={twMerge(
                  "form__input pr-6",
                  `${errors?.usageCount ? "border-cancel dark:border-cancel" : "border-success dark:border-success"}`,
                )}
                dir="ltr"
                {...register("usageCount", { min: { value: 1, message: "تعداد باید بیشتر از ۱ باشد" } })}
              />
            </InputText>
          </div>
        </div>

        <button type="submit" disabled={!isValid} className="add-btn">
          به روز رسانی
        </button>
      </form>
    </>
  );
};

export default EditDiscountPage;
