import { IDiscount } from "@/common/interface/discount";
import { api } from "@/config/axiosConfig";
import { AxiosRequestConfig } from "axios";

interface Category {
  title: string;
  slug: string;
}
interface Update<T> {
  id: string;
  data: T;
}

interface ISearch {
  fullName?: string;
  mobile?: string;
}

const getDashboard = () => api(`/admin/dashboard`).then(({ data }) => data);

const getUsers = () => api(`/admin/users`).then(({ data }) => data);

const getBanUsers = () => api(`/admin/users/ban`).then(({ data }) => data);

const searchUsers = ({ fullName, mobile }: ISearch) => {
  const data: ISearch = {};
  fullName !== undefined && (data.fullName = fullName);
  mobile !== undefined && (data.mobile = mobile);

  return api.post(`/search/admin/users`, data).then(({ data }) => data.result);
};

const banOrUnbanUser = (id: string) => api(`/admin/users/${id}/ban`).then(({ data }) => data);

// * Restaurant

const getRestaurants = () => api(`/admin/restaurant`).then(({ data }) => data);

const getBanRestaurants = () => api(`/admin/restaurant/banned`).then(({ data }) => data);

const searchRestaurants = (name: string) => api.post(`/search/restaurant`, { name }).then(({ data }) => data.result);

const banOrUnbanRestaurant = (id: string) => api(`/admin/restaurant/${id}/ban`).then(({ data }) => data);

const updateValidRestaurant = (id: string) => api(`/admin/restaurant/${id}/status`).then(({ data }) => data);

// * Category

const getCategories = () => api(`/category`).then(({ data }) => data);

const addNewCategory = (data: Category) => api.post("category/create", data).then(({ data }) => data);

const getCategory = (id: string) => api(`/category/${id}`).then(({ data }) => data);

const updateCategory = ({ id, data }: Update<Category>) => api.put(`/category/${id}`, data).then(({ data }) => data);

// * Discount

const getDiscounts = () => api(`/api/coupon`).then(({ data }) => data);

const addDiscount = (data: IDiscount) => api.post("/api/coupon", data).then(({ data }) => data);

const removeDiscount = (id: string) => api.delete(`/api/coupon/${id}`).then(({ data }) => data);

const removeSelectedDiscount = (data: AxiosRequestConfig<any>) =>
  api.post(`/api/coupon/deleteMany`, { couponsId: data }).then(({ data }) => data);

export {
  addDiscount,
  addNewCategory,
  getBanUsers,
  banOrUnbanUser,
  getCategories,
  getCategory,
  getDashboard,
  getDiscounts,
  getUsers,
  removeDiscount,
  searchUsers,
  updateCategory,
  getRestaurants,
  getBanRestaurants,
  searchRestaurants,
  banOrUnbanRestaurant,
  updateValidRestaurant,
  removeSelectedDiscount,
};
