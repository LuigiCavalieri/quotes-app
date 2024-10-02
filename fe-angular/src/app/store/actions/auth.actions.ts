import { createAction, props } from "@ngrx/store";
import { User } from "../../types/user";

export const doLogin = createAction("[Auth State] Log in");
export const doLogout = createAction("[Auth State] Log out", props<{ force?: boolean }>());
export const logoutSuccess = createAction("[Auth State] Logged out successfully");
export const fetchUser = createAction("[Auth State] Fetch user");
export const fetchUserSuccess = createAction(
	"[Auth State] User fetched successfully",
	props<{ user: User }>()
);
