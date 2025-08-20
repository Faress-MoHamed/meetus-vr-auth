"use client";

import AuthLoading from "@/components/auth-loading";
import { useAuthStore } from "@/store/auth-store";
import { initializeAuth } from "@/store/auth-store-RTKversion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
	// const { initializeAuth } = useAuthStore();
	const dispatch = useDispatch();
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Initialize auth state from cookie on app start
		dispatch(initializeAuth());
		setIsInitialized(true);
	}, [dispatch]);

	if (!isInitialized) {
		return <AuthLoading />;
	}

	return <>{children}</>;
}
