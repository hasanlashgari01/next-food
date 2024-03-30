import { useState } from "react";
import CompletionAddress from "./CompletionAddress";
import CompletionDelivery from "./CompletionDelivery";
import CompletionDescription from "./CompletionDescription";
import { ICompletionDelivery } from "@/common/interface/cart-page";

const CompletionForm = () => {
  const [delivery, setDelivery] = useState<ICompletionDelivery>({
    value: "DELIVERY",
    label: "ارسال توسط پیک",
  });

  return (
    <div className="child:box flex flex-col gap-6">
      <CompletionDelivery delivery={delivery} setDelivery={setDelivery} />
      {delivery.value === "DELIVERY" && <CompletionAddress />}
      <CompletionDescription />
    </div>
  );
};

export default CompletionForm;
