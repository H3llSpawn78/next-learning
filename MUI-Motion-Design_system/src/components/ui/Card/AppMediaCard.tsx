import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { AppCard, AppCardProps } from "./AppCard";
import { CardActions } from "@mui/material";

interface MediaCardProps extends AppCardProps {
	title: string;
	description: string;
	image: string;
	actions?: ReactNode;
}

export default function MediaCard({
	title,
	description,
	image,
	actions,
	...cardProps
}: MediaCardProps) {
	return (
		<AppCard {...cardProps}>
			<CardMedia component="img" height="240" image={image} alt={title} />
			<CardContent>
				<Typography variant="h5" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			{actions && <CardActions>{actions}</CardActions>}
		</AppCard>
	);
}
