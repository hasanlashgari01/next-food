interface IFoodDefault {
  _id: string;
  title: string;
}

export interface IDiscount {
  percent: number;
  startDate: Date;
  endDate: Date;
  amount: number;
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
