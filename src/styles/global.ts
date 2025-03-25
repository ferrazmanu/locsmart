'use client';

import { createGlobalStyle, css } from 'styled-components';

export const SCROLLBAR_STYLE = css`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.grays._50};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }
`;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${({ theme }) =>
      `"${theme.fonts.primary_regular}", "${theme.fonts.secondary_regular}"`}, sans-serif;  
  }

  body {
    margin: 0;
    padding: 0;
    background-color:${({ theme }) => theme.colors.grays._50}; 
    color: ${({ theme }) => theme.colors.secondary};

    width: 100vw;
    height: 100vh;

    section{
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    ${SCROLLBAR_STYLE}
  }


  html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		vertical-align: baseline;
	}

  ol, ul, li{
    padding:0;
    list-style: none;
  }

  a{
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default GlobalStyles;
