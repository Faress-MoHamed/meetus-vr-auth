"use client";

import { AuthLink } from "@/components/atoms/AuthLink";
import { EmailField } from "@/components/atoms/EmailField";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { PasswordField } from "@/components/atoms/PasswordField";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import type React from "react";

interface LoginFormProps {
	email: string;
	setEmail: (email: string) => void;
	password: string;
	setPassword: (password: string) => void;
	showPassword: boolean;
	setShowPassword: (show: boolean) => void;
	emailError: string;
	passwordError: string;
	handleSubmit: (e: React.FormEvent) => Promise<void>;
	isFormValid: boolean;
	isLoading: boolean;
	error: string | null;
	onSignUpClick?: () => void;
}

export function LoginFormFields({
	email,
	setEmail,
	password,
	setPassword,
	showPassword,
	setShowPassword,
	emailError,
	passwordError,
	handleSubmit,
	isFormValid,
	isLoading,
	error,
	onSignUpClick,
}: LoginFormProps) {
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<EmailField email={email} setEmail={setEmail} error={emailError} />

			<PasswordField
				password={password}
				setPassword={setPassword}
				showPassword={showPassword}
				setShowPassword={setShowPassword}
				error={passwordError}
			/>

			<ErrorMessage message={error} />

			<SubmitButton
				isLoading={isLoading}
				isValid={isFormValid}
				loadingText="Logging in..."
			>
				Login
			</SubmitButton>

			<AuthLink
				text="Don't have an account?"
				linkText="Sign up"
				onLinkClick={onSignUpClick}
			/>
		</form>
	);
}
