"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "./variants";

export function StaggerContainer({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	);
}
