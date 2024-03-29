import { IKindFood } from "./food";

export interface ICartItem {
  _id: string;
  kindId: IKindFood | undefined;
  quantity?: number;
  coupon: string | null;
}

export interface ICart {
  foods: ICartItem[] | [];
  coupon: string;
}
