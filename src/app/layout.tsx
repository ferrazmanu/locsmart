import { Providers } from "@/src/app/providers";

import { Header } from "@/src/components/header/header";
import { MainContainer } from "@/src/components/main-container/main-container";
import GlobalStyles from "@/src/styles/global";
import type { Metadata, Viewport } from "next";
import { DrawerMenu } from "../components/drawer-menu/drawer-menu";
import { EnvFlag } from "../components/env-flag/env-flag";

export const metadata: Metadata = {
  title: "LocSmart",
  description: "LocSmart - Painel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Providers>
          <GlobalStyles />
          <EnvFlag />

          <Header />

          <DrawerMenu />

          <MainContainer>{children}</MainContainer>
        </Providers>
      </body>
    </html>
  );
}
