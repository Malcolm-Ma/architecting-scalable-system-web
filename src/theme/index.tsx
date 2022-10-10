/**
 * @file theme provider
 * @author Mingze Ma
 */
import React, {useMemo} from "react";
import {createTheme, CssBaseline, StyledEngineProvider, ThemeOptions, ThemeProvider} from "@mui/material";
import Palette from "src/theme/palette";
import typography from "src/theme/typography";

interface ELearnThemeProviderProps {
  children: React.ReactNode
}

const ELearnThemeProvider: React.FC<ELearnThemeProviderProps> = ({ children }) => {
  const theme = Palette();

  const themeOptions = useMemo(
    () => ({
      palette: theme.palette,
      shape: { borderRadius: 8 },
      typography,
    }),
    [theme]
  );
  const themes = createTheme(themeOptions as ThemeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ELearnThemeProvider;
