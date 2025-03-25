'use client';

import { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#333F4F',
    secondary: '#13222e',
    tertiary: '#f58220',

    white: '#fff',
    black: '#000',
    danger: '#c13a3b',
    warning: '#faf2cc',

    blues: {
      _700: '#2E314E'
    },

    grays: {
      _50: '#f5f5f5', // white_smoke: cinza bem claro, quase branco
      _70: '#e6e6e6', // pale_gray: cinza claro mais neutro
      _100: '#a5a5a5', // light_gray: cinza mais claro
      _200: '#788195', // slate_gray: cinza azulado suave
      _400: '#626262', // medium_gray: cinza médio
      _800: '#2c2c2c', // dark_gray: cinza escuro
      _900: '#21252d' // charcoal_gray: cinza bem escuro, quase preto
    }
  },
  sizes: {
    _80: '5rem', // 5rem = 80px
    _64: '4rem', // 4rem = 64px
    _60: '3.75rem', // 3.75rem = 60px
    _48: '3rem', // 3rem = 48px
    _42: '2.62rem', // 2.62rem = 42px
    _36: '2.25rem', // 2.25rem = 36px
    _32: '2rem', // 2rem = 32px
    _30: '1.875rem', // 1.875rem = 30px
    _24: '1.5rem', // 1.5rem = 24px
    _18: '1.125rem', // 1.125rem = 18px
    _16: '1rem', // 1rem = 16px
    _14: '0.875rem', // 0.875 = 14px
    _12: '0.75rem' // 0.75rem = 12px
  },
  fonts: {
    primary_regular: 'Segoe UI',
    secondary_regular: 'Helvetica Neue'
  }
};

interface ThemeProps {
  children: ReactNode;
}

const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
