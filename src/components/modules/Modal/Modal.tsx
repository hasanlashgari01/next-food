"use client";

import React from "react";

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
    <div className="fixed">
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity dark:bg-slate-950/70 ${isShow ? "visible z-10 opacity-100" : "invisible opacity-0"}`}
        onClick={hideModal}
      ></div>
      <div
        className={`font-IranYekan fixed inset-x-1/2 bottom-0 z-20 flex h-fit w-dvw translate-x-1/2 flex-col rounded-t-[36px] bg-slate-100 p-8 transition-transform max-sm:h-[50dvh] max-sm:justify-evenly sm:inset-y-1/2 sm:max-w-lg sm:-translate-y-1/2 sm:rounded-2xl lg:max-w-2xl lg:rounded-2xl lg:py-14 dark:bg-gray-800 ${isShow ? "visible z-10 translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"}`}
      >
        <div className="text-center">
          <h3 className="text-base font-semibold text-slate-900 sm:text-xl lg:text-2xl dark:text-neutral-50">
            {title}
          </h3>
          <p className="mt-3 text-xs font-medium leading-5 text-slate-700 empty:hidden xs:mt-4 sm:text-sm lg:text-base dark:text-neutral-300">
            {description}
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 max-lg:flex-col">
          <button className={`btn h-12 flex-1 max-lg:basis-12 ${confirmStyle}`} onClick={confirmAction}>
            {confirmText}
          </button>
          <button className={`btn h-12 flex-1 max-lg:basis-12 ${cancelStyle}`} onClick={hideModal}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
