"use client";

import { api } from "@/config/axiosConfig";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";

interface OtpProps {
  fullName: string;
  signUpMethod: "email" | "mobile";
  email?: string;
  mobile?: string;
  password: string;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
}

const RESEND_TIME: number = 90;

const Otp: React.FC<OtpProps> = ({ fullName, signUpMethod, mobile, email, password, setShowOtp }) => {
  // if (mobile?.length !== 11) redirect("/auth/register");
  const router = useRouter();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [time, setTime] = useState<number>(RESEND_TIME);

  useEffect(() => {
    code.length === 5 ? setIsValid(true) : setIsValid(false);
  }, [code]);

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(s => s - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const checkOtpHandler = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post(`/auth/check-otp`, { signUpMethod, mobile, code })
      .then(res => {
        toast.success(res.data.message);
        router.replace("/admin/home");
      })
      .catch(err => {
        toast.error(err.response.data.message);
        if (err.response.status === 400) {
          setTime(RESEND_TIME);
        }
      });
  };

  const resendOtp = (e: React.MouseEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/auth/send-otp`, { fullName, signUpMethod, mobile, password })
      .then(res => {
        if (res.status === 201) {
          setTime(RESEND_TIME);
          setCode("");
          toast.success("کد مجدد ارسال شد");
        }
      });
  };

  return (
    <form className="mx-auto mt-12 flex max-w-xs flex-col gap-4 sm:max-w-sm" onSubmit={checkOtpHandler}>
      <p className="mb-6 text-center text-xs sm:text-sm">
        کد تایید به شماره {signUpMethod === "mobile" ? "موبایل" : "ایمیل"} {signUpMethod === "mobile" ? mobile : email}{" "}
        ارسال شد
      </p>
      <OTPInput
        value={code}
        onChange={setCode}
        numInputs={5}
        inputType="number"
        shouldAutoFocus={true}
        containerStyle={{
          direction: "ltr",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "10px",
        }}
        inputStyle={{
          width: "45px",
          height: "45px",
          borderRadius: "10px",
          border: "1px solid #E2E8F0",
          outline: "none",
        }}
        renderInput={props => (
          <input
            {...props}
            inputMode="numeric"
            className="m-0 appearance-none shadow-sm transition-all duration-200 ease-linear focus:shadow-md"
          />
        )}
      />
      <div className="mt-6 flex justify-between px-4 text-sm text-[#717171]">
        <button
          disabled={time > 0}
          className="cursor-pointer disabled:cursor-not-allowed disabled:text-slate-300"
          onClick={resendOtp}
        >
          دریافت مجدد کد
        </button>
        <button
          disabled={time > 0}
          className="cursor-pointer disabled:cursor-not-allowed disabled:text-slate-300"
          onClick={() => setShowOtp(false)}
        >
          ویرایش شماره
        </button>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="mt-2 w-full rounded-full bg-primary-900 py-4 text-base font-semibold text-white transition-all duration-500 ease-linear disabled:cursor-not-allowed disabled:bg-primary-500/30"
      >
        تایید
      </button>
    </form>
  );
};

export default Otp;
