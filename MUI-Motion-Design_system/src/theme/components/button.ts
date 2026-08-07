import { Components, Theme } from "@mui/material";

export const MuiButton = {
	styleOverrides: {
		root: ({ theme }: { theme: Theme }) => ({
			borderRadius: 8,
			textTransform: "none",
			fontWeight: 600,
			fontFamily: theme.typography.fontFamily,
		}),
	},

	variants: [
		{
			props: {
				variant: "contained",
				color: "primary",
			},
			style: {
				"backgroundColor": "#5aefa4",
				"color": "#000",

				"&:hover": {
					backgroundColor: "#46d890",
				},
			},
		},

		{
			props: {
				variant: "outlined",
				color: "primary",
			},
			style: {
				borderColor: "#5aefa4",
				color: "#5aefa4",
			},
		},
	],
} satisfies Components<Theme>["MuiButton"];
