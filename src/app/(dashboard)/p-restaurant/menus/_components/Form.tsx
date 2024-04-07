"use client";

import { IMenuData } from "@/common/interface/restaurant";
import InputText from "@/components/modules/Input/InputText";
import { useGetUser } from "@/hooks/useAuth";
import { useCreateMenu, useUpdateMenu } from "@/hooks/useRestaurant";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface FormProps extends IMenuData {
  isEdit?: boolean;
  id?: string;
}

const Form: React.FC<FormProps> = ({ title, slug, isEdit = false, id }) => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { mutateAsync: mutateAsyncCreate } = useCreateMenu();
  const { mutateAsync: mutateAsyncUpdate } = useUpdateMenu();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { touchedFields, errors },
  } = useForm<IMenuData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      restaurantId: "",
    },
    values: {
      title,
      slug,
      restaurantId: restaurant || "",
    },
  });

  const onSubmit: SubmitHandler<IMenuData> = async data => {
    try {
      let msg = "";
      if (isEdit && id) {
        const { message } = await mutateAsyncUpdate({ data, id });
        msg = message;
      } else {
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
      <div className="flex flex-col gap-4 lg:w-1/2">
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
              maxLength: { value: 20, message: "عنوان باید کمتر از ۲۰ کاراکتر باشد" },
            })}
          />
        </InputText>
        <InputText
          id="slug"
          type="text"
          label="آدرس"
          {...register("slug")}
          message={errors.slug ? errors.slug.message : ""}
        >
          <input
            type="text"
            className={twMerge(
              "form__input pr-6",
              `${errors.slug && "border-cancel dark:border-cancel"}`,
              `${touchedFields.slug && getValues().slug !== "" && !errors?.slug && "border-success dark:border-success"}`,
            )}
            dir="rtl"
            {...register("slug", {
              required: { value: true, message: "عنوان اجباری هست" },
              pattern: { value: /^[a-zA-Z]+$/, message: "فقط از حروف انگلیسی استفاده کنید" },
              minLength: { value: 3, message: "عنوان باید بیشتر از ۳ کاراکتر باشد" },
              maxLength: { value: 20, message: "عنوان باید کمتر از ۲۰ کاراکتر باشد" },
            })}
          />
        </InputText>
      </div>
      <button type="submit" className="btn btn-primary mt-8">
        ثبت
      </button>
    </form>
  );
};
export default Form;
