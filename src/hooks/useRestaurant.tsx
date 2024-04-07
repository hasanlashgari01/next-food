import { createFood, createMenu, deleteMenu, getFoods, getMenus, updateMenu } from "@/services/restaurantService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetMenuList = (id: string) => useQuery({ queryKey: ["p-restaurant-menus", id], queryFn: () => getMenus(id) });

const useCreateMenu = () => useMutation({ mutationFn: createMenu });

const useUpdateMenu = () => useMutation({ mutationFn: updateMenu });

const useDeleteMenu = () => useMutation({ mutationFn: deleteMenu });

const useGetFoodList = (id: string) => useQuery({ queryKey: ["p-restaurant-foods", id], queryFn: () => getFoods(id) });

const useCreateFood = () => useMutation({ mutationFn: createFood });

export { useGetMenuList, useCreateMenu, useUpdateMenu, useDeleteMenu, useGetFoodList, useCreateFood };
