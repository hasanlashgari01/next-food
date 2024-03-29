import { api } from "@/config/axiosConfig";
import { userRoute } from "./routeService";
import { ICart } from "@/common/interface/cart";

const getCart = (): Promise<ICart> => api(`${userRoute}cart`).then(({ data }) => data.cart);

const emptyCart = () => api.delete(`${userRoute}cart`).then(({ data }) => data);

const addToCart = (foodId: string) => api.put(`${userRoute}cart/increment`, { foodId }).then(({ data }) => data);

const removeFromCart = (foodId: string) => api.put(`${userRoute}cart/decrement`, { foodId }).then(({ data }) => data);

export { getCart, emptyCart, addToCart, removeFromCart };
