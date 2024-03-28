export interface ISelectOption {
  value: string;
  label: string;
}

export interface IUsersOption {
  value: "users" | "ban-users";
  label: "لیست کاربران" | "لیست کاربران بن شده";
}

export interface IRestaurantsOption {
  value: "restaurants" | "ban-restaurants";
  label: "لیست رستوران" | "لیست رستوران بن شده";
}

export interface ICommentsOption {
  value: "restaurantComments" | "foodComments";
  label: "لیست نظرات رستوران" | "لیست نظرات غذا";
}
