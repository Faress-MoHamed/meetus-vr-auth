import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function BottomShadow({ className }: { className?: string }) {
	return (
		<Image
			src={"/BottomBlur.svg"}
			height={667}
			width={667}
			alt="BottomBlur"
			className={cn("absolute right-0 bottom-0  -z-50", className)}
		/>
	);
}
