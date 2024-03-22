type TStatus = "notActive" | "active" | "expired";
export type TType = "fixedProduct" | "percent";

export interface IDiscount {
  code: string;
  type: TType;
  amount: number | null | undefined;
  usageCount?: number | null;
}

export interface IDiscountProps extends IDiscount {
  _id: string;
  status: TStatus;
  startDate: Date;
  expireDate: Date;
  usageLimit: number;
}

export interface IDiscountInputs extends IDiscount {
  amountFixed?: number | null;
  amountPercent?: number | null;
}
