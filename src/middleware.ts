import { NextRequest, NextResponse } from "next/server";
import { IUser } from "./common/interface/user";

const middlewareAuth = async (req: NextRequest): Promise<IUser | null> => {
  let strCookie = "";
  req.cookies.getAll().forEach(item => {
    strCookie += `${item?.name}=${item?.value}; `;
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
  const redirectToLogin = () => NextResponse.redirect(new URL("/auth/login", req.url));

  //#region Redirects
  if (pathname.startsWith("/user") || pathname.startsWith("/cart")) {
    if (!user) return redirectToLogin();
  }

  if (pathname.startsWith("/p-restaurant")) {
    if (!user) return redirectToLogin();
    if (user?.role == "USER") return NextResponse.redirect(new URL("/user", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!user) return redirectToLogin();
    if (user && user.role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/p-restaurant/:path*", "/cart/:path*"],
};
