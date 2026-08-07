"use client";

import { motion } from "framer-motion";
import Typography, { TypographyProps } from "@mui/material/Typography";

import { staggerContainer, staggerItem } from "../variants";

interface StaggerTypographyProps extends TypographyProps {
	text: string;
}

export function StaggerTypography({
	text,
	...typographyProps
}: StaggerTypographyProps) {
	return (
		<Typography component={motion.div} {...typographyProps}>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{
					once: false,
					amount: 0.3,
				}}
			>
				{text.split("").map((char, index) => (
					<motion.span
						key={index}
						variants={staggerItem}
						style={{
							display: "inline-block",
							whiteSpace: char === " " ? "pre" : "normal",
						}}
					>
						{char}
					</motion.span>
				))}
			</motion.div>
		</Typography>
	);
}
