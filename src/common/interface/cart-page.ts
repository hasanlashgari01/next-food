import { Dispatch, SetStateAction } from "react";

export type TCompletionDeliveryValue = "DELIVERY" | "SELF_PICKUP";
export type TCompletionDeliveryLabel = "ارسال توسط پیک" | "تحویل حضوری";
export type TPaymentValue = "CASH_ON_DELIVERY" | "ONLINE";
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

export interface IAddress {
  _id: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  coordinate: string;
  mobile: string;
  title: string;
}

export interface IDataAddress {
  _id: string;
  userId: string;
  address: IAddress[] | undefined;
}
