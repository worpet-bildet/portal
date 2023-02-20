import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#289539",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
