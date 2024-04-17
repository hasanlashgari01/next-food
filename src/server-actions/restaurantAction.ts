import { menuRoute, restaurantRoute } from "@/services/routeService";
import { cookieToString } from "@/utils/cookieToString";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API;

export const getRestaurant = async ({ slug }: { slug: string }) => {
  const cookieStore = cookies();
  const strCookies = cookieToString(cookieStore);
  const res = await fetch(`${API}${restaurantRoute}slug/${slug}`, {
    credentials: "same-origin",
    headers: { Cookie: strCookies },
  });
  return res.json();
};

export const getMenuById = async (id: string) => {
  const res = await fetch(`${API}${menuRoute}${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const getComment = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const strCookies = cookieToString(cookieStore);
  const res = await fetch(`${API}${restaurantRoute}${id}/comment`, {
    credentials: "same-origin",
    headers: { Cookie: strCookies },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const getPopularRestaurantById = async ({ id, province }: { id: string; province: string }) => {
  const res = await fetch(`${API}${restaurantRoute}${id}/popular?province=${province}`);
  return res.json();
};

export const getSimilarRestaurantById = async ({ id }: { id: string }) => {
  const res = await fetch(`${API}${restaurantRoute}${id}/similar`);
  return res.json();
};
