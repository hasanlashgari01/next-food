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
  signUpMethod: "email" | "mobile";
  mobile: string;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
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
  signUpMethod,
  mobile,
  setShowOtp,
  submitHandler,
  children,
}) => {
  return (
    <>
      <form className="max-lg:mt-6 max-sm:mx-4 lg:flex-1 lg:pt-12" onSubmit={submitHandler}>
        {showOtp ? (
          <Otp signUpMethod={signUpMethod} mobile={mobile} />
        ) : (
          <>
            <div className="text-center">
              <h3 className="font-semibold/8 text-2xl text-primary-900 lg:text-4xl lg:font-bold">{formTitle}</h3>
              <p className="mt-2 text-sm/5 font-medium text-primary-500 lg:text-2xl">{formSubTitle}</p>
            </div>
            <div className="mx-auto mt-5 lg:mt-10 flex max-w-xs flex-col gap-4 sm:max-w-sm">
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
              <span className="text-primary-900">{helpText}</span>
              <Link href={`/auth/${helpLink}`} className="text-blue-700">
                {helpLinkTitle}
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default RightSide;
