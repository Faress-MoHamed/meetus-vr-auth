"use client";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
	isLoading: boolean;
	isValid: boolean;
	loadingText?: string;
	children: React.ReactNode;
	className?: string;
}

export function SubmitButton({
	isLoading,
	isValid,
	loadingText = "Loading...",
	children,
	className = "w-full h-[43px] bg-[#9414FF] hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-[8px] transition-colors px-5 py-3",
}: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			disabled={!isValid || isLoading}
			className={className}
		>
			{isLoading ? loadingText : children}
		</Button>
	);
}
