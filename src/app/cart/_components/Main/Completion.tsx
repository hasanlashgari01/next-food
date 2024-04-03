import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CompletionAddress from "./CompletionAddress";
import CompletionDelivery from "./CompletionDelivery";
import CompletionDescription from "./CompletionDescription";
import { ICompletionDelivery } from "@/common/interface/cart-page";

interface IProps {
  order: any;
  setOrder: Dispatch<SetStateAction<any>>;
}

const CompletionForm: React.FC<IProps> = ({ order, setOrder }) => {
  const [delivery, setDelivery] = useState<ICompletionDelivery>({
    value: "DELIVERY",
    label: "ارسال توسط پیک",
  });

  useEffect(() => {
    setOrder({ ...order, delivery: delivery.value });
  }, [delivery]);

  return (
    <div className="child:box flex flex-col gap-6">
      <CompletionDelivery delivery={delivery} setDelivery={setDelivery} />
      {delivery.value === "DELIVERY" && <CompletionAddress order={order} setOrder={setOrder} />}
      <CompletionDescription />
    </div>
  );
};

export default CompletionForm;
