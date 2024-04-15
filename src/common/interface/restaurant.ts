import { IFood } from "./food";
import { IUser } from "./user";

interface IRestaurantData {
  name: string;
  logo: string;
  cover: string;
  categories: string[];
}

export interface IRestaurant extends IRestaurantData {
  _id: string;
  author: string;
  details: {
    average_delivery_time: number;
    send_outside_city: boolean;
  };
  email: string;
  isValid: boolean;
  phone: string;
  province: {
    name: string;
    englishTitle: string;
  };
  score: string;
  slug: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestaurantUpdateData extends IRestaurantData {
  provinceName: string;
  order_start: number | null;
  order_end: number | null;
  average_delivery_time: number | null;
  send_outside_city: boolean;
}

export interface IMenuData {
  title?: string;
  slug?: string;
  restaurantId?: string | null;
}

export interface IMenu extends IMenuData {
  _id: string;
  image: string;
  foods: IFood[] | [];
}

export interface IKindFood {
  _id: string;
  title: string;
  price: number;
  weight: number;
  discount: number;
}

export interface IComment {
  _id: string;
  body: string;
  authorId: IUser;
  rate: number;
  isAccepted: boolean;
  isAnswer: boolean;
  restaurantId: string;
  likes: number;
}

export interface IMainComment extends IComment {
  mainCommentID: string | IComment;
  createdAt: Date;
  updatedAt: Date;
}
