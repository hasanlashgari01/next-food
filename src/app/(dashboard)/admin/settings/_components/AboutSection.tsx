"use client";

import { IUser, TGender } from "@/common/interface/user";
import InputText from "@/components/modules/Input/InputText";
import { useRemoveAvatar } from "@/hooks/useAuth";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";

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
      <h2 className="mb-4 hidden text-xl lg:inline-block">درباره شما</h2>
      <form className="col-span-12 grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 grid gap-4 md:grid-cols-2">
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
                  // if avatar exist avatar else getvalues.avatarUrl exist show avatar else show default avatar
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
                className="group absolute bottom-0 right-0 cursor-pointer rounded-full bg-red-500 p-2 text-white sm:p-3"
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
          <div className="flex flex-col gap-2">
            <span className="mb-1 inline-block pr-4 text-sm font-semibold text-primary-900 dark:text-slate-300">
              جنسیت
            </span>
            <div className="flex gap-2">
              <label htmlFor="male" className="radio-label">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  className="radio-input"
                  {...register("gender", { required: true, onChange: event => genderHandler(event) })}
                />
                <span>مرد</span>
              </label>
              <label htmlFor="female" className="radio-label">
                <input
                  type="radio"
                  id="female"
                  value="female"
                  className="radio-input"
                  {...register("gender", { required: true, onChange: event => genderHandler(event) })}
                />
                <span>زن</span>
              </label>
              <label htmlFor="other" className="radio-label">
                <input
                  type="radio"
                  id="other"
                  value="other"
                  className="radio-input"
                  {...register("gender", { required: true, onChange: event => genderHandler(event) })}
                />
                <span>سایر</span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="add-btn col-span-5 mt-4 w-fit">
          ذخیره
        </button>
      </form>
    </>
  );
};
export default AboutSection;
