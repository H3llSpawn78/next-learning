export const spacing = {
	none: 0,
	xs: 0.5,
	sm: 1, // 8px set in the theme/index.ts file
	md: 2,
	lg: 3,
	xl: 4,
	xxl: 6,

	// these could be expanded depending on the design/inconsistency of the spacing across different components/elements
	cardPadding: 3,
	// these tokens are descriptive, thus have meaning, which is essential for a good ui design system
	// They could even be expanded for example - buttonPaddingX, buttonPaddingY etc depending on how granular the design is
	buttonPadding: 4,
	pagePadding: 4,
} as const;

// This does get added to the theme/index.ts file and but should be used as per the belwo example:

// import { spacing } from "@/theme/spacing";

// const StyledCard = styled(Card)(({ theme }) => ({
//padding: theme.spacing(spacing.cardPadding),
//}));
