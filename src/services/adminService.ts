import { api } from "@/config/axiosConfig";

interface Category {
  title: string;
  slug: string;
}
interface Update<T> {
  id: string;
  data: T;
}

const getDashboard = () => api(`/admin/dashboard`).then(({ data }) => data);

const getUsers = () => api(`/admin/users`).then(({ data }) => data);

// * Category

const getCategories = () => api(`/category`).then(({ data }) => data);

const addNewCategory = (data: Category) => api.post("category/create", data).then(({ data }) => data);

const getCategory = (id: string) => api(`/category/${id}`).then(({ data }) => data);

const updateCategory = ({ id, data }: Update<Category>) => api.put(`/category/${id}`, data).then(({ data }) => data);

// * Discount

const getDiscounts = () => api(`/api/coupon`).then(({ data }) => data);

export { getDashboard, getUsers, getCategories, addNewCategory, updateCategory, getCategory, getDiscounts };
