import { IFoodData } from "@/common/interface/food";
import { IMenuData } from "@/common/interface/restaurant";
import { api, apiUpload } from "@/config/axiosConfig";
import { foodRoute, menuRoute, restaurantRoute } from "./routeService";

interface Update<T> {
  id: string;
  data: T;
}

const getMenus = (id: string) => api(`${restaurantRoute}/${id}/menu`).then(({ data }) => data);

const createMenu = (data: IMenuData) => api.post(menuRoute, data).then(({ data }) => data);

const updateMenu = ({ id, data }: Update<IMenuData>) => api.patch(`${menuRoute}${id}`, data).then(({ data }) => data);

const deleteMenu = (id: string) => api.delete(`${menuRoute}${id}`).then(({ data }) => data);

const getFoods = (id: string): Promise<{ count: number; foods: IFoodData[] }> =>
  api(`${restaurantRoute}/${id}/food`).then(({ data }) => data);

const createFood = (data: IFoodData) => apiUpload.post(foodRoute, data).then(({ data }) => data);

const deleteFood = (id: string) => api.delete(`${foodRoute}${id}`).then(({ data }) => data);

export { createFood, createMenu, deleteMenu, getFoods, getMenus, updateMenu, deleteFood };
