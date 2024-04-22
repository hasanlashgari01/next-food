import { api } from "@/config/axiosConfig";
import { provinceRoute, restaurantRoute } from "./routeService";

const getProviceList = () => api(`${provinceRoute}list`).then(({ data }) => data);

const getPopularRestaurant = async (province: string) =>
  api(`${restaurantRoute}popular?province=${province}`).then(({ data }) => data);

const getNewRestaurant = async (province: string) =>
  api(`${restaurantRoute}news?province=${province}`).then(({ data }) => data);

export { getProviceList, getPopularRestaurant, getNewRestaurant };
