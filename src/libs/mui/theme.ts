import { createTheme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { fontThemes } from "./fonts";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
  }
}

const mainTheme: ThemeOptions = {
  palette: {
    primary: {
      main: "#004C97",
    },
    secondary: {
      main: "#FFA208",
    },
    error: {
      main: "#EC2227",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

export const theme = createTheme(deepmerge(mainTheme, fontThemes));
