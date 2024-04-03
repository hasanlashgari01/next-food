import { ICart } from "@/common/interface/cart";
import { api } from "@/config/axiosConfig";
import { userRoute } from "./routeService";

const getCart = (): Promise<ICart> => api(`${userRoute}cart`).then(({ data }) => data.cart);

const removeFood = (foodId: string) => api.put(`${userRoute}cart/${foodId}`).then(({ data }) => data);

const emptyCart = () => api.delete(`${userRoute}cart`).then(({ data }) => data);

const incrementFood = (foodId: string) => api.put(`${userRoute}cart/increment`, { foodId }).then(({ data }) => data);

const decrementFood = (foodId: string) => api.put(`${userRoute}cart/decrement`, { foodId }).then(({ data }) => data);

export { decrementFood, emptyCart, getCart, incrementFood, removeFood };
