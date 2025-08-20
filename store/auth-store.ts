// lib/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
	id: string;
	name: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	error: string | null;

	// Actions
	setAuthData: (data: { user: User; token: string }) => void;
	logout: () => void;
	setError: (error: string) => void;
	clearError: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			error: null,

			// Set authentication data after successful login
			setAuthData: (data: { user: User; token: string }) => {
				set({
					user: data.user,
					token: data.token,
					isAuthenticated: true,
					error: null,
				});
			},

			// Logout and clear all auth data
			logout: () => {
				// Remove token from cookie
				Cookies.remove("auth-token");

				set({
					user: null,
					token: null,
					isAuthenticated: false,
					error: null,
				});
			},

			// Set error message
			setError: (error: string) => {
				set({ error });
			},

			// Clear error message
			clearError: () => {
				set({ error: null });
			},

			// Initialize auth state from cookie on app start
			initializeAuth: () => {
				const cookieToken = Cookies.get("auth-token");
				const currentState = get();

				if (cookieToken && cookieToken !== currentState.token) {
					// Token exists in cookie, update store
					set({
						token: cookieToken,
						// Note: user data will be fetched by useUserInfoQuery
					});
				} else if (!cookieToken && currentState.token) {
					// No token in cookie but exists in store, clear store
					set({
						user: null,
						token: null,
						isAuthenticated: false,
					});
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				// Don't persist token in localStorage, use cookie instead
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

// Utility functions for cookie management
export const getTokenFromCookie = (): string | undefined => {
	return Cookies.get("auth-token");
};

export const setTokenInCookie = (token: string): void => {
	Cookies.set("auth-token", token, {
		expires: 7,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
	});
};

export const removeTokenFromCookie = (): void => {
	Cookies.remove("auth-token");
};
