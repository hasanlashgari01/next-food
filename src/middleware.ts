import { NextRequest, NextResponse } from "next/server";
import { IUser } from "./common/interface/user";

const middlewareAuth = async (req: NextRequest): Promise<IUser | null> => {
  let strCookie = "";
  req.cookies.getAll().forEach(item => {
    if (item.name == "refreshToken" || item.name == "accessToken") {
      strCookie += `${item?.name}=${item?.value}; `;
    }
  });

  const user = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/whoami`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Cookie: strCookie,
    },
  }).then(res => res.json());

  if (user?.status == 401) return null;

  return user;
};

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const user = await middlewareAuth(req);
  const redirectTo = (redirectUrl: string) => NextResponse.redirect(new URL(redirectUrl, req.url));

  //#region Redirects
  if (pathname.startsWith("/user") || pathname.startsWith("/cart")) {
    if (!user) return redirectTo("/auth/login");
    if (pathname.endsWith("/user")) return redirectTo("user/home");
  }

  if (pathname.startsWith("/p-restaurant")) {
    if (!user) return redirectTo("/auth/login");
    if (user?.role == "USER") return redirectTo("/user");
    if (pathname.endsWith("/p-restaurant")) return redirectTo("p-restaurant/home");
  }

  if (pathname.startsWith("/admin")) {
    if (!user) return redirectTo("/auth/login");
    if (user && user.role !== "ADMIN") return redirectTo("/");
    if (pathname.endsWith("/admin")) return redirectTo("admin/home");
  }
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/p-restaurant/:path*", "/cart/:path*"],
};
