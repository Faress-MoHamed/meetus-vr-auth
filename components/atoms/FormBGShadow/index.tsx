import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

export default function FormBGShadow({ className }: { className?: string }) {
	  return (
			<Image
				src={"/FormBGShadow.svg"}
				height={807}
				width={807}
				alt="shadow"
				className={cn("absolute left-0 top-0  -z-50", className)}
			/>
		);
}
