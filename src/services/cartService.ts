import { ICart } from "@/common/interface/cart";
import { IAddress, IDataAddress } from "@/common/interface/cart-page";
import { api } from "@/config/axiosConfig";
import { userRoute } from "./routeService";

interface Update<T> {
  id: string;
  data: T;
}

const getCart = (): Promise<ICart> => api(`${userRoute}cart`).then(({ data }) => data.cart);

const removeFood = (foodId: string) => api.put(`${userRoute}cart/${foodId}`).then(({ data }) => data);

const emptyCart = () => api.delete(`${userRoute}cart`).then(({ data }) => data);

const incrementFood = (foodId: string) => api.put(`${userRoute}cart/increment`, { foodId }).then(({ data }) => data);

const decrementFood = (foodId: string) => api.put(`${userRoute}cart/decrement`, { foodId }).then(({ data }) => data);

const getAddressList = (): Promise<IDataAddress> => api(`${userRoute}address`).then(({ data }) => data);

const addAddress = (data: any) => api.post(`${userRoute}address`, data).then(({ data }) => data);

const getAddress = (id: string): Promise<IAddress> =>
  api(`${userRoute}address/${id}`).then(({ data }) => data.address[0]);

const editAddress = ({ id, data }: Update<any>) => api.put(`${userRoute}address/${id}`, data).then(({ data }) => data);

const removeAddress = (id: string) => api.patch(`${userRoute}address/${id}`).then(({ data }) => data);

export {
  addAddress,
  decrementFood,
  editAddress,
  emptyCart,
  getAddress,
  getAddressList,
  getCart,
  incrementFood,
  removeAddress,
  removeFood,
};
