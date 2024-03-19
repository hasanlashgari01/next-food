import { TextProps } from "@/common/interface/input";
import React from "react";

const InputText: React.FC<TextProps> = ({ id, label, message, children }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm">
        <div className="mb-2 flex justify-between px-4">
          <span className="font-semibold text-primary-900">{label}</span>
          <span
            className={`line-clamp-1 w-48 text-left font-semibold text-red-500 transition-all duration-200 ease-linear ${message ? "opacity-100" : "opacity-0"} `}
          >
            {message}
          </span>
        </div>
        {children}
      </label>
    </div>
  );
};

export default InputText;
