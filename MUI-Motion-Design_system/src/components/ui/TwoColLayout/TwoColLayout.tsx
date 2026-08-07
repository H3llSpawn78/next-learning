import Box from "@mui/material/Box";
import { ReactNode } from "react";

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
			<Box
				sx={{
					width: leftColWidth,
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					padding: 3,
				}}
			>
				{leftCol}
			</Box>

			<Box
				sx={{
					width: rightColWidth,
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					padding: 3,
				}}
			>
				{rightCol}
			</Box>
		</Box>
	);
}
