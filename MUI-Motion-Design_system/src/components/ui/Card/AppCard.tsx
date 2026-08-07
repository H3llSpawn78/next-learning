import Card from "@mui/material/Card";
import type { CardProps } from "@mui/material/Card";

export interface AppCardProps extends CardProps {}

export function AppCard({ children, sx, ...props }: AppCardProps) {
	return (
		<Card elevation={0} {...props} sx={sx}>
			{children}
		</Card>
	);
}
