import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { isValidEmail } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "./useLoginMutations";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { clearError } from "@/store/auth-store-RTKversion";

export function useLoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const dispatch = useDispatch();
	// const { error, clearError } = useAuthStore();
	const { error } = useTypedSelector((s) => s.auth);
	const loginMutation = useLoginMutation();
	const router = useRouter();
	useEffect(() => {
		if (emailError && email) {
			setEmailError("");
		}
	}, [email, emailError]);

	useEffect(() => {
		if (passwordError && password) {
			setPasswordError("");
		}
	}, [password, passwordError]);
	useEffect(() => {
		if (error && (email || password)) {
			dispatch(clearError());
			// clearError();
		}
	}, [email, password, error, dispatch]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setEmailError("");
		setPasswordError("");
		let hasErrors = false;
		if (!email) {
			setEmailError("Email is required");
			hasErrors = true;
		} else if (!isValidEmail(email)) {
			setEmailError("Please enter a valid email address");
			hasErrors = true;
		}

		if (!password) {
			setPasswordError("Password is required");
			hasErrors = true;
		}

		if (hasErrors) return;

		try {
			await loginMutation.mutateAsync({ email, password });
			router.replace("/");
		} catch (error: any) {
			console.error("Login error:", error);
		}
	};

	const isFormValid = Boolean(email && password && isValidEmail(email));

	return {
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
		isLoading: loginMutation.isPending,
		error: loginMutation.error?.message || error,
	};
}
