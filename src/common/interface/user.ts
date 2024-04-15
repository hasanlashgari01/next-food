import { IFood } from "./food";
import { IRestaurant } from "./restaurant";

export type TRole = "ADMIN" | "USER" | "SELLER";
export type TGender = "male" | "female" | "other";
export type TTheme = "AUTO" | "LIGHT" | "DARK";

export interface ICart {
  foods: IFood[];
  coupon: string;
}

export interface IUser {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestaurantWishlist {
  _id: string;
  restaurantId: {
    _id: string;
    name: string;
    slug: string;
    logo: string | null;
  };
}

export interface IFoodWishlist {
  _id: string;
  foodId: {
    _id: string;
    title: string;
    image: string | null;
  };
}

export interface IWhishlist {
  restaurantLikes: IRestaurantWishlist[];
  restaurantBookmarks: IRestaurantWishlist[];
  foodLikes: IFoodWishlist[];
  foodBookmarks: IFoodWishlist[];
}
