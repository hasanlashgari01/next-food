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
          <span className="font-semibold text-primary-900">{label}</span>
          <span
            className={`line-clamp-1 w-48 text-left font-semibold text-red-500 transition-all duration-200 ease-linear ${message ? "opacity-100" : "opacity-0"} `}
          >
            {message}
          </span>
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={changeHandler}
          className={`mt-2 w-full rounded-[10px] border-2 py-4 pl-6 pr-14 font-sans text-sm/6 font-medium text-primary-500 outline-none transition-all duration-200 ease-linear ${isValid && !message && "border-success"} ${message && "border-cancel"}`}
          dir={dir}
        />
      </label>
    </div>
  );
};

export default InputText;
