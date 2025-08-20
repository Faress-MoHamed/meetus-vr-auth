import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function ShadowPink({ className }: { className?: string }) {
	return (
		<Image
			src={"/shadow.svg"}
			height={667}
			width={667}
			alt="shadow"
			className={cn("absolute right-0 top-0  -z-50", className)}
		/>
	);
}
