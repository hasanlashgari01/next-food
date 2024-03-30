"use client";

import { useGetCart } from "@/hooks/useCart";
import EmptyPage from "./EmptyPage";
import Factor from "./Factor";
import Position from "./Position";
import { useState } from "react";
import Modal from "@/components/modules/Modal/Modal";

const Index = () => {
  const { isLoading, data, refetch } = useGetCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(data);

  return (
    <>
      <Position setIsModalOpen={setIsModalOpen} />
      {!isLoading &&
        (data && data?.foods.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <Factor foods={data?.foods} refetch={refetch} setIsModalOpen={setIsModalOpen} />
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
