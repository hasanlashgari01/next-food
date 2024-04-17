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

export interface ICommentData {
  body: string;
  rate: number;
  restaurantId?: string;
  foodId?: string;
}

export interface INewComment extends ICommentData {
  authorId: string;
}

export interface IComment extends ICommentData {
  authorId: { fullName: string; avatar: string };
  _id: string;
  isAccepted: boolean;
  isAnswer: boolean;
  likes: number;
}

export interface IMainComment extends IComment {
  mainCommentID?: undefined | [] | IComment;
  createdAt: Date;
  updatedAt: Date;
}
