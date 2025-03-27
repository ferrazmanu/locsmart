"use server";

import { ILoggedUser } from "@/src/interfaces/logged-user";
import { cookies } from "next/headers";

export async function createSession(token: string, loggedUser: ILoggedUser) {
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000); //12h
  const cookieStore = await cookies();

  cookieStore.set("LocSmart.Authorization", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("LocSmart.User", JSON.stringify(loggedUser), {
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("LocSmart.Authorization");
  cookieStore.delete("LocSmart.User");
}
