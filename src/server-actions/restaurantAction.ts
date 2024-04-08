import { foodRoute, menuRoute, restaurantRoute } from "@/services/routeService";

const API = process.env.NEXT_PUBLIC_API;

export const getRestaurant = async ({ slug }: { slug: string }) => {
  const res = await fetch(`${API}${restaurantRoute}/slug/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const getMenuById = async (id: string) => {
  const res = await fetch(`${API}${menuRoute}${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const getFoodById = async (id: string) => {
  const res = await fetch(`${API}${foodRoute}${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};
