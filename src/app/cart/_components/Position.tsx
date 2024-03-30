"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { HiChevronRight, HiOutlineTrash } from "react-icons/hi2";
import PositionCart from "./PositionCart";
import PositionCompletion from "./PositionCompletion";
import PositionPayment from "./PositionPayment";
import { twMerge } from "tailwind-merge";

interface Props {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  previousStep: () => void;
  nextStep: () => void;
  setIsModalOpen: (value: boolean) => void;
}

const Position: React.FC<Props> = ({ step, setStep, previousStep, nextStep, setIsModalOpen }) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PositionCart step={step} setStep={setStep} action={nextStep} />;
      case 2:
        return <PositionCompletion step={step} setStep={setStep} action={nextStep} />;
      case 3:
        return <PositionPayment step={step} setStep={setStep} />;
    }
  };

  return (
    <section className="flex items-center justify-between py-6 lg:py-10">
      <div className="lg:hidden">
        <button disabled={step === 1} className="cart__topbar-btn" onClick={previousStep}>
          <HiChevronRight className="text-lg" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center lg:mx-auto lg:max-w-4xl">
        <div className="lg:hidden">{renderStep()}</div>
        <div className="relative hidden flex-1 items-center lg:flex">
          <div
            className={twMerge(
              "cart-border -z-10",
              step === 1 && "after:w-0 after:bg-blue-500",
              step === 2 && "after:w-3/6 after:bg-blue-500",
              step === 3 && "after:w-full after:bg-blue-500",
            )}
          ></div>
          <div className="flex flex-1 justify-between child:px-2.5">
            <PositionCart step={step} setStep={setStep} action={nextStep} />
            <PositionCompletion step={step} setStep={setStep} action={nextStep} />
            <PositionPayment step={step} setStep={setStep} />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <button className="cart__topbar-btn" onClick={() => setIsModalOpen(true)}>
          <HiOutlineTrash className="text-lg" />
        </button>
      </div>
    </section>
  );
};

export default Position;
