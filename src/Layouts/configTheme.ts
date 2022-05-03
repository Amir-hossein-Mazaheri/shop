import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#2c3e50",
  //   },
  //   secondary: {
  //     main: "#B9CCE2",
  //   },
  // },
});

theme = responsiveFontSizes(theme);

export default theme;
