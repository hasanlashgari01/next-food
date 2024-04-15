"use client";

import { Dispatch, SetStateAction } from "react";
import ModalLayout from "./ModalLayout";
import Link from "next/link";

interface LoginModalProps {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({ isShow, setIsShow }) => {
  return (
    <ModalLayout isShow={isShow} setIsShow={setIsShow} className="h-fit">
      <h1 className="title">وارد حساب کاربری خود شوید</h1>
      <div className="mt-10 flex items-center justify-center gap-5">
        <Link href="/auth/login" className="redirect w-32 rounded-lg text-center">
          ورود
        </Link>
        <Link
          href="/auth/register"
          className="w-40 rounded-lg border border-teal-600 bg-transparent px-6 py-3 text-center transition-colors duration-200 ease-linear hover:bg-teal-600 hover:text-white md:py-4"
        >
          ثبت نام
        </Link>
      </div>
    </ModalLayout>
  );
};

export default LoginModal;
