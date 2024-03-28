import { IUser } from "./user";

export interface IRestaurantComment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
  updatedAt: Date;
}

export interface IFoodComment {
  _id: string;
  title: string;
  image: string;
  rate: number;
  updatedAt: Date;
}

export interface IComment {
  _id: string;
  body: string;
  user: string;
  rate: number;
  isAccepted: boolean;
  isAnswer: boolean;
  likes: string[];
  authorId?: IUser;
  foodId?: IFoodComment;
  restaurantId?: IRestaurantComment;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentsData {
  comments: IComment[] | [];
  count: number | 0;
}
