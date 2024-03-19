import { api } from "@/config/axiosConfig";

const getDashboard = () => api(`/admin/dashboard`).then(data => data.data);

const getUsers = () => api(`/admin/users`).then(data => data.data);

export { getDashboard, getUsers };
