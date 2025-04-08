import { Providers } from "@/src/app/providers";

import { Header } from "@/src/components/header/header";
import { MainContainer } from "@/src/components/main-container/main-container";
import GlobalStyles from "@/src/styles/global";
import type { Metadata } from "next";
import { DrawerMenu } from "../components/drawer-menu/drawer-menu";

export const metadata: Metadata = {
  title: "LocSmart",
  description: "LocSmart - Painel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Providers>
          <GlobalStyles />

          <Header />

          <DrawerMenu />

          <MainContainer>{children}</MainContainer>
        </Providers>
      </body>
    </html>
  );
}
