import { createReducer, MetaReducer, on } from "@ngrx/store";
import * as Actions from "../actions/auth.actions";
import { User } from "../../types/user";
import { AppState } from "..";

export interface AuthState {
	user: User;
	isLoggedIn: boolean;
	isFetchingUser: boolean;
}

export const initialState: AuthState = {
	user: {} as User,
	isLoggedIn: false,
	isFetchingUser: false,
};

export const authReducer = createReducer(
	initialState,
	on(Actions.doLogin, state => {
		return {
			...state,
			isLoggedIn: true,
		};
	}),
	on(Actions.logoutSuccess, state => {
		return {
			...state,
			isLoggedIn: false,
		};
	}),
	on(Actions.fetchUser, state => {
		return {
			...state,
			isFetchingUser: true,
		};
	}),
	on(Actions.fetchUserSuccess, (state, { user }) => {
		return {
			...state,
			user,
			isLoggedIn: true,
			isFetchingUser: false,
		};
	})
);

export const logoutMetareducer: MetaReducer<AppState> = reducer => {
	return (state, action) => {
		if (action.type === Actions.logout().type) {
			state = undefined;
		}

		return reducer(state, action);
	};
};
