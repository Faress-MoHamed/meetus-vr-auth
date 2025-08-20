// import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth-store-RTKversion";

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();
	// const { logout: storeLogout } = useAuthStore();
	const dispatch = useDispatch();
	return useMutation({
		mutationFn: async () => {
			return Promise.resolve();
		},
		onSuccess: () => {
			// storeLogout();
			dispatch(logout());
			queryClient.clear();
			Cookies.remove("auth-token");
		},
	});
};
