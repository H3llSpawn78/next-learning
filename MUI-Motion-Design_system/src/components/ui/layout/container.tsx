"use client";

import { layout } from "@/theme/layout";
import { Box, styled } from "@mui/material";

interface AppContainerProps {
	children: React.ReactNode;
}

export const StyledContainer = styled(Box)(({ theme }) => ({
	maxWidth: layout.maxContentWidth,
	margin: "0 auto",
	padding: "0 2rem",

	[theme.breakpoints.up("tablet")]: {
		padding: "0 2.5rem",
	},
	[theme.breakpoints.up("laptop")]: {
		padding: "0 3rem",
	},
	[theme.breakpoints.up("desktop")]: {
		padding: "0 3.5rem",
	},
}));

export default function AppContainer({ children }: AppContainerProps) {
	return <StyledContainer>{children}</StyledContainer>;
}
