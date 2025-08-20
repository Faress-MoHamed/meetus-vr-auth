// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	error: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Set authentication data after successful login
		setAuthData: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.error = null;

			setTokenInCookie(action.payload.token);
		},

		// Logout and clear all auth data
		logout: (state) => {
			removeTokenFromCookie();
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.error = null;
		},

		// Set error message
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},

		// Clear error message
		clearError: (state) => {
			state.error = null;
		},

		// Initialize auth state from cookie on app start
		initializeAuth: (state) => {
			const cookieToken = Cookies.get("auth-token");

			if (cookieToken && cookieToken !== state.token) {
				state.token = cookieToken;
				state.isAuthenticated = true;
				// user data will be fetched elsewhere (e.g. query)
			} else if (!cookieToken && state.token) {
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
			}
		},
	},
});

export const { setAuthData, logout, setError, clearError, initializeAuth } =
	authSlice.actions;

export default authSlice.reducer;

// --- Cookie Helpers ---
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
