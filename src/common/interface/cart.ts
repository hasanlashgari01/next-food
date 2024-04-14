import { IFood } from "./food";

export interface ICartItem {
  _id: string;
  food: IFood | undefined;
  quantity?: number;
  coupon: string | null;
}

export interface ICart {
  foods: ICartItem[] | [];
  coupon: string;
}
