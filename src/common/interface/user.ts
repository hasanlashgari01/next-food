export type TRole = "ADMIN" | "USER" | "SELLER";
export type TGender = "male" | "female" | "other";

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
  likedFoods: [];
  bookmarkedFoods: [];
  likedRestaurants: [];
  bookmarkedRestaurants: [];
  resetLink: string;
  foods: [];
  cart: ICart | null;
}
