import { ThemeOptions } from "@mui/material";
import DBHeaventRegular from "../../assets/fonts/db-heavent/DBHeavent-Cond.woff2";
import DBHeaventRegularItalic from "../../assets/fonts/db-heavent/DBHeavent-CondIt.woff2";
import DBHeaventBold from "../../assets/fonts/db-heavent/DBHeavent-BoldCond.woff2";
import DBHeaventBoldItalic from "../../assets/fonts/db-heavent/DBHeavent-BoldCondIt.woff2";

export const fontThemes: ThemeOptions = {
  typography: {
    fontFamily: ['"DB Heavent"', "Arial", "sans-serif"].join(", "),
    fontSize: 28,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
                @font-face {
                    font-family: 'DB Heavent';
                    src: url(${DBHeaventBoldItalic}) format('woff2');
                    font-weight: bold;
                    font-style: italic;
                    font-display: auto;
                }
                
                @font-face {
                    font-family: 'DB Heavent';
                    src: url(${DBHeaventRegularItalic}) format('woff2');
                    font-weight: normal;
                    font-style: italic;
                    font-display: auto;
                }
                
                @font-face {
                    font-family: 'DB Heavent';
                    src: url(${DBHeaventBold}) format('woff2');
                    font-weight: bold;
                    font-style: normal;
                    font-display: auto;
                }
                
                @font-face {
                    font-family: 'DB Heavent';
                    src: url(${DBHeaventRegular}) format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: auto;
                }
            `,
    },
  },
};
