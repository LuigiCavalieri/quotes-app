import { createAction, props } from "@ngrx/store";
import { User } from "../../types/user";

export const doLogin = createAction("[Auth State] Log in");
export const doLogout = createAction("[Auth API] Log out");
export const logoutSuccess = createAction("[Auth API] Logged out successfully");
export const fetchUser = createAction("[Auth API] Fetch user");
export const fetchUserSuccess = createAction(
	"[Auth API] User fetched successfully",
	props<{ user: User }>()
);
