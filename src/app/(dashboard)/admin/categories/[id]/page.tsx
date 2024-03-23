"use client";

import InputText from "@/components/modules/Input/InputText";
import { useAddCategory, useGetCategory, useUpdateCategory } from "@/hooks/useAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import TopPage from "../../_components/TopPage";

interface Inputs {
  title: string;
  slug: string;
}

const EditCategoryPage = () => {
  const { id }: { id: string } = useParams();
  const { data } = useGetCategory(id);
  const { mutateAsync } = useUpdateCategory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { touchedFields, errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
    },
    values: data,
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const { message } = await mutateAsync({ data, id });
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <TopPage title="به روزرسانی دسته بندی ها" link="/admin/categories" />
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
          به روز رسانی دسته بندی
        </button>
      </form>
    </>
  );
};
export default EditCategoryPage;
