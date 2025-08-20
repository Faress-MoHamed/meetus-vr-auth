import LoginForm from "@/components/pages/LoginForm";
import AuthInitializer from "@/providers/AuthInitializer";
import React from "react";

export default function page() {
	return (
		<main className="min-h-screen">
			<LoginForm />
		</main>
	);
}
