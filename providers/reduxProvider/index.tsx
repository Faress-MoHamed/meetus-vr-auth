"use client"; // 👈 Add this

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/persist";
import { Loader2 } from "lucide-react";
import AuthLoading from "@/components/auth-loading";

const ReduxProvider = ({ children }: any) => {
	return (
		<Provider store={store}>
			<PersistGate loading={<AuthLoading />} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
