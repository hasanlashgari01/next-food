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
