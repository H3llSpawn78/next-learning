import "@mui/material/Card";
import "@mui/material/Paper";
import "@mui/material/Button";
import "@mui/material/styles";

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		tablet: true;
		laptop: true;
		desktop: true;
	}

	interface Theme {
		layout: {
			maxContentWidth: number;
			maxNarrowWidth: number;
			maxMediumWidth: number;
			maxSmallWidth: number;
		};
	}

	interface ThemeOptions {
		layout?: {
			maxContentWidth?: number;
			maxNarrowWidth?: number;
			maxMediumWidth?: number;
			maxSmallWidth?: number;
		};
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		primary: true;
		secondary: true;
		tertiary: true;
	}
}
declare module "@mui/material/Paper" {
	interface PaperPropsVariantOverrides {
		primary: true;
		secondary: true;
	}
}
