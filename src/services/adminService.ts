import { api } from "@/config/axiosConfig";

interface Category {
  title: string;
  slug: string;
}

const getDashboard = () => api(`/admin/dashboard`).then(({ data }) => data);

const getUsers = () => api(`/admin/users`).then(({ data }) => data);

const getCategories = () => api(`/category`).then(({ data }) => data);

const addNewCategory = (data: Category) => api.post("category/create", data).then(({ data }) => data);

export { getDashboard, getUsers, getCategories, addNewCategory };
