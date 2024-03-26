"use client";

import { IDiscountInputs, TStatus, TType } from "@/common/interface/discount";
import { useAddDiscount } from "@/hooks/useAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import TopPage from "../../_components/TopPage";
import InputText from "@/components/modules/Input/InputText";
import toast from "react-hot-toast";
import { ChangeEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { codeStatusValues, codeValues } from "@/constants/radioValues";
import InputRadioGroup from "@/components/modules/Input/InputRadioGroup";

const AddDiscount = () => {
  const { mutateAsync } = useAddDiscount();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { touchedFields, errors, isValid },
  } = useForm<IDiscountInputs>({
    mode: "all",
    defaultValues: {
      code: "",
      type: "fixedProduct",
      amount: null,
      usageCount: null,
      status: "active",
    },
  });
  const [type, setType] = useState<TType>("fixedProduct");
  const [amountLabel, setAmountLabel] = useState<"مبلغ" | "درصد" | null>(null);

  useEffect(() => {
    setAmountLabel(type === "fixedProduct" ? "مبلغ" : "درصد");
  }, [type]);

  const onSubmit: SubmitHandler<IDiscountInputs> = async () => {
    let data: IDiscountInputs = {
      code: getValues("code"),
      type: getValues("type"),
      amount: getValues("amount"),
      usageCount: getValues("usageCount"),
      status: getValues("status"),
    };

    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const typeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let type = e.target.id as TType;
    setValue("type", type);
    setType(type);
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
      <TopPage title="افزودن کد تخفیف" link="/admin/discount" />
      <form onSubmit={handleSubmit(onSubmit)} className="font-IranYekan">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5 flex flex-col gap-2">
            <InputRadioGroup data={codeValues} register={register} handler={typeHandler} label="نوع کد" />
            <InputRadioGroup data={codeStatusValues} register={register} handler={statusHandler} label="وضعیت" />
          </div>
          <div className="col-span-5 grid gap-4 sm:col-span-4 xl:col-span-2">
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
                  `${errors.code && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.code && getValues().code !== "" && !errors?.code && "border-success dark:border-success"}`,
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
                  `${errors.amount && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.amount && !errors?.amount && "border-success dark:border-success"}`,
                )}
                dir="ltr"
                {...register(
                  "amount",
                  type === "fixedProduct"
                    ? {
                        required: { value: true, message: "مبلغ اجباری هست" },
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

            <InputText
              id="usageCount"
              label="تعداد"
              type="text"
              message={errors.usageCount ? errors.usageCount.message : ""}
              msgWidth="w-64"
            >
              <input
                type="number"
                inputMode="numeric"
                placeholder=""
                className={twMerge(
                  "form__input pr-6",
                  `${errors.usageCount && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.usageCount && !errors?.usageCount && "border-success dark:border-success"}`,
                )}
                dir="ltr"
                {...register("usageCount", {
                  required: { value: true, message: "تعداد اجباری هست" },
                  min: { value: 1, message: "تعداد باید بیشتر از ۱ باشد" },
                })}
              />
            </InputText>
          </div>
        </div>

        <button type="submit" disabled={!isValid} className="add-btn">
          ایجاد کد تخفیف
        </button>
      </form>
    </>
  );
};
export default AddDiscount;
