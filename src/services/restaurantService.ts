import { IDiscount, IFood, IFoodData } from "@/common/interface/food";
import { IMenu, IMenuData } from "@/common/interface/restaurant";
import { api, apiUpload } from "@/config/axiosConfig";
import { foodRoute, menuRoute, orders, restaurantRoute } from "./routeService";
import { IOrder } from "@/common/interface/order";
import { IComment } from "@/common/interface/comment";

export interface IUpdate<T> {
  id: string;
  data: T;
}

export interface IOffData {
  foodsId: string[];
}

const getMenus = (id: string): Promise<{ count: number; menus: IMenu[] }> =>
  api(`${restaurantRoute}${id}/menu`).then(({ data }) => data);

const createMenu = (data: IMenuData) => api.post(menuRoute, data).then(({ data }) => data);

const updateMenu = ({ id, data }: IUpdate<IMenuData>) => api.patch(`${menuRoute}${id}`, data).then(({ data }) => data);

const deleteMenu = (id: string) => api.delete(`${menuRoute}${id}`).then(({ data }) => data);

const getFoods = (id: string): Promise<{ count: number; foods: IFoodData[] }> =>
  api(`${restaurantRoute}/${id}/food`).then(({ data }) => data);

const createFood = (data: IFoodData) => apiUpload.post(foodRoute, data).then(({ data }) => data);

const updateFood = ({ id, data }: IUpdate<IFoodData>) =>
  apiUpload.put(`${foodRoute}${id}`, data).then(({ data }) => data);

const deleteFood = (id: string) => api.delete(`${foodRoute}${id}`).then(({ data }) => data);

const getOrders = (id: string): Promise<{ count: number; orders: IOrder[] }> =>
  api(`${orders}/restaurant/${id}`).then(({ data }) => data);

const getOrderById = (id: string, orderId: string): Promise<IOrder> =>
  api(`${orders}restaurant/${id}/order/${orderId}`).then(({ data }) => data);

const getComments = (id: string): Promise<{ count: number; comments: IComment[] }> =>
  api(`${restaurantRoute}${id}/comment`).then(({ data }) => data);

const banOrUnbanComment = (id: string) => api.patch(`${restaurantRoute}comment${id}/status`).then(({ data }) => data);

const getOffs = (id: string): Promise<{ count: number; foods: IFood[] }> =>
  api(`${restaurantRoute}${id}/food/discount`).then(({ data }) => data);

const addOffSelectedFood = ({ id, data }: IUpdate<IOffData & IDiscount>) =>
  api.put(`${restaurantRoute}${id}/food/discount`, { data }).then(({ data }) => data);

const removeOffSelectedFood = ({ id, data }: IUpdate<IOffData>) =>
  api.delete(`${restaurantRoute}${id}/food/discount`, { data }).then(({ data }) => data);

const getRestaurant = (id: string) => api(`${restaurantRoute}${id}`).then(({ data }) => data);

const uploadLogo = ({ id, data }: { id: string; data: File }) =>
  apiUpload.patch(`${restaurantRoute}${id}/logo`, { logo: data }).then(({ data }) => data);

const removeLogo = (id: string) => api.delete(`${restaurantRoute}${id}/logo`).then(({ data }) => data);

const uploadCover = ({ id, data }: { id: string; data: File }) =>
  apiUpload.patch(`${restaurantRoute}${id}/cover`, { cover: data }).then(({ data }) => data);

const removeCover = (id: string) => api.delete(`${restaurantRoute}${id}/cover`).then(({ data }) => data);

const toggleLike = (id: string) => api.patch(`${restaurantRoute}${id}/like`).then(({ data }) => data);

const toggleBookmark = (id: string) => api.patch(`${restaurantRoute}${id}/bookmark`).then(({ data }) => data);

const toggleLikeComment = (id: string) => api.patch(`${restaurantRoute}${id}/comment`).then(({ data }) => data);

export {
  createFood,
  createMenu,
  deleteFood,
  deleteMenu,
  getFoods,
  getMenus,
  updateFood,
  updateMenu,
  getOrders,
  getOrderById,
  getComments,
  banOrUnbanComment,
  getOffs,
  addOffSelectedFood,
  removeOffSelectedFood,
  getRestaurant,
  uploadLogo,
  removeLogo,
  uploadCover,
  removeCover,
  toggleLike,
  toggleBookmark,
  toggleLikeComment,
};
