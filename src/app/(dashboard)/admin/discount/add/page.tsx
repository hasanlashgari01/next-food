"use client";

import { IDiscountInputs, TType } from "@/common/interface/discount";
import { useAddDiscount } from "@/hooks/useAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import TopPage from "../../_components/TopPage";
import InputText from "@/components/modules/Input/InputText";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";

const AddDiscount = () => {
  const [type, setType] = useState<TType>("fixedProduct");
  const { mutateAsync } = useAddDiscount();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { touchedFields, errors, isValid },
  } = useForm<IDiscountInputs>({
    mode: "onChange",
    defaultValues: {
      code: "",
      type: "fixedProduct",
      amount: null,
      amountFixed: null,
      amountPercent: null,
      usageCount: null,
    },
  });

  const onSubmit: SubmitHandler<IDiscountInputs> = async data => {
    data.amount = type === "fixedProduct" ? data.amountFixed : data.amountPercent;
    delete data.amountFixed;
    delete data.amountPercent;
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

  const amountHandler = () => {
    switch (type) {
      case "fixedProduct":
        return (
          <InputText
            id="amountFixed"
            label="میزان"
            type="text"
            message={errors.amountFixed ? errors.amountFixed.message : ""}
            msgWidth="w-64"
          >
            <input
              type="number"
              inputMode="numeric"
              placeholder=""
              className={`form__input pr-6 ${errors.amountFixed && "border-cancel dark:border-cancel"} ${touchedFields.amountFixed && !errors?.amountFixed && "border-success dark:border-success"}`}
              dir="rtl"
              {...register("amountFixed", {
                required: { value: true, message: "میزان اجباری هست" },
                pattern: { value: /^[0-9]+$/, message: "فقط از عدد استفاده کنید" },
              })}
            />
          </InputText>
        );
      case "percent":
        return (
          <InputText
            id="amountPercent"
            label="میزان"
            type="text"
            message={errors.amountPercent ? errors.amountPercent.message : ""}
            msgWidth="w-64"
          >
            <input
              type="number"
              inputMode="numeric"
              placeholder=""
              className={`form__input pr-6 ${errors.amountPercent && "border-cancel dark:border-cancel"} ${touchedFields.amountPercent && !errors?.amountPercent && "border-success dark:border-success"}`}
              dir="rtl"
              {...register("amountPercent", {
                required: { value: true, message: "میزان اجباری هست" },
                pattern: { value: /^[0-9]+$/, message: "فقط از عدد استفاده کنید" },
                min: { value: 1, message: "میزان باید بیشتر از ۱ باشد" },
                max: { value: 100, message: "میزان باید کمتر از ۱۰۰ باشد" },
              })}
            />
          </InputText>
        );

      default:
        break;
    }
  };

  return (
    <>
      <TopPage title="افزودن کد تخفیف" link="/admin/discount" />
      <form onSubmit={handleSubmit(onSubmit)} className="font-IranYekan">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5 flex flex-col gap-2">
            <span className="mb-1 inline-block pr-4 text-sm font-semibold text-primary-900 dark:text-slate-300">
              نوع کد
            </span>
            <div className="flex gap-2">
              <label htmlFor="fixedProduct" className="radio-label">
                <input
                  type="radio"
                  name="type"
                  id="fixedProduct"
                  defaultChecked
                  className="radio-input"
                  onChange={e => typeHandler(e)}
                />
                <span>کد</span>
              </label>
              <label htmlFor="percent" className="radio-label">
                <input type="radio" name="type" id="percent" className="radio-input" onChange={e => typeHandler(e)} />
                <span>درصد</span>
              </label>
            </div>
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
                className={`form__input pr-6 ${errors.code && "border-cancel dark:border-cancel"} ${touchedFields.code && getValues().code !== "" && !errors?.code && "border-success dark:border-success"}`}
                dir="ltr"
                {...register("code", {
                  required: { value: true, message: "عنوان اجباری هست" },
                  pattern: { value: /^[a-zA-Z0-9-]+$/, message: "فقط از حروف انگلیسی و عدد استفاده کنید" },
                  minLength: { value: 3, message: "عنوان باید بیشتر از ۳ کاراکتر باشد" },
                  maxLength: { value: 20, message: "عنوان باید کمتر از ۲۰ کاراکتر باشد" },
                })}
              />
            </InputText>
            {amountHandler()}
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
                className={`form__input pr-6 ${errors.usageCount && "border-cancel dark:border-cancel"} ${!errors?.usageCount && "border-success dark:border-success"}`}
                dir="rtl"
                {...register("usageCount", { min: { value: 1, message: "تعداد باید بیشتر از ۱ باشد" } })}
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
