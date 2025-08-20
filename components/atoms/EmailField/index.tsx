"use client";

import { FormField } from "@/components/molesules/FormField";
import { InputWithIcon } from "@/components/molesules/InputWithIcon";
import { Mail } from "lucide-react";


interface EmailFieldProps {
	email: string;
	setEmail: (email: string) => void;
	error?: string;
}

export function EmailField({ email, setEmail, error }: EmailFieldProps) {
	return (
		<FormField error={error}>
			<InputWithIcon
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				leftIcon={<Mail className="h-5 w-5" />}
				error={!!error}
			/>
		</FormField>
	);
}
