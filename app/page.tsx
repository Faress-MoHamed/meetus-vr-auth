"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard";
import AuthLoading from "@/components/auth-loading";
import LoginForm from "@/components/pages/LoginForm";

export default function Home() {
	return <main className="min-h-screen">{<Dashboard />}</main>;
}
