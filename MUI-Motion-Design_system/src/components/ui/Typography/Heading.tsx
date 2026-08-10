import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { Stagger } from "@/animations/Stagger";

interface HeadingProps {
	title: string;
	subtitle?: ReactNode;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	component?: React.ElementType;
	stagger?: boolean;
}

export default function Heading({
	title,
	subtitle,
	variant = "h1",
	component,
	stagger = false,
}: HeadingProps) {
	return (
		<Box>
			<Typography
				variant={variant}
				component={component ?? variant}
				gutterBottom
			>
				{stagger ? <Stagger text={title} /> : title}
			</Typography>

			{subtitle && (
				<Typography variant="body1" color="text.secondary">
					{subtitle}
				</Typography>
			)}
		</Box>
	);
}
