"use client";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { styled } from "@mui/material/styles";

interface TwoColumnLayoutProps {
	leftCol?: ReactNode | string;
	rightCol?: ReactNode | string;
	leftColWidth?: {
		xs?: string | number;
		md?: string | number;
	};
	rightColWidth?: {
		xs?: string | number;
		md?: string | number;
	};
}

export default function TwoColumnLayout({
	leftCol,
	rightCol,
	leftColWidth = { xs: "100%", md: "300px" },
	rightColWidth = { xs: "100%", md: "1fr" },
}: TwoColumnLayoutProps) {
	return (
		<Box
			sx={{
				display: "flex",
				gap: 3,
				width: "100%",
				flexDirection: {
					xs: "column",
					md: "row",
				},
			}}
		>
			<StyledInnerBox
				sx={{
					width: leftColWidth,
				}}
			>
				{leftCol}
			</StyledInnerBox>

			<StyledInnerBox
				sx={{
					width: rightColWidth,
				}}
			>
				{rightCol}
			</StyledInnerBox>
		</Box>
	);
}

export const StyledInnerBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(2),
}));
