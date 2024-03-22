"use client";

import InputText from "@/components/modules/Input/InputText";
import { useAddCategory } from "@/hooks/useAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Top from "../_components/Top";

interface Inputs {
  title: string;
  slug: string;
}

const AddCategory = () => {
  const { mutateAsync } = useAddCategory();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { touchedFields, errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Top title="افزودن دسته بندی" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <InputText id="title" label="عنوان دسته بندی" type="text" message={errors.title ? errors.title.message : ""}>
            <input
              type="text"
              className={`form__input pr-6 ${errors.title && "border-cancel dark:border-cancel"} ${touchedFields.title && getValues().title !== "" && !errors?.title && "border-success dark:border-success"}`}
              dir="rtl"
              {...register("title", {
                required: { value: true, message: "عنوان اجباری هست" },
                minLength: { value: 3, message: "عنوان باید بیشتر از ۳ کاراکتر باشد" },
                maxLength: { value: 30, message: "عنوان باید کمتر از ۳۰ کاراکتر باشد" },
              })}
            />
          </InputText>
          <InputText id="slug" label="لینک دسته بندی" type="text" message={errors.slug ? errors.slug.message : ""}>
            <input
              type="text"
              className={`form__input pr-6 ${errors.title && "border-cancel dark:border-cancel"} ${touchedFields.title && getValues().title !== "" && !errors?.title && "border-success dark:border-success"}`}
              dir="rtl"
              {...register("slug", {
                required: { value: true, message: "لینک اجباری هست" },
                minLength: { value: 3, message: "لینک باید بیشتر از ۳ کاراکتر باشد" },
                maxLength: { value: 24, message: "لینک باید کمتر از ۳۰ کاراکتر باشد" },
              })}
            />
          </InputText>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary mt-5 py-4 text-base font-semibold text-white transition-all duration-500 ease-linear disabled:cursor-not-allowed disabled:bg-blue-700/90"
        >
          ایجاد دسته بندی
        </button>
      </form>
    </>
  );
};

export default AddCategory;