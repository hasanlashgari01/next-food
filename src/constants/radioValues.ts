import {
  TCompletionDeliveryLabel,
  TCompletionDeliveryValue,
  TPaymentLabel,
  TPaymentValue,
} from "@/common/interface/cart-page";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineBanknotes, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2";

export type TPaymentRadio = "delivery" | "payment";

export interface IRadioValues<T, V> {
  id: number;
  text: T;
  value: V;
  description?: string | undefined | null;
  icon: any;
}

export const themeValues = [
  { id: 1, text: "شب", value: "DARK", field: "theme" },
  { id: 2, text: "خودکار", value: "AUTO", field: "theme" },
  { id: 3, text: "روشن", value: "LIGHT", field: "theme" },
];

export const genderValues = [
  { id: 1, text: "مرد", value: "male", field: "gender" },
  { id: 2, text: "زن", value: "female", field: "gender" },
  { id: 3, text: "سایر", value: "other", field: "gender" },
];

export const codeValues = [
  { id: 1, text: "مبلغ", value: "fixedProduct", field: "type" },
  { id: 2, text: "درصد", value: "percent", field: "type" },
];

export const codeStatusValues = [
  { id: 1, text: "فعال", value: "active", field: "status" },
  { id: 2, text: "غیرفعال", value: "notActive", field: "status" },
  { id: 3, text: "منقضی", value: "expired", field: "status" },
];

export const completionDeliveryValues: IRadioValues<TCompletionDeliveryLabel, TCompletionDeliveryValue>[] = [
  { id: 1, text: "ارسال توسط پیک", description: "توسط پیک رستوران ارسال شود.", value: "DELIVERY", icon: FaTruckFast },
  { id: 2, text: "تحویل حضوری", value: "SELF_PICKUP", icon: HiShoppingBag },
];

export const paymentMethodValues: IRadioValues<TPaymentLabel, TPaymentValue>[] = [
  {
    id: 1,
    value: "CREDIT",
    text: "پرداخت اینترنتی",
    description: "توسط پیک رستوران ارسال شود.",
    icon: HiOutlineCreditCard,
  },
  { id: 2, value: "CASH", text: "پرداخت در محل", description: "توسط پیک رستوران ارسال شود.", icon: HiOutlineBanknotes },
];
