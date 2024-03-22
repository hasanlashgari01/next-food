type TStatus = "notActive" | "active" | "expired";

export interface DiscountProps {
  _id: string;
  code: string;
  type: string;
  amount: number;
  status: TStatus;
  startDate: Date;
  expireDate: Date;
  usageCount: number;
  usageLimit: number;
}
