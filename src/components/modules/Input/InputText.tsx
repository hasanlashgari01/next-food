"use client";

import React from "react";

type InputType = "tel" | "text";

interface InputProps {
  id: string;
  label: string;
  type: InputType;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dir?: "ltr" | "rtl";
  isValid: boolean;
  message?: string | null;
}

const InputText: React.FC<InputProps> = ({ id, label, type, value, changeHandler, dir = "ltr", isValid, message }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm">
        <div className="flex justify-between px-4">
          <span className="text-primary-900 font-semibold">{label}</span>
          <span
            className={`w-48 text-left text-red-500 font-semibold transition-all duration-200 ease-linear line-clamp-1 ${message ? "opacity-100" : "opacity-0"} `}
          >
            {message}
          </span>
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={changeHandler}
          className={`w-full mt-2 pl-6 pr-14 py-4 text-primary-500 font-sans font-medium text-sm/6 outline-none rounded-[10px] border-2 transition-all duration-200 ease-linear ${isValid && !message && "border-success"} ${message && "border-cancel"}`}
          dir={dir}
        />
      </label>
    </div>
  );
};

export default InputText;
