"use client";

import { reveal } from "@/animations/variants";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

interface RevealProps {
	children: React.ReactNode;
}

export function Reveal({ children }: RevealProps) {
	return (
		<Box sx={{ overflow: "hidden" }}>
			<motion.div
				initial={{ y: "100%" }}
				variants={reveal}
				whileInView={{ y: 0 }}
				viewport={{ once: true }}
				transition={{
					duration: 0.8,
				}}
			>
				{children}
			</motion.div>
		</Box>
	);
}
