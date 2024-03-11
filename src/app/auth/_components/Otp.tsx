import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

interface OtpProps {
  signUpMethod: "email" | "mobile";
  email?: string;
  mobile?: string;
}

const Otp: React.FC<OtpProps> = ({ signUpMethod, mobile, email }) => {
  if (mobile?.length !== 11) redirect("/auth/register");

  const [isValid, setIsValid] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    otp.length === 5 ? setIsValid(true) : setIsValid(false);
  }, [otp]);

  const checkOtpHandler = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/auth/check-otp`, { signUpMethod, mobile, otp: String(otp) })
      .then(res => console.log(res));

    console.log(typeof otp.length);
  };

  return (
    <form className="mx-auto mt-12 flex max-w-xs flex-col gap-4 sm:max-w-sm" onSubmit={checkOtpHandler}>
      <p className="mb-6 text-center text-xs sm:text-sm">
        کد تایید به شماره {signUpMethod === "mobile" ? "موبایل" : "ایمیل"} {signUpMethod === "mobile" ? mobile : email}{" "}
        ارسال شد
      </p>
      <OTPInput
        value={otp}
        onChange={setOtp}
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
        <span className="cursor-pointer">دریافت مجدد کد</span>
        <span className="cursor-pointer">ویرایش شماره</span>
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
