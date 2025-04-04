"use client";

import { DashboardContextProvider } from "@/src/contexts/dashboard/dashboard.context";
import { ModalContextProvider } from "@/src/contexts/modal/modal.context";
import Theme from "@/src/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsRegistry from "./lib/registry";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <DashboardContextProvider>
            <ModalContextProvider>{children}</ModalContextProvider>
          </DashboardContextProvider>
        </QueryClientProvider>
      </Theme>
    </StyledComponentsRegistry>
  );
}
