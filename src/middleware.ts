import { NextRequest, NextResponse } from "next/server";

const middlewareAuth = async (req: NextRequest) => {
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

  if (user?.status == 401) return { user: null };

  return { user, role: user?.role };
};

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  const { user } = await middlewareAuth(req);

  if (pathname.startsWith("/user") || pathname.startsWith("/cart")) {
    if (!user) return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (pathname.startsWith("/p-restaurant")) {
    if (user) return NextResponse.redirect(new URL("/user", req.url));
  } else if (pathname.startsWith("/admin")) {
    if (!user) return NextResponse.redirect(new URL("/", req.url));
    if (user && user.role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/p-restaurant/:path*", "/cart/:path*"],
};
