import Link from "next/link";
import React from "react";
import Otp from "./Otp";

interface RightSideProps {
  formTitle: string;
  formSubTitle: string;
  submitTitle: string;
  helpText: string;
  helpLink: string;
  helpLinkTitle: string;
  isValid: boolean;
  showOtp: boolean;
  fullName?: string | undefined;
  signUpMethod: "email" | "mobile";
  mobile: string;
  password?: string | undefined;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

const RightSide: React.FC<RightSideProps> = ({
  formTitle,
  formSubTitle,
  submitTitle,
  helpText,
  helpLink,
  helpLinkTitle,
  isValid,
  showOtp,
  fullName,
  signUpMethod,
  mobile,
  password,
  setShowOtp,
  submitHandler,
  children,
}) => {
  return (
    <>
      <div className="max-lg:mt-6 max-sm:mx-4 lg:flex-1 lg:pt-12">
        {showOtp ? (
          <Otp
            fullName={fullName}
            signUpMethod={signUpMethod}
            mobile={mobile}
            password={password}
            setShowOtp={setShowOtp}
          />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="text-center">
              <h3 className="font-semibold/8 text-2xl text-primary-900 lg:text-4xl lg:font-bold dark:text-white">
                {formTitle}
              </h3>
              <p className="mt-2 text-sm/5 font-medium text-primary-500 lg:text-2xl dark:text-slate-300">
                {formSubTitle}
              </p>
            </div>
            <div className="mx-auto mt-5 flex max-w-xs flex-col gap-4 sm:max-w-sm lg:mt-10">
              {children}
              <button
                type="submit"
                disabled={!isValid}
                className="mt-5 w-full rounded-full bg-primary-900 py-4 text-base font-semibold text-white transition-all duration-500 ease-linear disabled:cursor-not-allowed disabled:bg-primary-500/30"
              >
                {submitTitle}
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-1.5 text-sm/8 font-semibold">
              <span className="text-primary-900 dark:text-slate-300">{helpText}</span>
              <Link href={`/auth/${helpLink}`} className="text-blue-700 dark:text-blue-500">
                {helpLinkTitle}
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default RightSide;
