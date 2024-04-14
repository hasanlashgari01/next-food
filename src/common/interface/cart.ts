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

export interface IBasketItem {
  _id: string;
  title: string;
  image: string | null;
  price: number;
  quantity: number;
  discount: number;
}
