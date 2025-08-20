"use client";

interface AuthLinkProps {
	text: string;
	linkText: string;
	onLinkClick?: () => void;
	className?: string;
	linkClassName?: string;
}

export function AuthLink({
	text,
	linkText,
	onLinkClick,
	className = "text-center text-[#62626B]",
	linkClassName = "font-medium",
}: AuthLinkProps) {
	return (
		<p className={className}>
			{text}{" "}
			<button type="button" onClick={onLinkClick} className={linkClassName}>
				{linkText}
			</button>
		</p>
	);
}
