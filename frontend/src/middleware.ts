
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function middleware (req: NextRequest) {

  const cookieStore = await cookies();
  const accessTokenCookie =  cookieStore.get("token");
  const accessToken = accessTokenCookie ? accessTokenCookie.value : null;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }
}

export const config = {
  matcher: ["/", "/users/:path*", "/post/:path*",],
};