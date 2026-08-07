"use client";

// Generic fade in
import { fadeUp } from "./variants";
import { motion } from "framer-motion";
interface FadeInProps {
	children: React.ReactNode;
}

export function FadeIn({ children }: FadeInProps) {
	return (
		<motion.div
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{
				once: false,
				amount: 0.3,
			}}
			transition={{
				duration: 0.6,
			}}
		>
			{children}
		</motion.div>
	);
}
