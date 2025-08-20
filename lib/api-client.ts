import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";

// API Response Types
export interface LoginResponse {
	token: string;
	refresh: string;
	[key: string]: any;
}

export interface UserInfoResponse {
	id: string;
	name: string;
	[key: string]: any;
}

export interface LoginRequest {
	email: string;
	password: string;
	isEmployee: boolean;
}

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
	baseURL: "https://api-yeshtery.dev.meetusvr.com/v1",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000, // 10 seconds timeout
});
apiClient.interceptors.request.use(
	(config) => {
		const token = Cookies.get("auth-token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle 401 unauthorized - token expired
		if (error.response?.status === 401) {
			Cookies.remove("auth-token");
			// Redirect to auth page or trigger logout
			if (typeof window !== "undefined") {
				window.location.href = "/auth";
			}
		}
		return Promise.reject(error);
	}
);

export const authAPI = {
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		const response: AxiosResponse<LoginResponse> = await apiClient.post(
			"/yeshtery/token",
			credentials
		);
		return response.data;
	},

	getUserInfo: async (): Promise<UserInfoResponse> => {
		const response: AxiosResponse<UserInfoResponse> = await apiClient.get(
			"/user/info"
		);
		return response.data;
	},
};

export default apiClient;
