"use client";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { palette } from "@/theme/palette";

export const StyledFlexBox = styled(Grid)({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	color: palette.primary.main, // Example usage of custom theme values
});
