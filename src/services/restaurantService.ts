import { api } from "@/config/axiosConfig";
import { restaurantRoute } from "./routeService";

const getMenus = (id: string) => api(`${restaurantRoute}/${id}/menu`).then(({ data }) => data);

export { getMenus };
