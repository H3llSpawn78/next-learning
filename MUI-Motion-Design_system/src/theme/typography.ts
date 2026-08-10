import { palette } from "./palette";
import { fonts } from "./fonts";

export const typography = {
	fontFamily: fonts.body,

	h1: {
		fontWeight: 500,
		fontSize: "3rem",
		color: palette.primary.main,
		fontFamily: fonts.heading,
	},
	h2: {
		fontWeight: 500,
		fontSize: "2rem",
		color: palette.primary.main,
		fontFamily: fonts.heading,
	},
	h3: {
		fontWeight: 500,
		fontSize: "1.7rem",
		color: palette.primary.main,
		fontFamily: fonts.body,
	},
	h4: {
		fontWeight: 500,
		fontSize: "1.4rem",
		fontFamily: fonts.heading,
	},
	h5: {
		fontWeight: 500,
		fontSize: "1.2rem",
		fontFamily: fonts.heading,
	},
	h6: {
		fontWeight: 500,
		fontSize: ".8rem",
		fontFamily: fonts.heading,
	},
	body1: {
		fontWeight: 500,
		fontSize: "1rem",
		lineHeight: 1.5,
	},
};
