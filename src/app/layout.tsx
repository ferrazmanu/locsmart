import { Providers } from "@/src/app/providers";

import { Header } from "@/src/components/header/header";
import { MainContainer } from "@/src/components/main-container/main-container";
import GlobalStyles from "@/src/styles/global";
import type { Metadata } from "next";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Providers>
          <GlobalStyles />

          <Header />

          <MainContainer>{children}</MainContainer>
        </Providers>
      </body>
    </html>
  );
}
