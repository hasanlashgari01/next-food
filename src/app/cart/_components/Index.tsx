"use client";

import { useGetCart } from "@/hooks/useCart";
import EmptyPage from "./EmptyPage";
import Factor from "./Factor";
import Position from "./Position";
import { useState } from "react";
import Modal from "@/components/modules/Modal/Modal";
import CartList from "./CartList";

const Index = () => {
  const { isLoading, data, refetch } = useGetCart();
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const previousStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    if (step === 3) return false;
    setStep(step + 1);
  };
  return (
    <>
      <Position
        step={step}
        setStep={setStep}
        previousStep={previousStep}
        nextStep={nextStep}
        setIsModalOpen={setIsModalOpen}
      />
      {!isLoading &&
        (data && data?.foods.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* {step === 1 && <CartList data={data} refetch={refetch} />} */}
            <div className="col-span-1 lg:col-span-2">{step === 1 && <CartList data={data} refetch={refetch} />}</div>
            <Factor step={step} foods={data?.foods} refetch={refetch} setIsModalOpen={setIsModalOpen} />
          </div>
        ) : (
          <EmptyPage />
        ))}
      <Modal
        isShow={isModalOpen}
        setIsShow={setIsModalOpen}
        cancelText="بازگشت"
        cancelStyle="btn-success"
        confirmText="حذف"
        confirmStyle="btn-danger"
        title="حذف محصولات"
        description="همه محصولات سبد خرید شما حذف شود؟"
        // confirmAction={}
      />
    </>
  );
};

export default Index;
