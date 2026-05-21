import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#bbbbbb",
    },
    primary: {
      main: "#000",
    },
    gray: {
      main: "#d1d5dc",
    },
    white: "#ffffff",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transition: "none",
        },
      },
    },
  },
});
