import { IDiscount } from "@/common/interface/discount";
import { IProvince } from "@/common/interface/province";
import { api } from "@/config/axiosConfig";
import { adminCoupon, adminProvince, adminRestaurant, adminUser, category } from "./routeService";

interface Category {
  title: string;
  slug: string;
}
interface Update<T> {
  id: string;
  data: T;
}

type TDeleteMany = string[];

interface ISearch {
  fullName?: string;
  mobile?: string;
}

const getDashboard = () => api(`/admin/dashboard`).then(({ data }) => data);

const getUsers = () => api(`${adminUser}`).then(({ data }) => data);

const getBanUsers = () => api(`${adminUser}ban`).then(({ data }) => data);

const searchUsers = ({ fullName, mobile }: ISearch) => {
  const data: ISearch = {};
  fullName !== undefined && (data.fullName = fullName);
  mobile !== undefined && (data.mobile = mobile);

  return api.post(`/search/admin/users`, data).then(({ data }) => data.result);
};

const banOrUnbanUser = (id: string) => api(`${adminUser}${id}/ban`).then(({ data }) => data);

// * Restaurant

const getRestaurants = () => api(`${adminRestaurant}`).then(({ data }) => data);

const getBanRestaurants = () => api(`${adminRestaurant}banned`).then(({ data }) => data);

const searchRestaurants = (name: string) => api.post(`/search/restaurant`, { name }).then(({ data }) => data.result);

const banOrUnbanRestaurant = (id: string) => api(`${adminRestaurant}${id}/ban`).then(({ data }) => data);

const updateValidRestaurant = (id: string) => api(`${adminRestaurant}${id}/status`).then(({ data }) => data);

// * Category

const getCategories = () => api(`${category}`).then(({ data }) => data);

const addNewCategory = (data: Category) => api.post(`${category}create`, data).then(({ data }) => data);

const getCategory = (id: string) => api(`${category}${id}`).then(({ data }) => data);

const updateCategory = ({ id, data }: Update<Category>) => api.put(`${category}${id}`, data).then(({ data }) => data);

// * Discount

const getDiscounts = () => api(`${adminCoupon}`).then(({ data }) => data);

const addDiscount = (data: IDiscount) => api.post(`${adminCoupon}`, data).then(({ data }) => data);

const removeDiscount = (id: string) => api.delete(`${adminCoupon}${id}`).then(({ data }) => data);

const removeSelectedDiscount = (couponsId: TDeleteMany) =>
  api.delete(`${adminCoupon}`, { data: { couponsId } }).then(({ data }) => data);

// * Province

const getProvinces = () => api(`${adminProvince}`).then(({ data }) => data);

const addProvince = (data: IDiscount) => api.post(`${adminProvince}`, data).then(({ data }) => data);

const updateProvince = ({ id, data }: Update<IProvince>) =>
  api.put(`${adminProvince}${id}`, data).then(({ data }) => data);

const removeProvince = (id: string) => api.delete(`${adminProvince}${id}`).then(({ data }) => data);

const removeSelectedProvince = (provinceIds: TDeleteMany) =>
  api.delete(`${adminProvince}many`, { data: { provinceIds } }).then(({ data }) => data);

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
  getProvinces,
  addProvince,
  updateProvince,
  removeProvince,
  removeSelectedProvince,
};
