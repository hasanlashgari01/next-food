import {
  addOffSelectedFood,
  banOrUnbanComment,
  createFood,
  createMenu,
  deleteFood,
  deleteMenu,
  getComments,
  getFoods,
  getMenus,
  getOrderById,
  getOrders,
  removeOffSelectedFood,
  updateFood,
  updateMenu,
} from "@/services/restaurantService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetMenuList = (id: string) => useQuery({ queryKey: ["p-restaurant-menus", id], queryFn: () => getMenus(id) });

const useCreateMenu = () => useMutation({ mutationFn: createMenu });

const useUpdateMenu = () => useMutation({ mutationFn: updateMenu });

const useDeleteMenu = () => useMutation({ mutationFn: deleteMenu });

const useGetFoodList = (id: string) => useQuery({ queryKey: ["p-restaurant-foods", id], queryFn: () => getFoods(id) });

const useCreateFood = () => useMutation({ mutationFn: createFood });

const useUpdateFood = () => useMutation({ mutationFn: updateFood });

const useDeleteFood = () => useMutation({ mutationFn: deleteFood });

const useGetOrderList = (id: string) =>
  useQuery({ queryKey: ["p-restaurant-orders", id], queryFn: () => getOrders(id) });

const useGetOrderById = (id: string, orderId: string) =>
  useQuery({ queryKey: ["p-restaurant-order", id, "order", orderId], queryFn: () => getOrderById(id, orderId) });

const useGetCommentList = (id: string) =>
  useQuery({ queryKey: ["p-restaurant-comments"], queryFn: () => getComments(id) });

const useBanOrUnbanComment = () => useMutation({ mutationFn: banOrUnbanComment });

const useGetOffList = (id: string) => useQuery({ queryKey: ["p-restaurant-comments"], queryFn: () => getComments(id) });

const useAddOffSelectedFood = () => useMutation({ mutationFn: addOffSelectedFood });

const useRemoveOffSelectedFood = () => useMutation({ mutationFn: removeOffSelectedFood });

export {
  useGetMenuList,
  useCreateMenu,
  useUpdateMenu,
  useDeleteMenu,
  useGetFoodList,
  useCreateFood,
  useDeleteFood,
  useUpdateFood,
  useGetOrderList,
  useGetOrderById,
  useGetCommentList,
  useBanOrUnbanComment,
  useGetOffList,
  useAddOffSelectedFood,
  useRemoveOffSelectedFood,
};
