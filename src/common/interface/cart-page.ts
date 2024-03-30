import { Dispatch, SetStateAction } from "react";

export type TCompletionDeliveryValue = "DELIVERY" | "SELF_PICKUP";
export type TCompletionDeliveryLabel = "ارسال توسط پیک" | "تحویل حضوری";

export interface IPositionItemProps {
  step: number;
  setStep?: Dispatch<SetStateAction<number>>;
  action?: () => void;
}

export interface ICompletionDelivery {
  value: TCompletionDeliveryValue;
  label: TCompletionDeliveryLabel;
}
