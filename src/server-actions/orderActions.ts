import { orders } from "@/services/routeService";
import { cookieToString } from "@/utils/cookieToString";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API;

export const getOrder = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const strCookies = cookieToString(cookieStore);
  const res = await fetch(`${API}${orders}${id}`, {
    credentials: "same-origin",
    headers: { Cookie: strCookies },
  });

  if (res.status == 401 || res.status == 404) {
    return null;
  }

  return res.json();
};
