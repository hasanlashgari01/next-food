import { api } from "@/config/axiosConfig";
import { orders, userRoute } from "./routeService";

const likeFood = (id: string) => api.patch(`${userRoute}food/${id}/like`).then(({ data }) => data);

const unLikeFood = (id: string) => api.delete(`${userRoute}food/${id}/like`).then(({ data }) => data);

const bookmarkFood = (id: string) => api.patch(`${userRoute}food/${id}/bookmark`).then(({ data }) => data);

const unBookmarkFood = (id: string) => api.delete(`${userRoute}food/${id}/bookmark`).then(({ data }) => data);

const likeRestaurant = (id: string) => api.patch(`${userRoute}restaurant/${id}/like`).then(({ data }) => data);

const unLikeRestaurant = (id: string) => api.delete(`${userRoute}restaurant/${id}/like`).then(({ data }) => data);

const bookmarkRestaurant = (id: string) => api.patch(`${userRoute}restaurant/${id}/bookmark`).then(({ data }) => data);

const unBookmarkRestaurant = (id: string) =>
  api.delete(`${userRoute}restaurant/${id}/bookmark`).then(({ data }) => data);

const getOrders = () => api(orders).then(({ data }) => data);

const getComments = () => api(`${userRoute}comments`).then(({ data }) => data);

const getOffers = () => api(`${userRoute}offers`).then(({ data }) => data);

export {
  likeFood,
  unLikeFood,
  bookmarkFood,
  unBookmarkFood,
  likeRestaurant,
  unLikeRestaurant,
  bookmarkRestaurant,
  unBookmarkRestaurant,
  getOrders,
  getComments,
  getOffers,
};
