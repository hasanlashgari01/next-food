"use client";

import InputText from "@/components/modules/Input/InputText";
import TopPage from "../../_components/TopPage";
import { useForm } from "react-hook-form";
import { IProvince } from "@/common/interface/province";
import { useAddProvince } from "@/hooks/useAdmin";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const AddProvince = () => {
  const { mutateAsync } = useAddProvince();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { touchedFields, errors, isValid },
  } = useForm<IProvince>({
    mode: "onChange",
    defaultValues: {
      name: "",
      englishTitle: "",
    },
  });

  const onSubmit = async (data: IProvince) => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <TopPage title="افزودن استان" link="/admin/provinces" />
      <form onSubmit={handleSubmit(onSubmit)} className="font-IranYekan">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5 grid gap-4 sm:col-span-4 xl:col-span-2">
            <InputText
              id="name"
              label="نام"
              type="text"
              message={errors.name ? errors.name.message : ""}
              msgWidth="w-64"
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.name && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.name && getValues().name !== "" && !errors?.name && "border-success dark:border-success"}`,
                )}
                dir="rtl"
                {...register("name", { required: { value: true, message: "نام اجباری هست" } })}
              />
            </InputText>
            <InputText
              id="englishTitle"
              label="نام انگلیسی"
              type="text"
              message={errors.englishTitle ? errors.englishTitle.message : ""}
              msgWidth="w-64"
            >
              <input
                type="text"
                placeholder=""
                className={twMerge(
                  "form__input pr-6",
                  `${errors.englishTitle && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.englishTitle && getValues().englishTitle !== "" && !errors?.englishTitle && "border-success dark:border-success"}`,
                )}
                dir="ltr"
                {...register("englishTitle", {
                  required: { value: true, message: "نام انگلیسی اجباری هست" },
                  pattern: { value: /^[a-zA-Z-]+$/, message: "فقط از حروف انگلیسی استفاده کنید" },
                })}
              />
            </InputText>
          </div>
        </div>

        <button type="submit" disabled={!isValid} className="add-btn">
          ایجاد استان
        </button>
      </form>
    </>
  );
};
export default AddProvince;
