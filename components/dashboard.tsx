"use client";

import { LogOut, User, Hash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserInfoQuery } from "@/hooks/useUserInfoQuery";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export default function Dashboard() {
	const { user, isAuthenticated } = useTypedSelector((s) => s.auth);
	// const { user, isAuthenticated } = useAuthStore();
	const router = useRouter();
	const {
		data: userInfo,
		isLoading: isUserInfoLoading,
		error: userInfoError,
	} = useUserInfoQuery(isAuthenticated);
	const logoutMutation = useLogoutMutation();
	useEffect(() => {
		if (!isAuthenticated && !isUserInfoLoading) {
			router.replace("/auth");
		}
	}, [isAuthenticated, isUserInfoLoading, router]);

	const handleLogout = async () => {
		try {
			await logoutMutation.mutateAsync();
			router.replace("/auth");
		} catch (error) {
			console.error("Logout error:", error);
			router.replace("/auth");
		}
	};
	if (isUserInfoLoading || (!user && isAuthenticated)) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="flex items-center gap-2 text-gray-600">
					<Loader2 className="h-6 w-6 animate-spin" />
					<span>Loading dashboard...</span>
				</div>
			</div>
		);
	}
	if (userInfoError && !user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center text-red-600">Error</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<p className="text-gray-600 mb-4">
							Failed to load user information. Please try logging in again.
						</p>
						<Button onClick={handleLogout} variant="outline">
							Back to Login
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}
	if (!isAuthenticated || !user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-2xl font-bold text-gray-900">
								meetus<span className="text-purple-600">VR</span>
							</h1>
							<span className="ml-4 text-sm text-gray-500">Dashboard</span>
						</div>
						<Button
							onClick={handleLogout}
							variant="outline"
							disabled={logoutMutation.isPending}
							className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-transparent"
						>
							{logoutMutation.isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<LogOut className="h-4 w-4" />
							)}
							{logoutMutation.isPending ? "Logging out..." : "Logout"}
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						Welcome to your Dashboard
					</h2>
					<p className="text-gray-600">
						You have successfully logged into the meetus VR shopping metaverse
						platform.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* User Information Card */}
					<Card className="col-span-1 md:col-span-2">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5 text-purple-600" />
								User Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
								<Hash className="h-5 w-5 text-gray-500" />
								<div>
									<p className="text-sm font-medium text-gray-500">User ID</p>
									<p className="text-lg font-semibold text-gray-900">
										{user?.id}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
								<User className="h-5 w-5 text-purple-600" />
								<div>
									<p className="text-sm font-medium text-purple-600">Name</p>
									<p className="text-lg font-semibold text-gray-900">
										{user?.name}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Quick Actions Card */}
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button className="w-full bg-purple-600 hover:bg-purple-700">
								Enter VR Store
							</Button>
							<Button variant="outline" className="w-full bg-transparent">
								View Profile
							</Button>
							<Button variant="outline" className="w-full bg-transparent">
								Settings
							</Button>
						</CardContent>
					</Card>

					{/* Status Card */}
					<Card className="col-span-1 md:col-span-2 lg:col-span-1">
						<CardHeader>
							<CardTitle>Account Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-3 h-3 bg-green-500 rounded-full"></div>
								<span className="text-sm font-medium text-green-700">
									Active
								</span>
							</div>
							<p className="text-sm text-gray-600">
								Your account is active and ready for VR shopping experiences.
							</p>
						</CardContent>
					</Card>

					{/* Recent Activity Card */}
					<Card className="col-span-1 md:col-span-2">
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<span className="text-sm text-gray-600">
										Logged in successfully
									</span>
									<span className="text-xs text-gray-400">Just now</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<span className="text-sm text-gray-600">
										Account verified
									</span>
									<span className="text-xs text-gray-400">Today</span>
								</div>
								<div className="flex items-center justify-between py-2">
									<span className="text-sm text-gray-600">Profile created</span>
									<span className="text-xs text-gray-400">This week</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Footer */}
				<footer className="mt-12 pt-8 border-t border-gray-200">
					<div className="text-center text-gray-500 text-sm">
						<p>© 2025 meetus VR. All rights reserved.</p>
						<p className="mt-1">Welcome to the future of shopping.</p>
					</div>
				</footer>
			</main>
		</div>
	);
}
