import { DateObject } from "react-multi-date-picker";
import { IMenu } from "./restaurant";

interface IFoodDefault {
  _id: string;
  title: string;
}

export interface IDiscount {
  percent: number | null;
  startDate: DateObject | DateObject[] | null | Date | string;
  endDate: DateObject | DateObject[] | null | Date | string;
  amount: number | null;
}

export interface IKindFood extends IFoodDefault {
  price: string;
  weight: number;
  restaurantId: string;
  foodId: string;
  discount: IDiscount;
}

export interface IFood extends IFoodDefault {
  description?: string | null;
  rate?: number;
  price?: string;
  weight?: number;
  image: string | null;
  category: string;
  menuId?: string | null;
  discount?: IDiscount;
}

export interface IFoodData extends IDiscount {
  title: string;
  image: string | null;
  description: string;
  rate: number | null;
  price: number | null;
  weight: number | null;
  menuId: IMenu | null | {} | string;
  discount?: IDiscount;
  restaurantId?: string;
}
