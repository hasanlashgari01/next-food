import { createMenu, getMenus } from "@/services/restaurantService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetMenuList = (id: string) => useQuery({ queryKey: ["p-restaurant-menus", id], queryFn: () => getMenus(id) });

const useCreateMenu = () => useMutation({ mutationFn: createMenu });

export { useGetMenuList, useCreateMenu };
