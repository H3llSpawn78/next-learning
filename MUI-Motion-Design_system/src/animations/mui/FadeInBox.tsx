"use client";

// Uses MotionBox to allow for sx props to be added
import { MotionBox } from "./MotionBox";
import { fadeUp } from "../variants";

interface FadeInBoxProps {
	children: React.ReactNode;
}

export function FadeInBox({ children }: FadeInBoxProps) {
	return (
		<MotionBox
			variants={fadeUp}
			initial="hidden"
			whileInView="visible"
			viewport={{
				once: false,
				amount: 0.7,
			}}
			transition={{
				duration: 0.6,
			}}
			sx={{
				width: "100%",
			}}
		>
			{children}
		</MotionBox>
	);
}
