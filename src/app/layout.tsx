import { Providers } from "@/src/app/providers";

import { MainContainer } from "@/src/components/main-container/main-container.styles";
import GlobalStyles from "@/src/styles/global";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LocSmart - Laborsolo Laboratórios",
  description: "LIMS Panel",
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

          <MainContainer>{children}</MainContainer>
        </Providers>
      </body>
    </html>
  );
}
