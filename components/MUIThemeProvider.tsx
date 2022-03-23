import { useTheme } from "next-themes";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme, globalStyles } from "../styles/theme/theme";
import { FC, useEffect, useState } from "react";

const MUIThemeProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const {resolvedTheme} = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    resolvedTheme === "dark"
      ? setCurrentTheme(darkTheme)
      : setCurrentTheme(lightTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;