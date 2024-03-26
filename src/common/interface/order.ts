import { IFood } from "./food";

export type TStatus = "PENDING" | "COMPLETED" | "CANCELED";
export type TPayment = "CASH_ON_DELIVERY" | "ONLINE";
export type TPaymentStatus = "UNPAID" | "PAID";
export type TDiscountType = "fixedProduct" | "percent";

export interface IUserOrder {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
}

export interface IOrder {
  _id: string;
  foods: IFood[];
  user: IUserOrder;
  address: string;
  coupon: string | null;
  couponAmount: number | null;
  deliveryStatus: TStatus;
  discount: number | null;
  discountType: TDiscountType | null;
  orderDate: Date;
  payment: TPayment;
  paymentDate: Date | null;
  paymentStatus: TPaymentStatus;
  province: string;
  status: TStatus;
  total: number;
}
