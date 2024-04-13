"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import ModalLayout from "./ModalLayout";

type ModalButtonType = "btn-default" | "btn-primary" | "btn-danger" | "btn-success" | "btn-warning" | "btn-info";

interface ModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  confirmText: string;
  confirmStyle?: ModalButtonType;
  cancelText: string;
  cancelStyle?: ModalButtonType;
  confirmAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isShow,
  setIsShow,
  title,
  description,
  confirmText,
  confirmStyle,
  cancelText,
  cancelStyle,
  confirmAction,
}) => {
  const hideModal = () => setIsShow(false);

  return (
    <ModalLayout isShow={isShow} setIsShow={setIsShow} className="h-fit">
      <div className="text-center">
        <h3 className="text-base font-semibold text-slate-900 sm:text-xl lg:text-2xl dark:text-neutral-50">{title}</h3>
        <p className="mt-3 text-xs font-medium leading-5 text-slate-700 empty:hidden xs:mt-4 sm:text-sm lg:text-base dark:text-neutral-300">
          {description}
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4 max-lg:flex-col">
        <button className={twMerge("btn h-12 flex-1 max-lg:basis-12", `${confirmStyle}`)} onClick={confirmAction}>
          {confirmText}
        </button>
        <button className={twMerge("btn h-12 flex-1 max-lg:basis-12", `${cancelStyle}`)} onClick={hideModal}>
          {cancelText}
        </button>
      </div>
    </ModalLayout>
  );
};

export default Modal;
