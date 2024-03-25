type TRole = "ADMIN" | "USER" | "SELLER";
type TGender = "male" | "female" | "other";

interface ICart {
  foods: [];
  coupon: string;
}

export interface IUser {
  fullName?: string;
  email: string;
  mobile: string;
  avatar: string;
  biography: string;
  isVerifiedMobile: boolean;
  age: number;
  gender: TGender;
  verifiedAccount: boolean;
  role: TRole;
  restaurants: [];
  likedFoods: [];
  bookmarkedFoods: [];
  likedRestaurants: [];
  bookmarkedRestaurants: [];
  resetLink: string;
  foods: [];
  cart: ICart;
}
