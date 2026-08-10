"use client";

import { motion } from "framer-motion";

import { staggerContainer, staggerItem } from "./variants";

interface StaggerProps {
	text: string;
}

export function Stagger({ text }: StaggerProps) {
	return (
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
	);
}
