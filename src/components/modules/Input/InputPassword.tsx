"use client";

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface InputProps {
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  message?: string | null;
}

const InputPassword: React.FC<InputProps> = ({ value, changeHandler, isValid, message }) => {
  const [type, setType] = useState<"text" | "password">("password");
  const [eye, setEye] = useState<boolean>(false);

  const showPassword = () => {
    setEye(true);
    setType("text");
  };

  const hidePassword = () => {
    setEye(false);
    setType("password");
  };

  return (
    <label htmlFor="password" className="text-sm">
      <div className="flex justify-between px-4">
        <span className="text-primary-900 font-semibold">رمز عبور</span>
        {message && <span className="w-48 text-left text-red-500 font-semibold">{message}</span>}
      </div>
      <div className="relative mt-2">
        <input
          type={type}
          id="password"
          value={value}
          onChange={changeHandler}
          className={`w-full pl-6 pr-14 py-4 text-primary-500 font-sans font-medium text-sm/6 outline-none rounded-[10px] border-2 ${isValid && "border-success"} ${message && "border-cancel"}`}
          dir="ltr"
        />
        <span className="absolute right-6 size-5 top-1/2 -translate-y-1/2 cursor-pointer">
          {eye ? (
            <HiOutlineEyeOff className="size-5" onClick={hidePassword} />
          ) : (
            <HiOutlineEye className="size-5" onClick={showPassword} />
          )}
        </span>
      </div>
    </label>
  );
};

export default InputPassword;
