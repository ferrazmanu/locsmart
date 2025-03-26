import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;

      white: string;
      black: string;
      danger: string;
      warning: string;

      grays: {
        _50: string; // white_smoke: cinza bem claro, quase branco
        _70: string; // pale_gray: cinza claro mais neutro
        _100: string; // light_gray: cinza mais claro
        _200: string; // slate_gray: cinza azulado suave
        _400: string; // medium_gray: cinza médio
        _800: string; // dark_gray: cinza escuro
        _900: string; // charcoal_gray: cinza bem escuro, quase preto
      };
    };
    sizes: {
      _80: string;
      _64: string;
      _60: string;
      _48: string;
      _42: string;
      _36: string;
      _30: string;
      _32: string;
      _24: string;
      _18: string;
      _16: string;
      _14: string;
      _12: string;
    };
    fonts: {
      primary_regular: string;
      secondary_regular: string;
    };
  }
}
