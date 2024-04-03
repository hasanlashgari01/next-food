import {
  addAddress,
  createOrder,
  decrementFood,
  editAddress,
  emptyCart,
  getAddress,
  getAddressList,
  getCart,
  incrementFood,
  removeAddress,
  removeFood,
} from "@/services/cartService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetCart = () => useQuery({ queryKey: ["user-cart"], queryFn: getCart });

const useRemoveFoodFromCart = () => useMutation({ mutationFn: removeFood });

const useEmptyCart = () => useMutation({ mutationFn: emptyCart });

const useIncrementFood = () => useMutation({ mutationFn: incrementFood });

const useDecrementFood = () => useMutation({ mutationFn: decrementFood });

const useGetAddress = () => useQuery({ queryKey: ["user-address"], queryFn: getAddressList });

const useAddAddress = () => useMutation({ mutationFn: addAddress });

const useGetAddressById = (id: string) => useQuery({ queryKey: ["user-address", id], queryFn: () => getAddress(id) });

const useEditAddress = () => useMutation({ mutationFn: editAddress });

const useRemoveAddress = () => useMutation({ mutationFn: removeAddress });

const useCreateOrder = () => useMutation({ mutationFn: createOrder });

export {
  useAddAddress,
  useDecrementFood,
  useEditAddress,
  useEmptyCart,
  useGetAddress,
  useGetAddressById,
  useGetCart,
  useIncrementFood,
  useRemoveAddress,
  useRemoveFoodFromCart,
  useCreateOrder,
};
