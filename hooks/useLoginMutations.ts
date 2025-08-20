import {
	authAPI,
	type LoginRequest,
	type LoginResponse,
} from "@/lib/api-client";
// import { useAuthStore } from "@/store/auth-store";
import { clearError, setAuthData } from "@/store/auth-store-RTKversion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
export const authKeys = {
	all: ["auth"] as const,
	userInfo: () => [...authKeys.all, "userInfo"] as const,
};
export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	// const { setAuthData, clearError } = useAuthStore();
	const dispatch = useDispatch();
	return useMutation({
		mutationFn: async (credentials: { email: string; password: string }) => {
			const loginData: LoginRequest = {
				email: credentials.email,
				password: credentials.password,
				isEmployee: true,
			};

			const response = await authAPI.login(loginData);
			return response;
		},
		onSuccess: async (loginResponse: LoginResponse) => {
			try {
				Cookies.set("auth-token", loginResponse.token, {
					expires: 7,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
				});
				const userInfo = await authAPI.getUserInfo();
				// setAuthData({
				// 	user: {
				// 		id: userInfo.id,
				// 		name: userInfo.name,
				// 	},
				// 	token: loginResponse.token,
				// });
				dispatch(
					setAuthData({
						user: {
							id: userInfo.id,
							name: userInfo.name,
						},
						token: loginResponse.token,
					})
				);
				queryClient.invalidateQueries({ queryKey: authKeys.userInfo() });
				dispatch(clearError());
				// clearError();
			} catch (error) {
				console.error("Failed to fetch user info after login:", error);
				throw error;
			}
		},
		onError: (error: any) => {
			console.error("Login failed:", error);
			Cookies.remove("auth-token");
		},
	});
};
