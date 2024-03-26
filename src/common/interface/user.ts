import { IFood } from "./food";
import { IRestaurant } from "./restaurant";

export type TRole = "ADMIN" | "USER" | "SELLER";
export type TGender = "male" | "female" | "other";
export type TTheme = "AUTO" | "LIGHT" | "DARK";

export interface ICart {
  foods: [];
  coupon: string;
}

export interface IUser {
  fullName?: string;
  email: string;
  mobile: string;
  avatarUrl: string;
  biography: string;
  isVerifiedMobile: boolean;
  age: number | null;
  gender: TGender | null;
  verifiedAccount: boolean;
  role: TRole | null;
  restaurants: [];
  likedFoods: IFood[];
  bookmarkedFoods: IFood[];
  likedRestaurants: IRestaurant[];
  bookmarkedRestaurants: IRestaurant[];
  resetLink: string;
  foods: IFood[];
  cart: ICart | null;
  settings: {
    theme: TTheme;
  };
}
