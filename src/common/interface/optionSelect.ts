export interface SelectOption {
  value: string;
  label: string;
}

export interface UsersOption {
  value: "users" | "ban-users";
  label: "لیست کاربران" | "لیست کاربران بن شده";
}

export interface RestaurantsOption {
  value: "restaurants" | "ban-restaurants";
  label: "لیست رستوران" | "لیست رستوران بن شده";
}
