"use server";

import { ILoggedUser } from "@/src/interfaces/logged-user";
import { cookies } from "next/headers";

export async function createSession(
  token: string,
  expiration: string,
  loggedUser: ILoggedUser
) {
  // const expiresAt = new Date(expiration);
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
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
