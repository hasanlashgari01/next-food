import { api } from "@/config/axiosConfig";

const getDashboard = () => api(`/admin/dashboard`).then(data => data.data);

export { getDashboard };
