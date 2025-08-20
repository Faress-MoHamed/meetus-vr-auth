"use client";

import { FormField } from "@/components/molesules/FormField";
import { InputWithIcon } from "@/components/molesules/InputWithIcon";
import { Lock, Eye, EyeOff } from "lucide-react";


interface PasswordFieldProps {
	password: string;
	setPassword: (password: string) => void;
	showPassword: boolean;
	setShowPassword: (show: boolean) => void;
	error?: string;
	placeholder?: string;
}

export function PasswordField({
	password,
	setPassword,
	showPassword,
	setShowPassword,
	error,
	placeholder = "Password",
}: PasswordFieldProps) {
	return (
		<FormField error={error}>
			<InputWithIcon
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				leftIcon={<Lock className="h-5 w-5" />}
				rightIcon={
					showPassword ? (
						<EyeOff className="h-5 w-5" />
					) : (
						<Eye className="h-5 w-5" />
					)
				}
				onRightIconClick={() => setShowPassword(!showPassword)}
				error={!!error}
				className="rounded-[8px]"
			/>
		</FormField>
	);
}
