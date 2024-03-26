import { IUser, TGender } from "@/common/interface/user";
import InputText from "@/components/modules/Input/InputText";
import { genderValues } from "@/constants/radioValues";
import { useRemoveAvatar } from "@/hooks/useAuth";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";
import InputRadioGroup from "../Input/InputRadioGroup";

interface Props {
  isLoading: boolean;
  data: IUser;
  refetch: () => void;
  mutateAsync: (data: any) => Promise<any>;
}

const AboutSection: React.FC<Props> = ({ isLoading, data, refetch, mutateAsync }) => {
  const { mutateAsync: mutateAsyncRemove } = useRemoveAvatar();
  const { register, getValues, setValue, handleSubmit } = useForm<IUser>({
    mode: "all",
    defaultValues: {
      fullName: "",
      biography: "",
      avatarUrl: "",
      age: null,
      gender: null,
    },
    values: data,
  });
  const [avatar, setAvatar] = useState<string | null>(null);

  const genderHandler = (e: ChangeEvent<HTMLInputElement>) => setValue("gender", e.currentTarget.value as TGender);

  const onSubmit = async (data: any) => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const imageUploadHandler = (selectorFiles: FileList) => {
    const file = selectorFiles.item(0);

    setValue("avatarUrl", file as any);
    setAvatar(URL.createObjectURL(file as any));
  };

  const removeImageHandler = async () => {
    setValue("avatarUrl", "");
    try {
      const { message } = await mutateAsyncRemove();
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <form className="grid  gap-6 lg:grid-cols-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 grid gap-4 sm:col-span-3">
          <div className="relative flex flex-col gap-2">
            <input
              type="file"
              id="avatar"
              accept="image/png, image/webp, image/jpeg, image/jpg"
              className="hidden pr-6"
              {...register("avatarUrl")}
              onChange={e => imageUploadHandler(e.target.files as FileList)}
            />
            <label
              htmlFor="avatar"
              className="size-32 cursor-pointer rounded-full border border-slate-100 p-2 dark:border-slate-700"
            >
              {!isLoading ? (
                <Image
                  src={
                    avatar
                      ? avatar
                      : getValues()?.avatarUrl !== null
                        ? `${fileRoute}user/${getValues()?.avatarUrl}`
                        : "/Auth.png"
                  }
                  alt="پروفایل"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="size-full rounded-full object-cover object-top transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <div className="size-full animate-pulse rounded-full bg-amber-600"></div>
              )}
            </label>
            {!isLoading && getValues("avatarUrl") !== null && (
              <span
                className="group absolute bottom-0 right-0 cursor-pointer rounded-full bg-red-600 p-2 text-white max-sm:bottom-2 max-sm:right-2 sm:p-3"
                onClick={removeImageHandler}
              >
                <HiTrash className="transition-transform duration-300 group-hover:scale-125" />
              </span>
            )}
          </div>
          <InputText label="نام" type="text" id="name" message="">
            <input type="text" className="form__input pr-6" {...register("fullName")} />
          </InputText>
          <InputText label="بیوگرافی" type="text" id="name" message="">
            <textarea rows={1} className="form__input pr-6" {...register("biography")} />
          </InputText>
          <InputText label="سن" type="text" id="name" message="">
            <input type="text" className="form__input pr-6" {...register("age")} />
          </InputText>
          <InputRadioGroup data={genderValues} register={register} handler={genderHandler} label="جنسیت" />
        </div>
        <button type="submit" className="add-btn col-span-5 mt-4 w-fit">
          ذخیره
        </button>
      </form>
    </>
  );
};
export default AboutSection;
