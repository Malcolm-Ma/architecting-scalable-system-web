/**
 * @file theme provider
 * @author Mingze Ma
 */
import React from "react";
import {createTheme, CssBaseline, StyledEngineProvider, ThemeOptions, ThemeProvider} from "@mui/material";
// assets
import colors from 'src/assets/_themes-vars.module.scss';
import themeTypography from "src/theme/typography";
import themePalette from "src/theme/palette";


interface ELearnThemeProviderProps {
  children: React.ReactNode
}

const ELearnThemeProvider: React.FC<ELearnThemeProviderProps> = ({ children }) => {

  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    // mixins: {
    //   toolbar: {
    //     minHeight: '48px',
    //     padding: '16px',
    //     '@media (min-width: 600px)': {
    //       minHeight: '48px'
    //     }
    //   }
    // },
    typography: themeTypography(themeOption)
  };

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
