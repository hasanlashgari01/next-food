import Link from "next/link";
import React from "react";

interface RightSideProps {
  formTitle: string;
  formSubTitle: string;
  submitTitle: string;
  helpText: string;
  helpLink: string;
  helpLinkTitle: string;
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
  submitHandler,
  children,
}) => {
  return (
    <form className="max-lg:mt-6 max-sm:mx-4 lg:flex-1 lg:pt-12" onSubmit={submitHandler}>
      <div className="text-center">
        <h3 className="font-semibold/8 text-2xl text-primary-900 lg:text-4xl lg:font-bold">{formTitle}</h3>
        <p className="mt-2 text-sm/5 font-medium text-primary-500 lg:text-2xl">{formSubTitle}</p>
      </div>
      <div className="mx-auto mt-5 flex max-w-xs flex-col gap-4 sm:max-w-sm">
        {children}
        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-primary-900 py-4 text-base font-semibold text-white"
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
    </form>
  );
};

export default RightSide;
