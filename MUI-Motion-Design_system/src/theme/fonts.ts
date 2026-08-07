import { Inter, Roboto } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-primary" });
export const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-secondary",
});

export const fonts = {
	body: "var(--font-primary)",
	heading: "var(--font-secondary)",
};
