"use client";

import { DashboardContextProvider } from "@/src/contexts/dashboard/dashboard.context";
import { ModalContextProvider } from "@/src/contexts/modal/modal.context";
import Theme from "@/src/styles/theme";
import StyledComponentsRegistry from "./lib/registry";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>
      <Theme>
        <DashboardContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </DashboardContextProvider>
      </Theme>
    </StyledComponentsRegistry>
  );
}
