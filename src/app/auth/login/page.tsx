"use client";

import InputPassword from "@/components/modules/Input/InputPassword";
import InputText from "@/components/modules/Input/InputText";
import Link from "next/link";
import { useState } from "react";
import LeftSide from "../_components/LeftSide";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-background min-h-screen flex flex-col lg:flex-row-reverse lg:py-11 lg:px-8">
      <LeftSide height="h-60" />
      <form className="max-sm:mx-4 max-lg:mt-6 lg:pt-12 lg:flex-1" onSubmit={loginHandler}>
        <div className="text-center">
          <h3 className="text-primary-900 text-2xl lg:text-4xl font-semibold/8 lg:font-bold">ورود</h3>
          <p className="mt-2 text-primary-500 font-medium text-sm/5 lg:text-2xl">خوش اومدی</p>
        </div>
        <div className="mt-5 flex flex-col gap-4 max-w-xs sm:max-w-sm mx-auto">
          <InputText
            id="email"
            label="ایمیل"
            type="text"
            value={email}
            changeHandler={e => setEmail(e.currentTarget.value)}
            isValid={false}
            message=""
            />
          <InputPassword
            value={password}
            changeHandler={e => setPassword(e.currentTarget.value)}
            message=""
            isValid={false}
          />
          <button
            type="submit"
            className="mt-5 w-full py-4 rounded-full bg-primary-900 text-white text-base font-semibold"
          >
            ورود
          </button>
        </div>
        <div className="mt-4 flex gap-1.5 justify-center text-sm/8 font-semibold">
          <span className="text-primary-900">هنوز ثبت نام نکردی؟</span>
          <Link href="/auth/register" className="text-blue-700">
            ثبت نام
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
