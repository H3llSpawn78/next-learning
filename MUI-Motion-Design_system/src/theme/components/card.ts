import { palette } from "@/theme/palette";
import { Components, Theme } from "@mui/material";

// Component overrides
export const MuiCard = {
	styleOverrides: {
		root: ({ theme }: { theme: Theme }) => ({
			borderRadius: 8,
			boxShadow: "none",
			padding: theme.spacing(2),
			backgroundColor: "#000",
			borderColor: palette.primary.main,
			color: palette.primary.main,
			width: "100%",
		}),
	},
	variants: [
		{
			props: { variant: "primary" },
			style: {
				border: `1px solid ${palette.primary.main}`,
				backgroundColor: "#000",
				color: palette.primary.main,
			},
		},
		{
			props: { variant: "secondary" },
			style: {
				border: `1px solid ${palette.secondary.main}`,
			},
		},
	],
} satisfies Components<Theme>["MuiCard"];
