"use client";

import type React from "react";

interface FormFieldProps {
	children: React.ReactNode;
	error?: string;
	className?: string;
}

export function FormField({
	children,
	error,
	className = "space-y-2",
}: FormFieldProps) {
	return (
		<div className={className}>
			{children}
			{error && <p className="text-red-600 text-sm">{error}</p>}
		</div>
	);
}
