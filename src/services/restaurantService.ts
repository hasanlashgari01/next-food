import { api } from "@/config/axiosConfig";
import { menuRoute, restaurantRoute } from "./routeService";
import { IMenuData } from "@/common/interface/restaurant";

interface Update<T> {
  id: string;
  data: T;
}

const getMenus = (id: string) => api(`${restaurantRoute}/${id}/menu`).then(({ data }) => data);

const createMenu = (data: IMenuData) => api.post(menuRoute, data).then(({ data }) => data);

const updateMenu = ({ id, data }: Update<IMenuData>) => api.patch(`${menuRoute}${id}`, data).then(({ data }) => data);

const deleteMenu = (id: string) => api.delete(`${menuRoute}${id}`).then(({ data }) => data);

export { getMenus, createMenu, updateMenu, deleteMenu };
