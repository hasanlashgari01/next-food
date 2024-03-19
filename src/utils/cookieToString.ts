import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface CookieType {
  name: string;
  value: string;
}

export function cookieToString(cookies: ReadonlyRequestCookies) {
  let strCookie = "";
  cookies.getAll().forEach((item: CookieType) => {
    strCookie += `${item?.name}=${item?.value}; `;
  });
  return strCookie;
}
