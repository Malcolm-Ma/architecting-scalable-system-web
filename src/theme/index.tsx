/**
 * @file theme provider
 * @author Mingze Ma
 */
import React from "react";
import {createTheme, CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";

interface ELearnThemeProviderProps {
  children: React.ReactNode
}

const ELearnThemeProvider: React.FC<ELearnThemeProviderProps> = ({ children }) => {
  const theme = createTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ELearnThemeProvider;
