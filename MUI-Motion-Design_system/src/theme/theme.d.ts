import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
	interface Theme {
		custom: {
			maxWidth: string;
		};
	}

	interface ThemeOptions {
		custom?: {
			maxWidth?: string;
		};
	}
}
