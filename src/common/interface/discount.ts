import { IFood } from "./food";

export type TStatus = "notActive" | "active" | "expired";
export type TType = "fixedProduct" | "percent" | null;

export interface IDiscount {
  code: string;
  type: TType;
  amount: number | null | undefined;
  usageCount?: number | null;
}

export interface IDiscountProps extends IDiscount {
  _id?: string;
  status?: TStatus | null | undefined;
  startDate?: Date;
  expireDate?: Date;
  usageLimit?: number;
}

export interface IDiscountInputs extends IDiscountProps {
  amountFixed?: number | null;
  amountPercent?: number | null;
}

export interface IOffer extends IDiscountInputs {
  foodIds?: IFood[];
}
