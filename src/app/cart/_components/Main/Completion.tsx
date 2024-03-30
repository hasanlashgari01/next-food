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
    <>
      <CompletionDelivery delivery={delivery} setDelivery={setDelivery} />
      {delivery.value === "DELIVERY" && <CompletionAddress />}
      <CompletionDescription />
    </>
  );
};

export default CompletionForm;
