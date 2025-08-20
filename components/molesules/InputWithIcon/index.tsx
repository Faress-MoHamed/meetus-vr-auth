"use client";

import type React from "react";
import { Input } from "@/components/ui/input";

interface InputWithIconProps {
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	onRightIconClick?: () => void;
	error?: boolean;
	className?: string;
}

export function InputWithIcon({
	type = "text",
	placeholder,
	value,
	onChange,
	leftIcon,
	rightIcon,
	onRightIconClick,
	error,
	className = "",
}: InputWithIconProps) {
	const baseClasses =
		"h-12 bg-white/90 border-0 rounded-lg text-gray-800 placeholder:text-gray-500";
	const leftPadding = leftIcon ? "pl-10" : "pl-3";
	const rightPadding = rightIcon ? "pr-10" : "pr-3";
	const errorClasses = error ? "ring-2 ring-red-500" : "";

	return (
		<div className="relative">
			{leftIcon && (
				<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
					{leftIcon}
				</div>
			)}

			<Input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`${baseClasses} ${leftPadding} ${rightPadding} ${errorClasses} ${className}`}
			/>

			{rightIcon && (
				<button
					type="button"
					onClick={onRightIconClick}
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
				>
					{rightIcon}
				</button>
			)}
		</div>
	);
}
