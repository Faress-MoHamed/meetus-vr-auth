import { authAPI, type UserInfoResponse } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { authKeys } from "./useLoginMutations";
import Cookies from "js-cookie";

export const useUserInfoQuery = (enabled: boolean = true) => {

	return useQuery({
		queryKey: authKeys.userInfo(),
		queryFn: authAPI.getUserInfo,
		enabled: enabled && !!Cookies.get("auth-token"),
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error: any) => {
			// Don't retry on 401 (unauthorized)
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 2;
		},

		// o: (userInfo: UserInfoResponse) => {
		// 	const token = Cookies.get("auth-token");
		// 	if (token) {
		// 		setAuthData({
		// 			user: {
		// 				id: userInfo.id,
		// 				name: userInfo.name,
		// 			},
		// 			token,
		// 		});
		// 	}
		// },
		// onError: (error: any) => {
		// 	// If user info fails with 401, logout
		// 	if (error?.response?.status === 401) {
		// 		logout();
		// 	}
		// },
	});
};
