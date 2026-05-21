import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    black: string;
    gray: Palette["primary"];
    white: string;
  }

  interface PaletteOptions {
    black?: string;
    gray?: PaletteOptions["primary"];
    white?: string;
  }
}
