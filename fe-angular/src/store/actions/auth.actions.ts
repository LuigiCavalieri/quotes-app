import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../app/types/auth";

export const login = createAction("[Auth API] Login", props<{ credentials: Credentials }>());
export const loginSuccess = createAction("[Auth API] Logged in successfully");
export const fetchUser = createAction("[Auth API] Fetch user");
export const fetchUserSuccess = createAction("[Auth API] User fetched successfully");
