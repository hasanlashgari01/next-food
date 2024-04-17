import { foodRoute } from "@/services/routeService";
import { cookieToString } from "@/utils/cookieToString";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API;

export const getFoodById = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const strCookies = cookieToString(cookieStore);
  const res = await fetch(`${API}${foodRoute}${id}`, {
    credentials: "same-origin",
    headers: { Cookie: strCookies },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const getComment = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const strCookies = cookieToString(cookieStore);
  const res = await fetch(`${API}${foodRoute}${id}/comment`, {
    credentials: "same-origin",
    headers: { Cookie: strCookies },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const getPopularFoodById = async ({ id }: { id: string }) => {
  const res = await fetch(`${API}${foodRoute}${id}/popular`);
  return res.json();
};

export const getSimilarFoodById = async ({ id }: { id: string }) => {
  const res = await fetch(`${API}${foodRoute}${id}/similar`);
  return res.json();
};
