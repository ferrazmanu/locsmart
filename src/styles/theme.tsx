"use client";

import { ReactNode } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#79a0e5",
    secondary: "#7d777b",

    white: "#fff",
    black: "#000",
    danger: "#c13a3b",
    warning: "#faf2cc",

    grays: {
      _50: "#f5f5f5",
      _70: "#e6e6e6",
      _100: "#a5a5a5",
      _200: "#788195",
      _400: "#626262",
      _800: "#2c2c2c",
      _900: "#21252d",
    },
  },
  sizes: {
    _80: "5rem", // 5rem = 80px
    _64: "4rem", // 4rem = 64px
    _60: "3.75rem", // 3.75rem = 60px
    _48: "3rem", // 3rem = 48px
    _42: "2.62rem", // 2.62rem = 42px
    _36: "2.25rem", // 2.25rem = 36px
    _32: "2rem", // 2rem = 32px
    _30: "1.875rem", // 1.875rem = 30px
    _24: "1.5rem", // 1.5rem = 24px
    _18: "1.125rem", // 1.125rem = 18px
    _16: "1rem", // 1rem = 16px
    _14: "0.875rem", // 0.875 = 14px
    _12: "0.75rem", // 0.75rem = 12px
  },
  fonts: {
    primary_regular: "Segoe UI",
    secondary_regular: "Helvetica Neue",
  },
};

interface ThemeProps {
  children: ReactNode;
}

const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
