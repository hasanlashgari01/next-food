import { IFood } from "./food";

export interface IRestaurant {
  _id: string;
  name: string;
  author: string;
  category: string[];
  cover: string;
  details: {
    average_delivery_time: number;
    send_outside_city: boolean;
  };
  email: string;
  isValid: boolean;
  logo: string;
  phone: string;
  province: {
    name: string;
    englishTitle: string;
  };
  score: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMenu {
  _id: string;
  title: string;
  image: string;
  slug: string;
  restaurantId: string | null;
  foods: IFood[] | [];
}

export interface IKindFood {
  _id: string;
  title: string;
  price: number;
  weight: number;
  discount: number;
}
