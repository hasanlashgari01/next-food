import { Dispatch, SetStateAction } from "react";

export type TCompletionDeliveryValue = "DELIVERY" | "SELF_PICKUP";
export type TCompletionDeliveryLabel = "ارسال توسط پیک" | "تحویل حضوری";
export type TPaymentValue = "CASH" | "CREDIT";
export type TPaymentLabel = "پرداخت در محل" | "پرداخت اینترنتی";

export interface IPositionItemProps {
  step: number;
  setStep?: Dispatch<SetStateAction<number>>;
  action?: () => void;
}

export interface ICompletionDelivery {
  value: TCompletionDeliveryValue;
  label: TCompletionDeliveryLabel;
}

export interface IPayment {
  value: TPaymentValue;
  label: TPaymentLabel;
}
