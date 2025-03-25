"use client";

import { useRouter } from "next/navigation";

export const useRedirect = () => {
  const router = useRouter();

  const redirectTo = (
    path: string,
    query?: URLSearchParams,
    options?: { replace?: boolean }
  ) => {
    const queryString = new URLSearchParams(query).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;

    if (options?.replace) {
      router.replace(fullPath);
    } else {
      router.push(fullPath);
    }
  };

  return { redirectTo };
};
