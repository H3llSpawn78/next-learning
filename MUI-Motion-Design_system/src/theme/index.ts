import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { MuiButton } from "./components/button";
import { MuiTextField } from "./components/textField";
import { MuiCard } from "@/theme/components/card";
import { breakpoints } from "@/theme/breakpoints";

export const theme = createTheme({
	// Only add references for tokens that need access to MUI's theme context
	// This should only really be palette, spacing, breakpoints, typography or any MUI specific
	// Base theme values
	palette,
	typography,
	// No real need to have spacing as separate file unless -
	// we start needing obscure variants based on the design -
	// design should use multiples of a desired integer value for consistency
	spacing: 8,
	// Usage: theme.spacing(2) = 16px etc etc

	// Custom breakpoints
	breakpoints: {
		values: breakpoints,
	},

	// Custom component overrides
	components: {
		MuiButton,
		MuiTextField,
		MuiCard,
	},
});

// Usage:
// const theme = useTheme();
// theme.custom.maxWidth;
