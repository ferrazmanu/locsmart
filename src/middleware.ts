import { showGlobalToast } from "@/src/utils/toast-controller";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "./app/lib/session";

const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const tokenCookie = (await cookies()).get("LocSmart.Authorization")?.value;

  if (!isPublicRoute && !tokenCookie) {
    await deleteSession();
    showGlobalToast("Sessão expirada. Faça login novamente.", "error");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    tokenCookie &&
    !req.nextUrl.pathname.startsWith(`${process.env.NEXT_PUBLIC_HOME_REDIRECT}`)
  ) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_HOME_REDIRECT}`, req.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
