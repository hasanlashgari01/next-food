import { api } from "@/config/axiosConfig";
import { userRoute } from "./routeService";

const likeRestaurant = (id: string) => api.patch(`${userRoute}restaurant/${id}/like`).then(({ data }) => data);

const unLikeRestaurant = (id: string) => api.delete(`${userRoute}restaurant/${id}/like`).then(({ data }) => data);

const bookmarkRestaurant = (id: string) => api.patch(`${userRoute}restaurant/${id}/bookmark`).then(({ data }) => data);

const unBookmarkRestaurant = (id: string) =>
  api.delete(`${userRoute}restaurant/${id}/bookmark`).then(({ data }) => data);

export { likeRestaurant, unLikeRestaurant, bookmarkRestaurant, unBookmarkRestaurant };
