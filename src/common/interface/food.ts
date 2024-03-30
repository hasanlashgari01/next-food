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
  image: string;
  category: string;
  kind: IKindFood[];
  kindId: IKindFood | undefined;
}
