import { getMenus } from "@/services/restaurantService";
import { useQuery } from "@tanstack/react-query";

const useGetMenuList = (id: string) => useQuery({ queryKey: ["p-restaurant-menus", id], queryFn: () => getMenus(id) });

export { useGetMenuList };
