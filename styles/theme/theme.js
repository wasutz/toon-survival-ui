import { createTheme, css } from "@mui/material/styles";
import lightThemeOption from "./lightThemeOption";
import darkThemeOption from "./darkThemeOption";

export const lightTheme = createTheme(lightThemeOption);
export const darkTheme = createTheme(darkThemeOption);

export const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
