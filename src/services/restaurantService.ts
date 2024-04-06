import { api } from "@/config/axiosConfig";
import { menuRoute, restaurantRoute } from "./routeService";
import { IMenuData } from "@/common/interface/restaurant";

const getMenus = (id: string) => api(`${restaurantRoute}/${id}/menu`).then(({ data }) => data);

const createMenu = (data: IMenuData) => api.post(menuRoute, data).then(({ data }) => data);

export { getMenus, createMenu };
