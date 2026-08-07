import { AppButton } from "@/components/ui/Button/AppButton";
import { Typography } from "@mui/material";
import { StyledFlexBox } from "@/components/ui/StyledFlexBox";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import Grid from "@mui/material/Grid";
import TwoColumnLayout from "@/components/ui/TwoColLayout/TwoColLayout";
import MediaCard from "@/components/ui/Card/AppMediaCard";
import { FadeIn } from "@/animations/mui/FadeInBox";
import { StaggerTypography } from "@/animations/mui/StaggerTypography";

export default function Page() {
	return (
		<>
			<Grid container spacing={2} sx={{ marginTop: "1000px" }}>
				<StyledFlexBox size={{ xs: 12, md: 6 }}>
					<StaggerTypography
						variant="h1"
						text="This text will stagger in from the pub ;)"
					/>
				</StyledFlexBox>
				<StyledFlexBox size={{ xs: 12, md: 6 }}>
					<AppButton
						variant="outlined"
						color="primary"
						endIcon={<DeleteIcon />}
					>
						Test button
					</AppButton>
				</StyledFlexBox>
			</Grid>
			<Grid container spacing={2}>
				<TwoColumnLayout
					leftColWidth={{
						xs: "100%",
						md: "100%",
					}}
					rightColWidth={{
						xs: "100%",
						md: "100%",
					}}
					leftCol={
						<AppButton
							variant="outlined"
							color="primary"
							endIcon={<DeleteIcon />}
						>
							Test button
						</AppButton>
					}
				/>
			</Grid>
			<Grid container spacing={2}>
				<TwoColumnLayout
					leftColWidth={{
						xs: "100%",
						md: "100%",
					}}
					rightColWidth={{
						xs: "100%",
						md: "100%",
					}}
					leftCol={
						<AppButton
							variant="outlined"
							color="primary"
							endIcon={<ShareIcon />}
						>
							Test button
						</AppButton>
					}
					rightCol={
						<FadeIn>
							<Typography variant="h1">This text will fade in...</Typography>
						</FadeIn>
					}
				/>
			</Grid>
			<Grid container spacing={2}>
				<FadeIn>
					<TwoColumnLayout
						leftColWidth={{
							xs: "100%",
							md: "100%",
						}}
						rightColWidth={{
							xs: "100%",
							md: "100%",
						}}
						leftCol={
							<MediaCard
								title="Test title"
								variant="primary"
								description=""
								image="https://picsum.photos/480/240"
								actions={
									<>
										<AppButton
											variant="outlined"
											color="primary"
											endIcon={<DeleteIcon />}
										>
											Test button
										</AppButton>
										<AppButton color="primary" endIcon={<ShareIcon />}>
											Learn More
										</AppButton>
									</>
								}
							/>
						}
						rightCol={
							<MediaCard
								title="Test title"
								variant="primary"
								description=""
								image="https://picsum.photos/480/240"
								actions={
									<>
										<AppButton
											variant="outlined"
											color="primary"
											endIcon={<DeleteIcon />}
										>
											Test button
										</AppButton>
										<AppButton size="small" endIcon={<ShareIcon />}>
											Learn More
										</AppButton>
									</>
								}
							/>
						}
					/>
				</FadeIn>
			</Grid>
		</>
	);
}
