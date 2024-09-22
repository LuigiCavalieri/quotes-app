import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../app/types/auth";
import { User } from "../../app/types/user";

export const login = createAction("[Auth API] Log in", props<{ credentials: Credentials }>());
export const loginSuccess = createAction("[Auth API] Logged in successfully");
export const logout = createAction("[Auth API] Log out");
export const logoutSuccess = createAction("[Auth API] Logged out successfully");
export const fetchUser = createAction("[Auth API] Fetch user");
export const fetchUserSuccess = createAction(
	"[Auth API] User fetched successfully",
	props<{ user: User }>()
);
