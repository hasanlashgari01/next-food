import {
  createFood,
  createMenu,
  deleteFood,
  deleteMenu,
  getFoods,
  getMenus,
  getOrderById,
  getOrders,
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
  useQuery({ queryKey: ["p-restaurant-foods", id, "order", orderId], queryFn: () => getOrderById(id, orderId) });

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
};
