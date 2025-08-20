import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "@/providers/TanStackProvider";
import ReduxProvider from "@/providers/reduxProvider";
import AuthInitializer from "@/providers/AuthInitializer";

export const metadata: Metadata = {
	title: "MeetusVR",
	description: "Meet, connect, and collaborate in VR",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<ReactQueryProvider>
					<ReduxProvider>
						<AuthInitializer>{children}</AuthInitializer>
					</ReduxProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
