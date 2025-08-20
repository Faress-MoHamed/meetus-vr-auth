import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("auth-token");
	const { pathname } = request.nextUrl;

	// Protect dashboard routes
	if (pathname.startsWith("/dashboard") || pathname === "/") {
		if (!token) {
			return NextResponse.redirect(new URL("/auth", request.url));
		}
	}

	// Redirect to dashboard if already logged in and trying to access auth
	if (pathname.startsWith("/auth") && token) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
