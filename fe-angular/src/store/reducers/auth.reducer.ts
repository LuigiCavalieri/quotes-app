import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/auth.actions";
import { User } from "../../app/types/user";

export interface AuthState {
	user: User;
	isLoggedIn: boolean;
	isDoingLogin: boolean;
	isFetchingUser: boolean;
}

export const initialState: AuthState = {
	user: {} as User,
	isLoggedIn: false,
	isDoingLogin: false,
	isFetchingUser: false,
};

export const authReducer = createReducer(
	initialState,
	on(Actions.login, state => {
		return { ...state, isDoingLogin: true };
	}),
	on(Actions.loginSuccess, state => {
		return { ...state, isLoggedIn: true, isDoingLogin: false };
	}),
	on(Actions.fetchUser, state => {
		return { ...state, isFetchingUser: true };
	}),
	on(Actions.fetchUserSuccess, state => {
		return { ...state, isFetchingUser: false };
	})
);
