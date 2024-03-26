"use client";

import { useChangePassword } from "@/hooks/useAuth";
import { IPasswordData } from "@/services/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputPassword from "../Input/InputPassword";
import { PasswordPattern } from "@/constants/regex";

interface IInputProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
type TPassword = "password" | "text";

const ChangePassword = () => {
  const { mutateAsync } = useChangePassword();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = useForm<IInputProps>({
    mode: "all",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [currentPassword, setCurrentPassword] = useState<TPassword>("password");
  const [newPassword, setNewPassword] = useState<TPassword>("password");
  const [confirmPassword, setConfirmPassword] = useState<TPassword>("password");

  const onSubmit = async (data: IInputProps) => {
    try {
      const { message } = await mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      } as IPasswordData);
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-6">
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-6 grid gap-4 sm:col-span-4 xl:col-span-3">
        <InputPassword
          message={errors.currentPassword ? errors.currentPassword.message : ""}
          label="رمز عبور فعلی"
          type={currentPassword}
          onType={setCurrentPassword}
        >
          <input
            type={currentPassword}
            id="currentPassword"
            className={`form__input font-sans ${dirtyFields.currentPassword && !errors.currentPassword && "border-success"} ${errors.currentPassword && "border-cancel"}`}
            dir="ltr"
            {...register("currentPassword", {
              required: { value: true, message: "رمز عبور اجباری هست" },
              minLength: { value: 8, message: "رمز عبور بین ۸ الی  ۳۲ کاراکتر باشد" },
              maxLength: { value: 32, message: "رمز عبور بین ۸ الی ۳۲ کاراکتر باشد" },
              pattern: { value: PasswordPattern, message: "رمز عبور صحیح نمی باشد" },
            })}
          />
        </InputPassword>
        <InputPassword
          message={errors.newPassword ? errors.newPassword.message : ""}
          label="رمز عبور جدید"
          type={newPassword}
          onType={setNewPassword}
        >
          <input
            type={newPassword}
            id="newPassword"
            className={`form__input font-sans ${dirtyFields.newPassword && !errors.newPassword && "border-success"} ${errors.newPassword && "border-cancel"}`}
            dir="ltr"
            {...register("newPassword", {
              required: { value: true, message: "رمز عبور اجباری هست" },
              minLength: { value: 8, message: "رمز عبور بین ۸ الی  ۳۲ کاراکتر باشد" },
              maxLength: { value: 32, message: "رمز عبور بین ۸ الی ۳۲ کاراکتر باشد" },
              pattern: { value: PasswordPattern, message: "رمز عبور صحیح نمی باشد" },
              validate: (val: string) => {
                if (watch("currentPassword") === val) {
                  return "رمز عبور جدید با قبلی یکسان است";
                }
              },
            })}
          />
        </InputPassword>
        <InputPassword
          message={errors.confirmPassword ? errors.confirmPassword.message : ""}
          label="تکرار رمز عبور"
          type={confirmPassword}
          onType={setConfirmPassword}
        >
          <input
            type={confirmPassword}
            id="confirmPassword"
            className={`form__input font-sans ${dirtyFields.confirmPassword && !errors.confirmPassword && "border-success"} ${errors.confirmPassword && "border-cancel"}`}
            dir="ltr"
            {...register("confirmPassword", {
              required: { value: true, message: "تکرار رمز عبور اجباری هست" },
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return "رمز عبور یکسان نیست";
                }
              },
            })}
          />
        </InputPassword>
        <button type="submit" disabled={!isValid} className="add-btn w-fit max-xl:mt-0">
          تغییر رمز عبور
        </button>
      </form>
      {/* describe */}
      <ul className="col-span-6 h-fit list-decimal rounded-lg border border-green-300 p-5 drop-shadow-sm sm:col-span-4 xl:col-span-3 xl:mr-16 xl:mt-7 dark:border-green-800/70">
        <h3>رمز عبور صحیح</h3>
        <div className="my-2 pr-8 child:text-xs/6 child:text-green-500 md:child:text-sm/7 xl:child:text-base/8">
          <li>بین ۸ الی ۳۲ کاراکتر</li>
          <li>حداقل یک حرف بزرگ انگلیسی</li>
          <li>حداقل یک حرف کوچک انگلیسی</li>
          <li>حداقل یک عدد</li>
          <li>حداقل یک کاراکتر خاص</li>
        </div>
        <h3>می باشد</h3>
      </ul>
    </div>
  );
};

export default ChangePassword;
