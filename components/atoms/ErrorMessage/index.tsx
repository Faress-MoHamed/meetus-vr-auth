"use client";

interface ErrorMessageProps {
	message?: string | null;
	className?: string;
}

export function ErrorMessage({
	message,
	className = "text-red-600 text-sm bg-red-50 p-3 rounded-lg",
}: ErrorMessageProps) {
	if (!message) return null;

	return <p className={className}>{message}</p>;
}
