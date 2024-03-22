import { IDiscount } from "@/common/interface/discount";
import { api } from "@/config/axiosConfig";

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

// * Category

const getCategories = () => api(`/category`).then(({ data }) => data);

const addNewCategory = (data: Category) => api.post("category/create", data).then(({ data }) => data);

const getCategory = (id: string) => api(`/category/${id}`).then(({ data }) => data);

const updateCategory = ({ id, data }: Update<Category>) => api.put(`/category/${id}`, data).then(({ data }) => data);

// * Discount

const getDiscounts = () => api(`/api/coupon`).then(({ data }) => data);

const addDiscount = (data: IDiscount) => api.post("/api/coupon", data).then(({ data }) => data);

const removeDiscount = (id: string) => api.delete(`/api/coupon/${id}`).then(({ data }) => data);

export {
  addDiscount,
  addNewCategory,
  getBanUsers,
  getCategories,
  getCategory,
  getDashboard,
  getDiscounts,
  getUsers,
  removeDiscount,
  searchUsers,
  updateCategory,
};
