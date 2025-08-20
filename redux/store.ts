import authSlice from "@/store/auth-store-RTKversion";
import { combineReducers } from "redux";

const reducer = combineReducers({
	auth: authSlice,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
