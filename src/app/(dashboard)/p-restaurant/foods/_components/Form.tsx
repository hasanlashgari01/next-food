"use client";

import { IFoodData } from "@/common/interface/food";
import ImageUpload from "@/components/modules/Input/ImageUpload";
import InputText from "@/components/modules/Input/InputText";
import { useCreateFood, useUpdateFood } from "@/hooks/useRestaurant";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface FormProps {
  data?: IFoodData;
  isEdit?: boolean;
  id?: string;
}

const Form: React.FC<FormProps> = ({ data, isEdit = false, id }) => {
  const { mutateAsync: mutateAsyncCreate } = useCreateFood();
  const { mutateAsync: mutateAsyncUpdate } = useUpdateFood();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { touchedFields, errors },
  } = useForm<IFoodData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: null,
      menuId: "65d11bc9216d141768efc396",
      weight: null,
      amount: null,
      percent: null,
      image: "",
    },
    values: data,
  });

  const onSubmit: SubmitHandler<IFoodData> = async data => {
    try {
      let msg = "";
      if (isEdit && id) {
        const { message } = await mutateAsyncUpdate({ data, id });
        msg = message;
      } else {
        setValue("image", "");
        const { message } = await mutateAsyncCreate(data);
        msg = message;
      }
      toast.success(msg);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <ImageUpload formImage={getValues("image") as string} setValue={setValue} />
      <div className="space-y-5">
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InputText
            id="title"
            type="text"
            label="عنوان"
            {...register("title")}
            message={errors.title ? errors.title.message : ""}
          >
            <input
              type="text"
              className={twMerge(
                "form__input pr-6",
                `${errors.title && "border-cancel dark:border-cancel"}`,
                `${touchedFields.title && getValues().title !== "" && !errors?.title && "border-success dark:border-success"}`,
              )}
              dir="rtl"
              {...register("title", {
                required: { value: true, message: "عنوان اجباری هست" },
                pattern: { value: /^[\u0600-\u06FF\s]+$/, message: "عنوان باید فارسی باشد" },
                minLength: { value: 3, message: "عنوان باید بیشتر از ۳ کاراکتر باشد" },
                maxLength: { value: 255, message: "عنوان باید کمتر از ۲۵۵ کاراکتر باشد" },
              })}
            />
          </InputText>
          <InputText
            id="price"
            type="text"
            label="قیمت"
            {...register("price")}
            message={errors.price ? errors.price.message : ""}
          >
            <input
              type="text"
              className={twMerge(
                "form__input pr-6",
                `${errors.price && "border-cancel dark:border-cancel"}`,
                `${touchedFields.price && getValues().price !== null && !errors?.price && "border-success dark:border-success"}`,
              )}
              dir="rtl"
              {...register("price", {
                required: { value: true, message: "قیمت اجباری هست" },
                pattern: { value: /^[0-9]+$/, message: "فقط ارقام انگلیسی مجاز هست" },
              })}
            />
          </InputText>
          <InputText
            id="weight"
            type="text"
            label="وزن"
            {...register("weight")}
            message={errors.weight ? errors.weight.message : ""}
          >
            <input
              type="text"
              className={twMerge(
                "form__input pr-6",
                `${errors.weight && "border-cancel dark:border-cancel"}`,
                `${touchedFields.weight && getValues().weight !== null && !errors?.weight && "border-success dark:border-success"}`,
              )}
              dir="rtl"
              {...register("weight", {
                required: { value: true, message: "قیمت اجباری هست" },
                pattern: { value: /^[0-9]+$/, message: "فقط ارقام مجاز هست" },
              })}
            />
          </InputText>
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
        </div>
        <div className="lg:w-1/2 lg:pl-2.5">
          <InputText
            id="description"
            type="text"
            label="توضیحات"
            {...register("description")}
            message={errors.description ? errors.description.message : ""}
          >
            <textarea
              cols={30}
              rows={10}
              placeholder="مواد اولیه غذا (خمیر پیتزا آمریکایی، کالباس پپرونی گوشت ۷۰%)"
              dir="rtl"
              className={twMerge(
                "form__input pr-6",
                `${errors.description && "border-cancel dark:border-cancel"}`,
                `${touchedFields.description && getValues().description !== "" && !errors?.description && "border-success dark:border-success"}`,
              )}
              {...register("description", {
                required: { value: true, message: "توضیحات اجباری هست" },
                pattern: { value: /^[\u0600-\u06FF،٪%()0-9\s]+$/, message: "توضیحات باید فارسی باشد" },
                minLength: { value: 3, message: "توضیحات باید بیشتر از ۳ کاراکتر باشد" },
                maxLength: { value: 255, message: "توضیحات باید کمتر از ۲۵۵ کاراکتر باشد" },
              })}
            ></textarea>
          </InputText>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-8">
        ایجاد غذا
      </button>
    </form>
  );
};

export default Form;
