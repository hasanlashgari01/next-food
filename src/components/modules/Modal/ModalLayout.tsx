"use client";

import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const ModalLayout: React.FC<Props> = ({ children, isShow, setIsShow, className }) => {
  return (
    <div className="modal">
      <div
        className={twMerge("wrapper", isShow ? "visible z-10 opacity-100" : "invisible opacity-0")}
        onClick={() => setIsShow(false)}
      ></div>
      <div
        className={twMerge(
          "box big",
          className,
          isShow ? "visible z-10 translate-y-0 opacity-100" : "invisible translate-y-full opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
