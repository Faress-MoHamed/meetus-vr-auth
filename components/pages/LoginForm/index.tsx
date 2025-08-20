"use client";

import { AuthLayout } from "@/components/layout/AuthLayout/auth.layout";
import { LoginHeader } from "../../molesules/LoginHeader";
import { useLoginForm } from "@/hooks/useLoginForm";
import { LoginFormFields } from "@/components/organisms/LoginFormFields";

export default function LoginForm() {
	const loginForm = useLoginForm();

	return (
		<AuthLayout>
			<div className="w-full max-w-sm flex flex-col gap-9 relative">
				<LoginHeader />
				<LoginFormFields {...loginForm} />
			</div>
		</AuthLayout>
	);
}
