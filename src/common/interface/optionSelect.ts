export interface SelectOption {
  value: string;
  label: string;
}

export interface UsersOption {
  value: "users" | "ban-users" | "active-users";
  label: "لیست کاربران" | "لیست کاربران بن شده" | "لیست کاربران فعال";
}

export interface RestaurantsOption {
  value: "restaurants" | "ban-restaurants";
  label: "لیست رستوران" | "لیست رستوران بن شده";
}
